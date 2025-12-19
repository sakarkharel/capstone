-- =========================================================
-- 0) Extensions (safe to run)
-- =========================================================
create extension if not exists "pgcrypto";

-- =========================================================
-- 1) PROFILES (one row per auth user)
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_created_at_idx on public.profiles(created_at);

-- Update updated_at automatically
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();


-- =========================================================
-- 2) LISTINGS (rooms posted by users)
-- =========================================================
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  price_per_month integer not null check (price_per_month > 0),
  location text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listings_owner_id_idx on public.listings(owner_id);
create index if not exists listings_created_at_idx on public.listings(created_at);
create index if not exists listings_active_idx on public.listings(is_active);

drop trigger if exists trg_listings_updated_at on public.listings;
create trigger trg_listings_updated_at
before update on public.listings
for each row execute function public.set_updated_at();


-- =========================================================
-- 3) BOOKINGS (requests to book a listing)
-- =========================================================
do $$ begin
  if not exists (select 1 from pg_type where typname = 'booking_status') then
    create type public.booking_status as enum ('pending', 'approved', 'rejected', 'cancelled');
  end if;
end $$;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  renter_id uuid not null references auth.users(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  status public.booking_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint bookings_date_check check (end_date >= start_date),
  -- prevent the same renter spamming exact same date range for same listing
  constraint bookings_unique_request unique (listing_id, renter_id, start_date, end_date)
);

create index if not exists bookings_listing_id_idx on public.bookings(listing_id);
create index if not exists bookings_renter_id_idx on public.bookings(renter_id);
create index if not exists bookings_created_at_idx on public.bookings(created_at);

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();


-- =========================================================
-- 4) RLS ON (IMPORTANT)
-- =========================================================
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.bookings enable row level security;


-- =========================================================
-- 5) POLICIES: PROFILES
-- =========================================================
drop policy if exists "profiles_select_all" on public.profiles;
create policy "profiles_select_all"
on public.profiles for select
using (true);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);


-- =========================================================
-- 6) POLICIES: LISTINGS
-- =========================================================
-- Everyone can browse active listings
drop policy if exists "listings_select_active" on public.listings;
create policy "listings_select_active"
on public.listings for select
using (is_active = true);

-- Owner can see their own listings (even inactive)
drop policy if exists "listings_select_owner_all" on public.listings;
create policy "listings_select_owner_all"
on public.listings for select
using (auth.uid() = owner_id);

-- Create listing only as yourself
drop policy if exists "listings_insert_owner" on public.listings;
create policy "listings_insert_owner"
on public.listings for insert
with check (auth.uid() = owner_id);

-- Update/Delete only your own listings
drop policy if exists "listings_update_owner" on public.listings;
create policy "listings_update_owner"
on public.listings for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

drop policy if exists "listings_delete_owner" on public.listings;
create policy "listings_delete_owner"
on public.listings for delete
using (auth.uid() = owner_id);


-- =========================================================
-- 7) POLICIES: BOOKINGS
-- =========================================================
-- Renter can see their own bookings
drop policy if exists "bookings_select_renter" on public.bookings;
create policy "bookings_select_renter"
on public.bookings for select
using (auth.uid() = renter_id);

-- Owner can see bookings made on their listings
drop policy if exists "bookings_select_owner" on public.bookings;
create policy "bookings_select_owner"
on public.bookings for select
using (
  exists (
    select 1 from public.listings l
    where l.id = bookings.listing_id
      and l.owner_id = auth.uid()
  )
);

-- Insert booking only as yourself AND cannot book your own listing
drop policy if exists "bookings_insert_renter_not_owner" on public.bookings;
create policy "bookings_insert_renter_not_owner"
on public.bookings for insert
with check (
  auth.uid() = renter_id
  and exists (
    select 1 from public.listings l
    where l.id = bookings.listing_id
      and l.owner_id <> auth.uid()
      and l.is_active = true
  )
);

-- Renter can cancel their own booking (set status to cancelled)
drop policy if exists "bookings_update_renter_cancel" on public.bookings;
create policy "bookings_update_renter_cancel"
on public.bookings for update
using (auth.uid() = renter_id)
with check (auth.uid() = renter_id);

-- Owner can approve/reject bookings on their listing
drop policy if exists "bookings_update_owner_manage" on public.bookings;
create policy "bookings_update_owner_manage"
on public.bookings for update
using (
  exists (
    select 1 from public.listings l
    where l.id = bookings.listing_id
      and l.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.listings l
    where l.id = bookings.listing_id
      and l.owner_id = auth.uid()
  )
);


-- =========================================================
-- 8) OPTIONAL: Auto-create profile row on signup
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', null))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
