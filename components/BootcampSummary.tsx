export function BootcampSummary({ totalXp, completed, total }: { totalXp: number; completed: number; total: number }) {
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return <div className="grid gap-4 md:grid-cols-3"><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-300">Total XP</p><p className="mt-2 text-3xl font-bold">{totalXp}</p></div><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-300">Completed quests</p><p className="mt-2 text-3xl font-bold">{completed}/{total}</p></div><div className="rounded-3xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-300">Progress</p><p className="mt-2 text-3xl font-bold">{pct}%</p></div></div>;
}
