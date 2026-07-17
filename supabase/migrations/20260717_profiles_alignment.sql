alter table if exists public.profiles
  add column if not exists alignment text,
  add column if not exists class_name text,
  add column if not exists race text,
  add column if not exists background text,
  add column if not exists level int not null default 1;

update public.profiles set level = coalesce(level, 1);
