-- Elevate Cryo & Wellness — run this in the Supabase SQL editor after unpausing.
-- Also enable Email auth in Authentication → Providers.

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  phone text not null default '',
  plan text check (plan in ('essential', 'unlimited')),
  membership_status text not null default 'none'
    check (membership_status in ('none', 'active', 'past_due', 'canceled')),
  stripe_customer_id text unique,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  modality text not null check (modality in ('cryo', 'redlight', 'sauna', 'compression')),
  slot_date date not null,
  start_min integer not null check (start_min >= 0 and start_min < 24 * 60),
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create unique index if not exists bookings_single_capacity_slot
  on public.bookings (modality, slot_date, start_min)
  where status = 'confirmed' and modality <> 'compression';

create index if not exists bookings_window_idx
  on public.bookings (slot_date, modality, status);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.enforce_booking_rules()
returns trigger
language plpgsql
as $$
declare
  v_plan text;
  v_status text;
  v_count integer;
begin
  select plan, membership_status into v_plan, v_status
  from public.profiles
  where id = new.user_id;

  if v_status is distinct from 'active' then
    raise exception 'Active membership required to book';
  end if;

  if v_plan = 'essential' then
    select count(*) into v_count
    from public.bookings
    where user_id = new.user_id
      and slot_date = new.slot_date
      and status = 'confirmed';
    if v_count >= 1 then
      raise exception 'Essential plan allows one session per day';
    end if;
  end if;

  if new.modality = 'compression' then
    select count(*) into v_count
    from public.bookings
    where modality = 'compression'
      and slot_date = new.slot_date
      and start_min = new.start_min
      and status = 'confirmed';
    if v_count >= 4 then
      raise exception 'That compression slot is full';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists bookings_enforce_rules on public.bookings;
create trigger bookings_enforce_rules
  before insert on public.bookings
  for each row execute function public.enforce_booking_rules();

create or replace view public.booking_occupancy as
  select modality, slot_date, start_min, count(*)::int as taken
  from public.bookings
  where status = 'confirmed'
  group by modality, slot_date, start_min;

alter table public.profiles enable row level security;
alter table public.waitlist enable row level security;
alter table public.bookings enable row level security;

drop policy if exists "profiles are self readable" on public.profiles;
create policy "profiles are self readable"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles are self updatable" on public.profiles;
create policy "profiles are self updatable"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "service can manage profiles" on public.profiles;
-- service role bypasses RLS; no extra policy needed

drop policy if exists "anyone can join waitlist" on public.waitlist;
create policy "anyone can join waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

drop policy if exists "members read own bookings" on public.bookings;
create policy "members read own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

drop policy if exists "members insert own bookings" on public.bookings;
create policy "members insert own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

drop policy if exists "members cancel own bookings" on public.bookings;
create policy "members cancel own bookings"
  on public.bookings for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select on public.booking_occupancy to authenticated;

create or replace function public.booking_occupancy_window(start_date date, end_date date)
returns table (modality text, slot_date date, start_min integer, taken integer)
language sql
security definer
set search_path = public
as $$
  select b.modality, b.slot_date, b.start_min, count(*)::int
  from public.bookings b
  where b.status = 'confirmed'
    and b.slot_date between start_date and end_date
  group by b.modality, b.slot_date, b.start_min;
$$;

grant execute on function public.booking_occupancy_window(date, date) to authenticated;

-- Occupancy view is readable by members so the calendar can show taken slots
-- without exposing other members' identities.
drop policy if exists "members read occupancy" on public.bookings;
-- occupancy is a view; grant above is sufficient
