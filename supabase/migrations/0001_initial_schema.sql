create extension if not exists vector with schema extensions;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding extensions.vector(1536) not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  phone text not null check (char_length(trim(phone)) between 7 and 32),
  preferred_date timestamptz not null,
  reason text not null check (char_length(trim(reason)) between 2 and 1000),
  created_at timestamptz not null default now()
);

alter table public.documents enable row level security;
alter table public.bookings enable row level security;

create index if not exists documents_embedding_hnsw_idx on public.documents using hnsw (embedding vector_cosine_ops);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);
