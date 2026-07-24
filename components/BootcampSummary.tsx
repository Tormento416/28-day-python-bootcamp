"use client";

import { ARCHETYPES, Archetype } from "@/lib/db/models";

interface BootcampSummaryProps {
  user: {
    displayName: string;
    level: number;
    xp: number;
    archetype?: Archetype | null;
    currentDay: number;
    completedSubQuestIds?: string[];
    completedMiniBossDays?: number[];
    completedWeeklyBossWeeks?: number[];
    lootInventory?: string[];
  };
}

export function BootcampSummary({ user }: BootcampSummaryProps) {
  const level = user.level || 1;
  const xp = user.xp || 0;
  const currentXpInLevel = xp % 200;
  const xpPercentage = Math.min(100, Math.round((currentXpInLevel / 200) * 100));

  const archetypeInfo = user.archetype ? ARCHETYPES[user.archetype] : null;

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-4xl shadow-lg border border-cyan-500/20">
            {archetypeInfo?.icon || "⚔️"}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
              <span className="rounded-full bg-cyan-400 px-2.5 py-0.5 text-xs font-black text-slate-950">
                Lvl {level}
              </span>
            </div>
            <p className="text-xs font-semibold text-cyan-300">
              {archetypeInfo ? archetypeInfo.roleTitle : "Apprentice Hero"} • Focus: {archetypeInfo?.focusArea || "Python Foundations"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/quests/${user.currentDay || 1}`}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-2.5 text-xs font-extrabold text-slate-950 shadow-lg shadow-cyan-400/20 hover:scale-105 transition"
          >
            ⚡ Resume Day {user.currentDay || 1}
          </a>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mt-6 space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-cyan-300">LEVEL PROGRESSION</span>
          <span className="text-slate-300">{xp} Total XP ({currentXpInLevel} / 200 to Level {level + 1})</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-900 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      {/* Campaign Stats Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
          <span className="text-xs font-bold text-slate-400">Current Day</span>
          <p className="text-xl font-extrabold text-cyan-300">Day {user.currentDay || 1} / 28</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
          <span className="text-xs font-bold text-slate-400">Side Quests</span>
          <p className="text-xl font-extrabold text-emerald-400">
            {user.completedSubQuestIds?.length || 0} Done
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
          <span className="text-xs font-bold text-slate-400">Mini-Bosses</span>
          <p className="text-xl font-extrabold text-amber-400">
            {user.completedMiniBossDays?.length || 0} Defeated
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-center">
          <span className="text-xs font-bold text-slate-400">Weekly Bosses</span>
          <p className="text-xl font-extrabold text-rose-400">
            {user.completedWeeklyBossWeeks?.length || 0} / 4 Dungeons
          </p>
        </div>
      </div>

      {/* Unlocked Gear Badges */}
      {user.lootInventory && user.lootInventory.length > 0 && (
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Trophy Case & Relics</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {user.lootInventory.map((item, idx) => (
              <span
                key={idx}
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200"
              >
                🏆 {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
