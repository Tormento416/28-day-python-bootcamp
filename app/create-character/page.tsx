"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const races = ["Human", "Elf", "Dwarf", "Halfling"];
const classes = ["Fighter", "Wizard", "Rogue", "Cleric"];
const alignments = ["Neutral Good", "Lawful Good", "Chaotic Good", "Neutral"];
const classTraits: Record<string, string> = {
  Fighter: 'Gains a bonus on simple combat-themed quests.',
  Wizard: 'Gains a bonus on logic and pattern quests.',
  Rogue: 'Gains a bonus on debugging and problem-solving quests.',
  Cleric: 'Gains a bonus on helper and refactor quests.',
};

export default function CreateCharacterPage() {
  const [name, setName] = useState("");
  const [race, setRace] = useState(races[0]);
  const [className, setClassName] = useState(classes[0]);
  const [alignment, setAlignment] = useState(alignments[0]);
  const [background, setBackground] = useState("A curious beginner");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMessage('Please log in first.'); setLoading(false); return; }
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      display_name: name || 'Adventurer',
      race,
      class_name: className,
      alignment,
      background,
      level: 1,
    });
    setMessage(error ? error.message : 'Character created.');
    setLoading(false);
    if (!error) router.push('/dashboard');
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-400/20 bg-white/5 p-6">
        <h1 className="text-3xl font-bold">Create your character</h1>
        <p className="mt-2 text-slate-300">Pick a simple hero identity to begin your adventure.</p>
        <form onSubmit={save} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2"><span className="text-sm text-slate-300">Name</span><input className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3" value={name} onChange={e=>setName(e.target.value)} placeholder="Adventurer" /></label>
          <label className="space-y-2"><span className="text-sm text-slate-300">Race</span><select className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3" value={race} onChange={e=>setRace(e.target.value)}>{races.map(r=><option key={r}>{r}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm text-slate-300">Class</span><select className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3" value={className} onChange={e=>setClassName(e.target.value)}>{classes.map(c=><option key={c}>{c}</option>)}</select></label>
          <label className="space-y-2"><span className="text-sm text-slate-300">Alignment</span><select className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3" value={alignment} onChange={e=>setAlignment(e.target.value)}>{alignments.map(a=><option key={a}>{a}</option>)}</select></label>
          <label className="space-y-2 md:col-span-2"><span className="text-sm text-slate-300">Background</span><input className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3" value={background} onChange={e=>setBackground(e.target.value)} /></label>
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-300">
            <strong>Class trait:</strong> {classTraits[className]}
          </div>
          <button disabled={loading} className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">{loading ? 'Saving...' : 'Save character'}</button>
        </form>
        {message && <p className="mt-4 text-sm text-slate-300">{message}</p>}
      </div>
    </main>
  );
}
