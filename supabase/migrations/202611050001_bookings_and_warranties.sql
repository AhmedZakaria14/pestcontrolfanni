begin;

create table public.bookings (
  id text primary key,
  name text not null,
  phone text not null,
  service text not null,
  area text not null default '',
  notes text not null default '',
  source text not null default 'Website Booking Form',
  status text not null default 'new' check (status in ('new','contacted','scheduled','completed','cancelled')),
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table public.warranties (
  id text primary key,
  code text not null unique check (id = code),
  "customerName" text not null,
  "customerPhone" text,
  "serviceType" text not null,
  "propertyAddress" text not null,
  city text,
  "issueDate" date not null,
  "expiryDate" date not null check ("expiryDate" >= "issueDate"),
  "durationYears" integer check ("durationYears" between 1 and 20),
  status text not null default 'active' check (status in ('active','expired','pending')),
  "technicianName" text,
  "pesticideDetails" text,
  notes text,
  "createdAt" timestamptz not null default now()
);

alter table public.bookings enable row level security;
alter table public.warranties enable row level security;
revoke all on public.bookings, public.warranties from public, anon, authenticated;
grant select, update, delete on public.bookings to authenticated;
grant select, insert, delete on public.warranties to authenticated;
create policy bookings_admin on public.bookings to authenticated
  using ((select auth.jwt())->'app_metadata'->>'role' = 'pest_admin')
  with check ((select auth.jwt())->'app_metadata'->>'role' = 'pest_admin');
create policy warranties_admin on public.warranties to authenticated
  using ((select auth.jwt())->'app_metadata'->>'role' = 'pest_admin')
  with check ((select auth.jwt())->'app_metadata'->>'role' = 'pest_admin');

create function public.submit_pest_booking(
  booking_id text, customer_name text, customer_phone text, requested_service text,
  requested_area text, customer_notes text, booking_source text
) returns boolean language plpgsql security definer set search_path = '' as $$
begin
  if booking_id is null or booking_id !~ '^book-[0-9a-fA-F-]{36}$'
     or customer_phone is null or length(trim(customer_phone)) not between 5 and 40
     or length(customer_name) > 200 or length(requested_service) > 250
     or length(requested_area) > 250 or length(customer_notes) > 3000
     or length(booking_source) > 100 then
    return false;
  end if;
  insert into public.bookings (id, name, phone, service, area, notes, source)
  values (booking_id, customer_name, customer_phone, requested_service, requested_area, customer_notes, booking_source)
  on conflict (id) do nothing;
  return exists (select 1 from public.bookings where id = booking_id and phone = customer_phone);
end;
$$;
revoke all on function public.submit_pest_booking(text,text,text,text,text,text,text) from public;
grant execute on function public.submit_pest_booking(text,text,text,text,text,text,text) to anon, authenticated;

create function public.verify_pest_warranty(warranty_code text)
returns table(code text, "serviceType" text, "issueDate" date, "expiryDate" date, status text)
language sql stable security definer set search_path = '' as $$
  select w.code, w."serviceType", w."issueDate", w."expiryDate",
    case when w.status = 'active' and w."expiryDate" < current_date then 'expired' else w.status end
  from public.warranties w where w.code = upper(trim(warranty_code));
$$;
revoke all on function public.verify_pest_warranty(text) from public;
grant execute on function public.verify_pest_warranty(text) to anon, authenticated;

commit;
