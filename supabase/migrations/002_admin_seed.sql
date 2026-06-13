-- 執行一次：建立你自己的 admin 帳號
-- 在 Supabase Dashboard → SQL Editor 執行這段（把 email 換成你的）

insert into members (email, status, is_admin, paid_at)
values ('info@imuframework.com', 'active', true, now())
on conflict (email) do update set is_admin = true, status = 'active';
