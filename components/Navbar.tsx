"use client";

import { useEffect, useState } from "react";
import { ARCHETYPES, Archetype } from "@/lib/db/models";

export function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("py_hero_user");
    document.cookie = "py_user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/auth/login";
  };

  const archetypeInfo = user?.archetype ? ARCHETYPES[user.archetype as Archetype] : null;

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href={user ? "/dashboard" : "/"} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 font-black text-xl text-white shadow-lg shadow-cyan-500/30">
            🐲
          </span>
          <div>
            <span className="font-bold text-lg tracking-wider text-white">PYTHONIA</span>
            <span className="ml-2 text-xs font-semibold text-cyan-400">28-DAY RPG</span>
          </div>
        </a>

        {user ? (
          <div className="flex items-center gap-4">
            <a href="/quests" className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition">
              Quest Map
            </a>
            <a href="/dashboard" className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-200 hover:border-cyan-400 transition">
              <span>{archetypeInfo?.icon || "⚔️"}</span>
              <span>Lvl {user.level || 1} {user.displayName || user.username}</span>
              {archetypeInfo && <span className="text-cyan-400">({archetypeInfo.name})</span>}
            </a>
            <button
              onClick={logout}
              className="text-xs text-slate-400 hover:text-rose-400 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <a href="/auth/login" className="text-sm font-semibold text-slate-300 hover:text-white">
              Log In
            </a>
            <a href="/auth/signup" className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300 shadow-md shadow-cyan-400/20">
              Begin Adventure
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
