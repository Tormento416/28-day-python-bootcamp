"use client";

import { useState } from "react";
import { WeeklyBoss, WeeklyBossQuestion } from "@/lib/db/models";
import { CodeEditor } from "./CodeEditor";

interface BossFightProps {
  weeklyBoss: WeeklyBoss;
  onVictory: (weekNumber: number, lootBadge: string) => void;
}

export function BossFight({ weeklyBoss, onVictory }: BossFightProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [bossHp, setBossHp] = useState(weeklyBoss.bossHp);
  const [solvedPhases, setSolvedPhases] = useState<number[]>([]);
  const [victory, setVictory] = useState(false);

  const question: WeeklyBossQuestion | undefined = weeklyBoss.questions[currentPhase];
  const totalPhases = weeklyBoss.questions.length;

  const handlePhaseSolved = (phaseIdx: number, damage: number) => {
    if (solvedPhases.includes(phaseIdx)) return;

    const newSolved = [...solvedPhases, phaseIdx];
    setSolvedPhases(newSolved);

    const newHp = Math.max(0, bossHp - damage);
    setBossHp(newHp);

    if (newSolved.length === totalPhases || newHp <= 0) {
      setVictory(true);
      onVictory(weeklyBoss.weekNumber, weeklyBoss.lootBadge);
    } else {
      setTimeout(() => {
        setCurrentPhase(phaseIdx + 1);
      }, 800);
    }
  };

  const hpPercentage = Math.round((bossHp / weeklyBoss.bossHp) * 100);

  return (
    <div className="space-y-6">
      {/* Boss Health Bar Header */}
      <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 text-4xl shadow-inner border border-rose-500/30">
              {weeklyBoss.bossAvatar}
            </span>
            <div>
              <span className="rounded-full bg-rose-500/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-rose-300 border border-rose-500/40">
                WEEK {weeklyBoss.weekNumber} EPIC BOSS DUNGEON
              </span>
              <h1 className="mt-1 text-3xl font-black text-white">{weeklyBoss.bossName}</h1>
              <p className="text-xs font-semibold text-rose-300">{weeklyBoss.bossTitle}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-amber-400">Reward: +{weeklyBoss.xpReward} XP</span>
            <div className="mt-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
              🏆 Badge: {weeklyBoss.lootBadge}
            </div>
          </div>
        </div>

        {/* Animated HP Bar */}
        <div className="mt-6 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-rose-300">BOSS HEALTH</span>
            <span className="text-white">{bossHp} / {weeklyBoss.bossHp} HP ({hpPercentage}%)</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full border border-rose-500/30 bg-slate-950">
            <div
              className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-400 transition-all duration-700 ease-out"
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-300">{weeklyBoss.narrative}</p>
      </div>

      {/* Victory Display */}
      {victory ? (
        <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-b from-amber-950/60 via-slate-900 to-slate-950 p-10 text-center shadow-2xl animate-pulse">
          <span className="text-6xl">👑</span>
          <h2 className="mt-4 text-4xl font-black text-amber-300">EPIC BOSS DEFEATED!</h2>
          <p className="mt-2 text-lg text-slate-200">
            You shattered {weeklyBoss.bossName} and claimed the <strong className="text-amber-400">{weeklyBoss.lootBadge}</strong>!
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/dashboard"
              className="rounded-full bg-amber-400 px-8 py-3 font-bold text-slate-950 shadow-lg shadow-amber-400/30 hover:scale-105 transition"
            >
              Return to Dashboard
            </a>
            <a
              href="/quests"
              className="rounded-full border border-white/20 px-8 py-3 font-bold text-white hover:bg-white/10 transition"
            >
              View Quest Board
            </a>
          </div>
        </div>
      ) : (
        /* Combat Phase Navigation & Code Editor */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-2">
            {weeklyBoss.questions.map((q, idx) => {
              const isSolved = solvedPhases.includes(idx);
              const isActive = currentPhase === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentPhase(idx)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                    isSolved
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : isActive
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                      : "bg-slate-800/60 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <span>{isSolved ? "💥 SOLVED" : q.combatPhase}</span>
                  <span className="rounded bg-slate-950/50 px-1.5 py-0.5 text-[10px] text-amber-300">
                    -{q.damageValue} HP
                  </span>
                </button>
              );
            })}
          </div>

          {question && (
            <div className="rounded-3xl border border-rose-500/30 bg-slate-900/40 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-500/30">
                  {question.combatPhase}
                </span>
                <span className="text-xs font-bold text-rose-400">Deal {question.damageValue} DMG</span>
              </div>

              <h3 className="mt-3 text-2xl font-bold text-white">{question.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{question.prompt}</p>

              <div className="mt-6">
                <CodeEditor
                  initialCode={question.starterCode}
                  testAssertion={question.testAssertion}
                  onSuccess={() => handlePhaseSolved(currentPhase, question.damageValue)}
                  submitLabel={`Cast Phase Strike (-${question.damageValue} Boss HP)`}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
