"use client";

import { useEffect, useState } from "react";
import { DAILY_QUESTS_SEED } from "@/lib/db/seedData";

export default function QuestMapPage() {
  const [user, setUser] = useState<any>(null);
  const [quests, setQuests] = useState<any[]>(DAILY_QUESTS_SEED);

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }

    fetch("/api/quests")
      .then((res) => res.json())
      .then((data) => {
        if (data.quests && data.quests.length > 0) {
          setQuests(data.quests);
        }
      })
      .catch(() => {});
  }, []);

  const completedMiniBosses = new Set<number>(user?.completedMiniBossDays || []);
  const completedWeeklyBosses = new Set<number>(user?.completedWeeklyBossWeeks || []);
  const activeDay = user?.currentDay || 1;

  const weeks = [
    { number: 1, title: "Week 1: Syntax, Variables & Control", days: quests.filter(q => q.dayNumber >= 1 && q.dayNumber <= 7) },
    { number: 2, title: "Week 2: Data Structures & Functions", days: quests.filter(q => q.dayNumber >= 8 && q.dayNumber <= 14) },
    { number: 3, title: "Week 3: OOP, Modules & Persistence", days: quests.filter(q => q.dayNumber >= 15 && q.dayNumber <= 21) },
    { number: 4, title: "Week 4: Frameworks, Extensions & Libraries", days: quests.filter(q => q.dayNumber >= 22 && q.dayNumber <= 28) }
  ];

  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center">
          <span className="rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/20">
            28-Day Campaign Roadmap
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white">Pythonia Quest Board</h1>
          <p className="mt-2 text-sm text-slate-300">
            Complete daily side quests and defeat Mini-Bosses. Every 7 days, conquer the Weekly Epic Boss Dungeon!
          </p>
        </div>

        {weeks.map((week) => (
          <section key={week.number} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">{week.title}</h2>
              <span className="text-xs font-bold text-cyan-400">
                {completedWeeklyBosses.has(week.number) ? "🏆 Boss Defeated" : `Week ${week.number}`}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {week.days.map((q) => {
                const isWeeklyBoss = q.isWeeklyBossDay || q.dayNumber % 7 === 0;
                const isMiniBossDone = completedMiniBosses.has(q.dayNumber);
                const isActive = q.dayNumber === activeDay;

                const linkHref = isWeeklyBoss
                  ? `/boss/${Math.floor(q.dayNumber / 7)}`
                  : `/quests/${q.dayNumber}`;

                return (
                  <a
                    key={q.dayNumber}
                    href={linkHref}
                    className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
                      isWeeklyBoss
                        ? "border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-slate-900 hover:border-rose-400"
                        : isActive
                        ? "border-cyan-400 bg-gradient-to-b from-cyan-950/60 to-slate-900 shadow-lg shadow-cyan-400/20 ring-1 ring-cyan-400"
                        : "border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className={isWeeklyBoss ? "text-rose-400" : "text-cyan-400"}>
                          Day {q.dayNumber}
                        </span>
                        {isWeeklyBoss ? (
                          <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] text-rose-300">
                            👑 EPIC BOSS
                          </span>
                        ) : isMiniBossDone ? (
                          <span className="text-emerald-400">✓ Done</span>
                        ) : (
                          <span className="text-slate-500">👹 Mini-Boss</span>
                        )}
                      </div>

                      <h3 className="mt-2 text-base font-bold text-white group-hover:text-cyan-300">
                        {q.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">{q.subtitle}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px]">
                      <span className="text-slate-400">{q.category}</span>
                      <span className="font-semibold text-emerald-400">
                        +{isWeeklyBoss ? 500 : 250} XP
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
