-- Narrative Theory site: database schema for Supabase.
-- Run once in the Supabase SQL editor (Project → SQL → New query → paste → Run).
-- The site talks to these tables only from the server, with the service-role key,
-- so row-level security is switched on with no policies: the public anon key can't read them.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  plan text not null default 'free' check (plan in ('free', 'member')),
  stripe_customer_id text unique,
  subscription_status text,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.sessions (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('module', 'situation')),
  module_id text not null,
  title text not null,
  status text not null default 'active',
  phase text not null default 'arrive',
  system text not null,
  api_messages jsonb not null default '[]',
  log jsonb not null default '[]',
  user_replies int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists sessions_user_updated on public.sessions (user_id, updated_at desc);

create table if not exists public.notebook (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,
  session_id uuid references public.sessions (id) on delete set null,
  module_id text not null,
  card jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists notebook_user_created on public.notebook (user_id, created_at desc);

create table if not exists public.replies (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  session_id uuid,
  created_at timestamptz not null default now()
);
create index if not exists replies_user_created on public.replies (user_id, created_at desc);

create table if not exists public.mode_stories (
  id uuid primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  mode_slug text not null,
  mode_name text not null,
  text text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index if not exists mode_stories_mode_status on public.mode_stories (mode_slug, status, created_at desc);

-- Contact-form messages (owner reads them at /studio/messages).
create table if not exists public.messages (
  id uuid primary key,
  name text not null,
  email text not null,
  phone text,
  prefer text,
  text text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.notebook enable row level security;
alter table public.replies enable row level security;
alter table public.mode_stories enable row level security;
alter table public.messages enable row level security;
