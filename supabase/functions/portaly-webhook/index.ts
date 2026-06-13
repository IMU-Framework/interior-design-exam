/**
 * Portaly 購買 Webhook
 * POST https://<project>.supabase.co/functions/v1/portaly-webhook?secret=<WEBHOOK_SECRET>
 *
 * Portaly 後台 → 數位商品 → 設定 → Webhook URL 填入上方網址
 */

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // ── 1. 驗證 webhook secret ───────────────────────────────────────────────
  const url = new URL(req.url);
  const incomingSecret =
    req.headers.get('x-webhook-secret') ??
    req.headers.get('x-portaly-secret') ??
    url.searchParams.get('secret');

  const expectedSecret = Deno.env.get('PORTALY_WEBHOOK_SECRET');
  if (!expectedSecret || incomingSecret !== expectedSecret) {
    return new Response('Unauthorized', { status: 401 });
  }

  // ── 2. 解析 payload ──────────────────────────────────────────────────────
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  // 完整 log，方便第一次確認 Portaly 實際送的欄位名稱
  console.log('Portaly webhook payload:', JSON.stringify(payload));

  // 嘗試各種可能的 email 欄位名稱
  const rawEmail =
    (payload.buyer_email as string) ??
    (payload.email as string) ??
    (payload.customer_email as string) ??
    (payload.purchaser_email as string) ??
    // Portaly 自訂欄位有時包在 custom_fields 物件內
    ((payload.custom_fields as Record<string, string>)?.email);

  if (!rawEmail || typeof rawEmail !== 'string') {
    console.error('No email found in payload:', JSON.stringify(payload));
    // 回傳 200 避免 Portaly 不斷重試；實際錯誤由 log 追蹤
    return new Response(JSON.stringify({ ok: false, error: 'email_not_found' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const email = rawEmail.toLowerCase().trim();
  const orderId = (payload.order_id ?? payload.id ?? '') as string;

  // ── 3. 寫入 Supabase ─────────────────────────────────────────────────────
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { error } = await supabase.from('members').upsert(
    {
      email,
      status: 'active',
      paid_at: new Date().toISOString(),
      source_order_id: orderId || null,
    },
    { onConflict: 'email' },
  );

  if (error) {
    console.error('Supabase upsert error:', error);
    return new Response('DB error', { status: 500 });
  }

  console.log('Member activated:', email);
  return new Response(JSON.stringify({ ok: true, email }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
