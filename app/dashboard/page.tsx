import { createClient } from "@/lib/supabase/server";
import { BootcampSummary } from "@/components/BootcampSummary";

const DEFAULT_CHAR = { name: 'Adventurer', class_name: 'Wanderer', race: 'Human', alignment: 'Neutral Good', background: 'Newcomer', level: 1 };

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;

  const { data: profile } = await supabase.from('profiles').select('display_name, avatar_url, class_name, race, alignment, background, level').eq('id', user.id).maybeSingle();
  const { data: quests } = await supabase.from('quests').select('id,day_number,xp_value,title,description,tier').order('day_number');
  const { data: completedRows } = await supabase.from('user_quests').select('quest_id').eq('user_id', user.id).eq('status','completed');
  const fallbackQuests = Array.from({ length: 28 }, (_, i) => ({ id: `fallback-${i+1}`, day_number: i+1, xp_value: 25, title: `Day ${i+1}`, description: 'Quest data will appear after seeding the database.', tier: 'beginner' }));
  const questList = (quests && quests.length ? quests : fallbackQuests);
  const completedIds = new Set((completedRows ?? []).map((r:any)=>r.quest_id));
  const completed = questList.filter((q:any)=>completedIds.has(q.id)).length;
  const totalXp = questList.filter((q:any)=>completedIds.has(q.id)).reduce((sum:number,q:any)=>sum + (q.xp_value ?? 25),0);
  const char = { ...DEFAULT_CHAR, name: profile?.display_name ?? DEFAULT_CHAR.name, class_name: profile?.class_name ?? DEFAULT_CHAR.class_name, race: profile?.race ?? DEFAULT_CHAR.race, alignment: profile?.alignment ?? DEFAULT_CHAR.alignment, background: profile?.background ?? DEFAULT_CHAR.background, level: profile?.level ?? DEFAULT_CHAR.level };
  const firstQuest = questList?.[0];

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Character Sheet</p>
            <h1 className="mt-2 text-3xl font-bold">{char.name}</h1>
            <p className="mt-1 text-slate-300">Level {char.level} {char.race} {char.class_name}</p>
            <div className="mt-6 space-y-2 text-sm">
              <div className="rounded-2xl bg-white/10 px-4 py-3">Alignment: {char.alignment}</div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">Background: {char.background}</div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">XP: {totalXp}</div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">Quests completed: {completed}/{questList.length}</div>
            </div>
          </div>

          <div className="space-y-6">
            <BootcampSummary totalXp={totalXp} completed={completed} total={questList.length} />
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">Character creation</h2>
              <p className="mt-2 text-slate-300">Choose a simple starting identity. We keep it basic so beginners can start fast.</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <a className="rounded-2xl border border-white/15 px-4 py-3 hover:bg-white/10" href="/create-character">Create / edit character</a>
                <a className="rounded-2xl border border-white/15 px-4 py-3 hover:bg-white/10" href={`/quests/${firstQuest?.day_number ?? 1}`}>Begin the quest</a>
              </div>
            </section>
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
          <h2 className="text-2xl font-bold">Quest log</h2>
          <p className="mt-2 text-slate-300">Choose your next mission from the quest board.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950" href={`/quests/${firstQuest?.day_number ?? 1}`}>Enter Day 1</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/quests">Quest board</a>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Checkpoint rounds</h2>
          <p className="mt-2 text-slate-300">These are the boss fights of the bootcamp.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/1">Checkpoint 1</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/2">Checkpoint 2</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/3">Checkpoint 3</a>
            <a className="rounded-full border border-white/15 px-5 py-3 font-semibold" href="/checkpoints/4">Checkpoint 4</a>
          </div>
        </section>
      </div>
    </main>
  );
}
