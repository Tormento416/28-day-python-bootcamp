import { createClient } from "@/lib/supabase/server";
import { QuestDetail } from "@/components/QuestDetail";
export default async function QuestPage({ params }: { params: { day: string } }){
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;
  const day = Number(params.day);
  const { data: quest } = await supabase.from('quests').select('*').eq('day_number', day).single();
  const { data: progress } = await supabase.from('user_quests').select('quest_id,status,completed_at,reflection').eq('user_id', user.id).eq('quest_id', quest?.id).maybeSingle();
  return <main className="min-h-screen p-8"><div className="mx-auto max-w-4xl"><QuestDetail quest={quest} progress={progress} /></div></main>;
}
