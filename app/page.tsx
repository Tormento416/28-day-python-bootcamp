export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-white/5 p-8 shadow-2xl backdrop-blur">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Python Quest</p>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight">Learn Python like an adventure game.</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">Earn XP, clear quests, beat checkpoints, and unlock the final mini project. This starts from absolute zero.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950" href="/auth/signup">Start the game</a>
          <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/auth/login">Continue</a>
          <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/quests">Quest board</a>
        </div>
      </div>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">XP and levels</h2>
          <p className="mt-2 text-slate-300">Complete quests to earn points and move through the bootcamp.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Boss checkpoints</h2>
          <p className="mt-2 text-slate-300">Every few days, face a checkpoint challenge to prove what you learned.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Beginner first</h2>
          <p className="mt-2 text-slate-300">Day 1 starts with Hello World, not hard theory.</p>
        </div>
      </section>
    </main>
  );
}
