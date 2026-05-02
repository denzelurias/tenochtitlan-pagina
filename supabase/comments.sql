create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null default 'teotihuacan',
  author_name text not null check (char_length(author_name) between 2 and 60),
  body text not null check (char_length(body) between 5 and 500),
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

revoke all on table public.comments from anon, authenticated;
grant select, insert on table public.comments to anon;

drop policy if exists "Anyone can read approved comments" on public.comments;
create policy "Anyone can read approved comments"
on public.comments
for select
to anon
using (is_approved = true);

drop policy if exists "Anyone can submit pending comments" on public.comments;
create policy "Anyone can submit pending comments"
on public.comments
for insert
to anon
with check (
  is_approved = false
  and page_slug = 'teotihuacan'
  and char_length(author_name) between 2 and 60
  and char_length(body) between 5 and 500
);

create index if not exists comments_public_feed_idx
on public.comments (page_slug, is_approved, created_at desc);
