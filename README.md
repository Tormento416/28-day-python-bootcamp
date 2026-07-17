Run: npm install && cp .env.example .env.local && npm run dev


## Production Checklist

- Confirm `vercel.json` exists.
- Ensure `package.json` includes `build`, `dev`, and `start` scripts.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel.
- Run Supabase SQL files after deploy.
