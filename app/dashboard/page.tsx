import { createClient } from "@/lib/supabase/server";
import { BootcampSummary } from "@/components/BootcampSummary";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;

  const { data: quests } = await supabase.from('quests').select('id,day_number,xp_value,title,description').order('day_number');
  const { data: completedRows } = await supabase.from('user_quests').select('quest_id').eq('user_id', user.id).eq('status','completed');
  const fallbackQuests = Array.from({ length: 28 }, (_, i) => ({ id: `fallback-${i+1}`, day_number: i+1, xp_value: 100, title: `Day ${i+1}`, description: 'Quest data will appear after seeding the database.' }));
  const questList = (quests && quests.length ? quests : fallbackQuests);
  const completedIds = new Set((completedRows ?? []).map((r:any)=>r.quest_id));
  const completed = questList.filter((q:any)=>completedIds.has(q.id)).length;
  const totalXp = questList.filter((q:any)=>completedIds.has(q.id)).reduce((sum:number,q:any)=>sum + (q.xp_value ?? 100),0);
  const firstQuest = questList?.[0];

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <BootcampSummary totalXp={totalXp} completed={completed} total={questList.length} />

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Start the game</h2>
          <p className="mt-2 text-slate-300">Pick up where you left off or begin with Day 1.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950" href={`/quests/${firstQuest?.day_number ?? 1}`}>Start Day 1</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/quests">Open quest list</a>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Checkpoint rounds</h2>
          <p className="mt-2 text-slate-300">Every week ends with a checkpoint challenge.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/1">Open Checkpoint 1</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/2">Open Checkpoint 2</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/3">Open Checkpoint 3</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/4">Open Checkpoint 4</a>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {questList.slice(0, 3).map((quest:any) => (
            <a key={quest.id} href={`/quests/${quest.day_number}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10">
              <p className="text-sm text-cyan-300">Day {quest.day_number}</p>
              <h3 className="mt-2 text-xl font-bold">{quest.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{quest.description}</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}
