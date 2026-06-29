/**
 * Admin Members API
 * 所有請求需帶 header: x-admin-secret: <ADMIN_SECRET>
 *
 * GET  ?action=list          → 列出全部會員
 * POST { email, is_admin? }  → 新增 / 重新啟用會員
 * PATCH { email, status }    → 修改狀態（active | revoked）
 */

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, x-admin-secret',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  const secret = req.headers.get('x-admin-secret');
  if (!secret || secret !== Deno.env.get('ADMIN_SECRET')) {
    return new Response('Unauthorized', { status: 401, headers: CORS });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const url = new URL(req.url);

  // ── LIST ────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('members')
      .select('email, status, is_admin, paid_at, source_order_id, created_at')
      .order('created_at', { ascending: false });

    if (error) return json({ error: error.message }, 500);
    return json(data);
  }

  // ── ADD / UPSERT ─────────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const body = await req.json();
    const email = (body.email as string)?.toLowerCase().trim();
    if (!email || !email.includes('@')) return json({ error: 'invalid email' }, 400);

    const { error } = await supabase.from('members').upsert(
      {
        email,
        status: 'active',
        is_admin: !!body.is_admin,
        paid_at: new Date().toISOString(),
      },
      { onConflict: 'email' },
    );

    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, email });
  }

  // ── PATCH status ─────────────────────────────────────────────────────────
  if (req.method === 'PATCH') {
    const body = await req.json();
    const email = (body.email as string)?.toLowerCase().trim();
    const status = body.status === 'active' ? 'active' : 'revoked';
    if (!email) return json({ error: 'missing email' }, 400);

    const { error } = await supabase
      .from('members')
      .update({ status })
      .eq('email', email);

    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  return new Response('Not found', { status: 404, headers: CORS });
});
