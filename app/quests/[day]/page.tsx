import { createClient } from "@/lib/supabase/server";
import { QuestDetail } from "@/components/QuestDetail";
import { QuestActions } from "@/components/QuestActions";

export default async function QuestPage({ params }: { params: { day: string } }){
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;
  const day = Number(params.day);
  const { data: quest } = await supabase.from('quests').select('*').eq('day_number', day).single();
  const fallback = { id: `fallback-day-${day}`, day_number: day, title: `Day ${day}`, subtitle: null, description: 'Seed the database to load the full quest details.', tier: 'basic', xp_value: 100, is_boss: false };
  const displayQuest = quest ?? fallback;
  const { data: progress } = await supabase.from('user_quests').select('quest_id,status,completed_at,reflection').eq('user_id', user.id).eq('quest_id', displayQuest.id).maybeSingle();
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <QuestDetail quest={displayQuest} progress={progress} />
        <QuestActions questId={displayQuest.id} reflection={progress?.reflection ?? ""} />
        <a className="inline-block rounded-full border border-white/15 px-5 py-3 font-semibold" href="/quests">Back to quest list</a>
      </div>
    </main>
  );
}
