create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  class_name text,
  race text,
  alignment text,
  background text,
  level int not null default 1,
  created_at timestamptz default now()
);

create table if not exists quests (
  id uuid primary key default gen_random_uuid(),
  day_number int unique not null,
  title text not null,
  subtitle text,
  description text,
  tier text not null,
  xp_value int not null default 100,
  is_boss boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists user_quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  quest_id uuid not null references quests(id) on delete cascade,
  status text not null default 'not_started',
  completed_at timestamptz,
  reflection text,
  unique(user_id, quest_id)
);

create table if not exists checkpoints (
  id uuid primary key default gen_random_uuid(),
  week_number int not null,
  title text not null,
  description text
);

create table if not exists checkpoint_questions (
  id uuid primary key default gen_random_uuid(),
  checkpoint_id uuid not null references checkpoints(id) on delete cascade,
  prompt text not null,
  type text not null,
  options jsonb,
  correct_answer text
);

create table if not exists checkpoint_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  question_id uuid not null references checkpoint_questions(id) on delete cascade,
  answer text not null,
  is_correct boolean,
  created_at timestamptz default now()
);

create table if not exists loot (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null
);

create table if not exists user_loot (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  loot_id uuid not null references loot(id) on delete cascade,
  awarded_at timestamptz default now(),
  unique(user_id, loot_id)
);

alter table profiles enable row level security;
alter table user_quests enable row level security;
alter table checkpoint_responses enable row level security;
alter table user_loot enable row level security;

create policy "profiles self" on profiles for select using (auth.uid() = id);
create policy "profiles insert self" on profiles for insert with check (auth.uid() = id);
create policy "quests public read" on quests for select using (true);
create policy "user quests self" on user_quests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "responses self" on checkpoint_responses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "loot self" on user_loot for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
