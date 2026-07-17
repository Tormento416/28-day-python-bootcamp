Run: npm install && cp .env.example .env.local && npm run dev

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Supabase Setup

In your Supabase project's SQL editor, run these files in order:

1. `supabase/schema.sql` – creates tables and RLS policies.
2. `supabase/seed.sql` – seeds the 28-day quest curriculum.
3. `supabase/seed_users_checkpoints.sql` – seeds a demo user and checkpoint questions.

This creates:
- `quests` (28 days)
- `profiles`, `user_quests`, `checkpoints`, `checkpoint_questions`, `checkpoint_responses`, `loot`, `user_loot`

## Vercel Deployment

1. Import this repo in Vercel.
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy. Vercel will use Next.js App Router and serverless route handlers for `/api/*` and middleware for protected routes.

## Auth & Protected Routes

- Login/Signup: `/auth/login`, `/auth/signup`
- Protected: `/dashboard`, `/quests/[day]`, `/checkpoints/*`
- Middleware redirects unauthenticated users to login.

## API Routes

- `POST /api/progress` – update quest progress for the current user (JSON body: `{ questId, status?, reflection? }`).

## Next Steps

- Extend quests with richer content and code challenges.
- Add a leaderboard and instructor dashboard.
- Add more checkpoints and automated scoring.
