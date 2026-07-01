-- Run this in your Supabase project: Dashboard → SQL Editor → New query → paste → Run.
-- It creates the responses table and locks it down so the public (anon) key can
-- INSERT a response but can NOT read anyone's answers. You view results in the
-- Supabase Table editor / SQL editor (which use your privileged service role).

create table if not exists public.survey_responses (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  answers     jsonb not null,
  meta        jsonb
);

alter table public.survey_responses enable row level security;

-- Table-level privilege: anon + logged-in users may INSERT (needed in addition to the
-- RLS policy below). We do NOT grant SELECT/UPDATE/DELETE, so responses are write-only.
grant insert on table public.survey_responses to anon, authenticated;

-- RLS policy: allow the insert, from anyone, with no restriction on the row.
drop policy if exists "anon can insert responses"   on public.survey_responses;
drop policy if exists "anyone can insert responses" on public.survey_responses;
create policy "anyone can insert responses"
  on public.survey_responses
  for insert
  to anon, authenticated
  with check (true);

-- NOTE: no select/update/delete policy exists for anon, so responses are private by
-- default (write-only from the browser).

-- Tell PostgREST to reload its schema cache (important when running this via the API
-- rather than the dashboard SQL editor, which reloads automatically).
notify pgrst, 'reload schema';
