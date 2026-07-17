import { createClient } from "@/lib/supabase/server";

export default async function QuestsPage() {
  const supabase = await createClient();
  const { data: quests } = await supabase.from('quests').select('*').order('day_number');
  const fallbackQuests = Array.from({ length: 28 }, (_, i) => ({ id: `fallback-${i+1}`, day_number: i+1, title: `Day ${i+1}`, description: 'Quest data will appear after seeding the database.', xp_value: 100 }));
  const list = (quests && quests.length ? quests : fallbackQuests);
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-4xl font-bold">Quest List</h1>
        <p className="text-slate-300">Choose a day to begin or continue.</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((quest:any) => (
            <a key={quest.id} href={`/quests/${quest.day_number}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <p className="text-sm text-cyan-300">Day {quest.day_number}</p>
              <h2 className="mt-2 text-xl font-bold">{quest.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{quest.description}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
