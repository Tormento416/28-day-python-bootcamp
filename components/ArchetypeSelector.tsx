"use client";

import { useState } from "react";
import { ARCHETYPES, Archetype, ArchetypeDetails } from "@/lib/db/models";

interface ArchetypeSelectorProps {
  onSelect: (archetype: Archetype) => void;
  currentArchetype?: Archetype | null;
  loading?: boolean;
}

export function ArchetypeSelector({ onSelect, currentArchetype, loading }: ArchetypeSelectorProps) {
  const [selected, setSelected] = useState<Archetype>(currentArchetype || "wizard");

  const archetypesList: ArchetypeDetails[] = Object.values(ARCHETYPES);

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-500/30 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
      <div className="text-center">
        <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/20">
          Day 1 Ritual
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
          Choose Your Hero Archetype
        </h2>
        <p className="mt-2 text-slate-300">
          Your choice shapes your Python quest storyline, code examples, starter tools, and late-game specializations!
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {archetypesList.map((item) => {
          const isSelected = selected === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all duration-300 ${
                isSelected
                  ? "border-cyan-400 bg-gradient-to-b from-cyan-950/80 to-slate-900 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/50"
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{item.icon}</span>
                  {isSelected && (
                    <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                      SELECTED
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-xl font-bold text-white group-hover:text-cyan-300">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-400">{item.focusArea}</p>

                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-cyan-500/20 bg-slate-950/70 p-2.5 text-[11px] text-cyan-200">
                <span className="font-semibold text-cyan-400">Bonus: </span>
                {item.traitBonus}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          disabled={loading}
          onClick={() => onSelect(selected)}
          className="rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 px-10 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Locking in Archetype..." : `Confirm Choice: ${ARCHETYPES[selected].name}`}
        </button>
      </div>
    </div>
  );
}
