-- 付費會員表
create table if not exists members (
  email          text primary key,
  status         text not null default 'active',   -- active | revoked
  is_admin       boolean not null default false,
  paid_at        timestamptz,                       -- null = 手動建立（admin）
  source_order_id text,                             -- Portaly 訂單 ID
  created_at     timestamptz not null default now()
);

-- OTP 表（每次登入嘗試一筆，過期自動廢棄）
create table if not exists otps (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  code       text not null,
  expires_at timestamptz not null,
  used       boolean not null default false,
  created_at timestamptz not null default now()
);

-- 每 1 小時清除過期/已用 OTP（避免表無限膨脹）
create index if not exists otps_email_idx on otps (email);
create index if not exists otps_expires_idx on otps (expires_at);

-- Row Level Security：只有 service_role 可寫，前端完全透過 Edge Function 操作
alter table members enable row level security;
alter table otps     enable row level security;
