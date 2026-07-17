import { createClient } from "@/lib/supabase/server";
import { QuestDetail } from "@/components/QuestDetail";
import { QuestActions } from "@/components/QuestActions";

export default async function QuestPage({ params }: { params: { day: string } }){
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;
  const day = Number(params.day);
  const { data: quest } = await supabase.from('quests').select('*').eq('day_number', day).single();
  const fallbackDescriptions: Record<number, string> = {
    1: 'Welcome! Today you will learn what Python is, how to open the editor, and how to print Hello World.',
    2: 'Today you will use print() to show simple messages on the screen.',
    3: 'Today you will store values in variables.',
    4: 'Today you will ask the user for input and show it back.',
    5: 'Today you will practice simple number math in Python.',
    6: 'Today you will work with text and simple string methods.',
  };
  const fallback = { id: `fallback-day-${day}`, day_number: day, title: `Day ${day}`, subtitle: null, description: fallbackDescriptions[day] ?? 'Seed the database to load the full quest details.', tier: 'beginner', xp_value: 25, is_boss: false };
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
