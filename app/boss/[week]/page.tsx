"use client";

import { useEffect, useState } from "react";
import { BossFight } from "@/components/BossFight";
import { WEEKLY_BOSSES_SEED } from "@/lib/db/seedData";
import { WeeklyBoss } from "@/lib/db/models";

export default function WeeklyBossPage({ params }: { params: { week: string } }) {
  const weekNum = Number(params.week);
  const [user, setUser] = useState<any>(null);
  const [weeklyBoss, setWeeklyBoss] = useState<WeeklyBoss | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }

    fetch(`/api/quests?week=${weekNum}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.weeklyBoss) {
          setWeeklyBoss(data.weeklyBoss);
        } else {
          const fallback = WEEKLY_BOSSES_SEED.find((b) => b.weekNumber === weekNum);
          setWeeklyBoss(fallback || null);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallback = WEEKLY_BOSSES_SEED.find((b) => b.weekNumber === weekNum);
        setWeeklyBoss(fallback || null);
        setLoading(false);
      });
  }, [weekNum]);

  async function handleVictory(weekNumber: number, lootBadge: string) {
    if (!user) return;

    const userId = user.id || user._id;
    const xpAmount = weekNumber === 4 ? 1000 : 500;

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type: "weeklyboss",
          weekNumber,
          xpEarned: xpAmount,
          lootEarned: lootBadge
        })
      });
      const data = await res.json();
      if (res.ok) {
        const updatedUser = {
          ...user,
          xp: data.xp,
          level: data.level,
          currentDay: data.currentDay,
          completedWeeklyBossWeeks: data.completedWeeklyBossWeeks,
          lootInventory: data.lootInventory
        };
        setUser(updatedUser);
        localStorage.setItem("py_hero_user", JSON.stringify(updatedUser));
      }
    } catch (e) {}
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <p className="text-sm font-semibold text-rose-400 animate-pulse">Loading Epic Boss Arena...</p>
      </main>
    );
  }

  if (!weeklyBoss) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Weekly Boss Dungeon #{weekNum} Not Found</h1>
        <a href="/quests" className="mt-6 rounded-full bg-cyan-400 px-6 py-2.5 text-xs font-bold text-slate-950">
          Back to Quest Board
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 sm:p-10">
      <div className="mx-auto max-w-5xl">
        <BossFight weeklyBoss={weeklyBoss} onVictory={handleVictory} />
      </div>
    </main>
  );
}
