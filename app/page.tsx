import { ARCHETYPES } from "@/lib/db/models";

export default function LandingPage() {
  const archetypesList = Object.values(ARCHETYPES);

  return (
    <main className="relative min-h-screen">
      {/* Background Glow Elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-rose-500/20 blur-[120px] animate-pulse-glow" />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md">
          <span>⚔️ THE ULTIMATE PYTHON CODING RPG</span>
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Learn Python in <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">28 Days</span> of RPG Combat
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 leading-relaxed sm:text-xl">
          Step into Pythonia! Choose your specialization archetype on Day 1, complete 2-3 daily side quests, defeat daily Mini-Bosses, and conquer epic Weekly Boss Dungeons.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/auth/signup"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-8 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-cyan-400/30 transition hover:scale-105"
          >
            Create Hero & Begin Day 1
          </a>
          <a
            href="/auth/login"
            className="rounded-full border border-slate-700 bg-slate-900/60 px-8 py-4 text-base font-bold text-white hover:border-slate-500 hover:bg-slate-800 transition"
          >
            Resume Journey
          </a>
        </div>

        {/* Gamification Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 text-left">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
            <span className="text-3xl">🎯</span>
            <h3 className="mt-3 text-lg font-bold text-white">Daily Sub-Quests</h3>
            <p className="mt-1 text-xs text-slate-400">
              2-3 bite-sized side quests per day with interactive WebAssembly Python editor and instant feedback.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
            <span className="text-3xl">👹</span>
            <h3 className="mt-3 text-lg font-bold text-white">Daily Mini-Bosses</h3>
            <p className="mt-1 text-xs text-slate-400">
              Synthesize that day's lessons into a real code attack to defeat daily monsters and claim XP rewards.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
            <span className="text-3xl">🐲</span>
            <h3 className="mt-3 text-lg font-bold text-white">Weekly Boss Dungeons</h3>
            <p className="mt-1 text-xs text-slate-400">
              Every 7 days, no side quests! Battle multi-phase epic Weekly Bosses (Days 7, 14, 21, 28) for trophy badges.
            </p>
          </div>
        </div>
      </section>

      {/* Archetypes Section */}
      <section className="border-t border-slate-800/80 bg-slate-950/70 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">7 Hero Specializations</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Choose Your Character Archetype</h2>
            <p className="mt-2 text-sm text-slate-400">
              Tailors your storyline, code tasks, starter tools, and late-game projects!
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {archetypesList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md"
              >
                <div>
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{item.name}</h3>
                  <span className="text-xs font-semibold text-cyan-400">{item.focusArea}</span>
                  <p className="mt-2 text-xs text-slate-300">{item.description}</p>
                </div>
                <div className="mt-4 rounded-xl bg-slate-950/80 p-2.5 text-[11px] text-cyan-200 border border-slate-800">
                  ⚡ {item.traitBonus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Week Campaign Roadmap */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Curriculum Structure</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">The 4-Week Journey to Mastery</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-cyan-500/30 bg-cyan-950/20 p-6">
              <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-300">WEEK 1</span>
              <h3 className="mt-3 text-xl font-bold text-white">Syntax & Control</h3>
              <p className="mt-2 text-xs text-slate-300">
                Variables, print formatting, data types, arithmetic, conditional branching, and for loops.
              </p>
              <div className="mt-4 text-xs font-semibold text-rose-400">👑 Day 7 Boss: Syntaxius</div>
            </div>

            <div className="rounded-3xl border border-indigo-500/30 bg-indigo-950/20 p-6">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300">WEEK 2</span>
              <h3 className="mt-3 text-xl font-bold text-white">Data & Functions</h3>
              <p className="mt-2 text-xs text-slate-300">
                Lists, tuples, dictionaries, sets, while loops, custom functions, parameters, and *args/**kwargs.
              </p>
              <div className="mt-4 text-xs font-semibold text-rose-400">👑 Day 14 Boss: Algorithma</div>
            </div>

            <div className="rounded-3xl border border-purple-500/30 bg-purple-950/20 p-6">
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300">WEEK 3</span>
              <h3 className="mt-3 text-xl font-bold text-white">OOP & Persistence</h3>
              <p className="mt-2 text-xs text-slate-300">
                Classes, objects, inheritance, polymorphism, magic dunder methods, standard modules, exceptions, and file I/O.
              </p>
              <div className="mt-4 text-xs font-semibold text-rose-400">👑 Day 21 Boss: Iron Colossus</div>
            </div>

            <div className="rounded-3xl border border-rose-500/30 bg-rose-950/20 p-6">
              <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300">WEEK 4</span>
              <h3 className="mt-3 text-xl font-bold text-white">Frameworks & Sorcery</h3>
              <p className="mt-2 text-xs text-slate-300">
                Virtual environments, PIP, REST APIs, CLI rich tools, web endpoints, pandas/numpy data, and Pygame.
              </p>
              <div className="mt-4 text-xs font-semibold text-amber-400">👑 Day 28 Final Boss: Malakor</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
