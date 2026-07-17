export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Python Quest</p>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight">Learn Python like a game with quests, XP, streaks, and boss battles.</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">This Next.js 14 + Supabase + Tailwind scaffold gives you auth, progress tracking, quizzes, and challenge submissions for the 28-day bootcamp.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950" href="/auth/signup">Register now</a>
          <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/auth/login">Login</a>
          <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/dashboard">Enter dashboard</a>
        </div>
      </div>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="mt-2 text-slate-300">Join the bootcamp to track progress, save reflections, and unlock weekly boss battles.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950" href="/auth/signup">Start registration</a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Already have an account?</h2>
          <p className="mt-2 text-slate-300">Sign in and continue your quests where you left off.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/auth/login">Go to login</a>
          </div>
        </div>
      </section>
    </main>
  );
}
