# Vercel Deployment Guide

1. In Vercel, click **Add New… → Project**.
2. Import from GitHub: `Tormento416/28-day-python-bootcamp`.
3. In the project settings, add these environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/public key
4. Keep the default build and output settings (Next.js App Router).
5. Click **Deploy**.

After deployment:
- Run the Supabase SQL files in order: `schema.sql`, `seed.sql`, `seed_users_checkpoints.sql`.
- Test login at `/auth/login` using the seeded demo user:
  - Email: `demo@pythonquest.dev`
  - Password: `password123`
- Visit `/dashboard` to see quest progress and XP.
