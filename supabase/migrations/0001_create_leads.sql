-- ===========================================================================
-- Parkent Plants — leads jadvali (BLOK 4)
-- Saytdan kelgan B2B so'rovlar shu yerda saqlanadi va keyin Bitrix24'ga yuboriladi.
-- ===========================================================================

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Form maydonlari
  name text not null,
  phone text not null,
  company text,
  region text,                      -- viloyat slug (tashkent, samarkand, ...)
  fruit_types text[] default '{}',  -- ['apple', 'peach', ...]
  volume_plan text,                 -- '500-2000', '2001-10000', '10001-50000', '50000+', 'undecided'
  message text,

  -- Meta
  locale text not null default 'uz' check (locale in ('uz', 'ru')),
  source text not null default 'website',
  referrer text,
  user_agent text,
  ip_country text,

  -- Bitrix24 sync holati
  bitrix_status text not null default 'pending'
    check (bitrix_status in ('pending', 'synced', 'failed', 'skipped')),
  bitrix_lead_id text,
  bitrix_synced_at timestamptz,
  bitrix_error text
);

-- Indexes
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_bitrix_status_idx on public.leads (bitrix_status)
  where bitrix_status in ('pending', 'failed');
create index if not exists leads_phone_idx on public.leads (phone);

-- Comments (Sanity / Studio uchun foydali)
comment on table public.leads is 'Saytdagi formadan kelgan B2B lead''lar';
comment on column public.leads.fruit_types is 'Mijoz qiziqqan meva turlari, slug array';
comment on column public.leads.volume_plan is 'Buyurtma hajmi diapazoni';
comment on column public.leads.bitrix_status is 'CRM bilan sinxronizatsiya holati';

-- ===========================================================================
-- RLS — public faqat insert qila oladi (anon emas), service_role to'liq.
-- API route service_role key bilan ishlaydi.
-- ===========================================================================

alter table public.leads enable row level security;

-- Faqat service_role uchun read/write (anonymous mijoz hech narsa qila olmaydi)
-- API route server-side service_role key bilan write qiladi.
-- Read uchun keyinchalik admin authlangan user'lar uchun policy qo'shamiz.
drop policy if exists "service_role_all" on public.leads;
create policy "service_role_all"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

-- (Kelajakda admin uchun ko'rish policy'si:
-- create policy "admin_read"
--   on public.leads
--   for select
--   to authenticated
--   using (auth.jwt() ->> 'role' = 'admin');)
