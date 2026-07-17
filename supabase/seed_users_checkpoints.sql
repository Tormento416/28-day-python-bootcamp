create extension if not exists "pgcrypto";

-- Demo auth user for local development
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_sent_at, recovery_sent_at,
  last_sign_in_at, email_change_confirm_status
)
values (
  '00000000-0000-0000-0000-000000000000',
  '2f1c4a2c-4d8a-4d5e-a6ee-7e6d8f70a001',
  'authenticated',
  'authenticated',
  'demo@pythonquest.dev',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"display_name":"Demo Learner"}',
  now(), now(), now(), now(), now(), 1
)
on conflict (id) do update set
  email = excluded.email,
  encrypted_password = excluded.encrypted_password,
  email_confirmed_at = excluded.email_confirmed_at,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at
)
values (
  '2f1c4a2c-4d8a-4d5e-a6ee-7e6d8f70a001',
  '2f1c4a2c-4d8a-4d5e-a6ee-7e6d8f70a001',
  '2f1c4a2c-4d8a-4d5e-a6ee-7e6d8f70a001',
  jsonb_build_object('sub', '2f1c4a2c-4d8a-4d5e-a6ee-7e6d8f70a001', 'email', 'demo@pythonquest.dev'),
  'email', now(), now(), now()
)
on conflict (provider, provider_id) do update set
  user_id = excluded.user_id,
  identity_data = excluded.identity_data,
  updated_at = now();

insert into profiles (id, display_name, avatar_url)
values ('2f1c4a2c-4d8a-4d5e-a6ee-7e6d8f70a001', 'Demo Learner', null)
on conflict (id) do update set display_name = excluded.display_name;

-- Checkpoints
insert into checkpoints (id, week_number, title, description) values
('11111111-1111-1111-1111-111111111101', 1, 'Checkpoint 1', 'Validate syntax, variables, input, operators, conditionals, and debugging.'),
('11111111-1111-1111-1111-111111111102', 2, 'Checkpoint 2', 'Validate loops, lists, dictionaries, tuples, sets, and strings.'),
('11111111-1111-1111-1111-111111111103', 3, 'Checkpoint 3', 'Validate functions, modules, exceptions, files, and testing.'),
('11111111-1111-1111-1111-111111111104', 4, 'Checkpoint 4', 'Validate comprehensions, classes, inheritance, and capstone planning.')
on conflict (id) do update set title = excluded.title, description = excluded.description, week_number = excluded.week_number;

insert into checkpoint_questions (id, checkpoint_id, prompt, type, options, correct_answer) values
('21111111-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111101', 'What does a variable store in Python?', 'mcq', '["A file", "A value", "A loop", "A library"]'::jsonb, 'A value'),
('21111111-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111101', 'Which keyword starts a conditional branch?', 'mcq', '["for", "if", "def", "import"]'::jsonb, 'if'),
('21111111-1111-1111-1111-111111111103', '11111111-1111-1111-1111-111111111101', 'Why do we use type casting with input()?', 'short_answer', null, 'To convert text input into numbers or other types'),
('22111111-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111102', 'Which loop is best when you know how many times to repeat?', 'mcq', '["while", "for", "try", "with"]'::jsonb, 'for'),
('22111111-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111102', 'What structure uses key-value pairs?', 'mcq', '["list", "tuple", "dictionary", "set"]'::jsonb, 'dictionary'),
('22111111-1111-1111-1111-111111111103', '11111111-1111-1111-1111-111111111102', 'How do sets help with loot lists?', 'short_answer', null, 'They remove duplicates'),
('23111111-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111103', 'What does a function help you do?', 'mcq', '["Store files", "Repeat code", "Delete bugs", "Rename imports"]'::jsonb, 'Repeat code'),
('23111111-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111103', 'Which block safely handles runtime errors?', 'mcq', '["if/else", "try/except", "for/range", "class/object"]'::jsonb, 'try/except'),
('23111111-1111-1111-1111-111111111103', '11111111-1111-1111-1111-111111111103', 'What is one benefit of writing to a file?', 'short_answer', null, 'It persists data between runs'),
('24111111-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111104', 'What does a list comprehension do?', 'mcq', '["Creates classes", "Writes files", "Builds a list compactly", "Imports modules"]'::jsonb, 'Builds a list compactly'),
('24111111-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111104', 'Why use a class?', 'mcq', '["To group related data and behavior", "To avoid indentation", "To rename variables", "To speed up loops"]'::jsonb, 'To group related data and behavior'),
('24111111-1111-1111-1111-111111111103', '11111111-1111-1111-111111111104', 'What should the capstone include?', 'short_answer', null, 'A working Python app with tests and a clear demo');

insert into user_quests (user_id, quest_id, status, completed_at, reflection)
select '2f1c4a2c-4d8a-4d5e-a6ee-7e6d8f70a001', id, 'completed', now(), 'Seeded demo completion'
from quests
where day_number <= 3
on conflict (user_id, quest_id) do update set status = excluded.status, completed_at = excluded.completed_at, reflection = excluded.reflection;
