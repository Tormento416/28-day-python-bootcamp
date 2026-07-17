import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { BootcampSummary } from "@/components/BootcampSummary";
export default async function Dashboard(){
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;
  const { data: quests } = await supabase.from('quests').select('id,day_number,xp_value').order('day_number');
  const { data: completedRows } = await supabase.from('user_quests').select('quest_id').eq('user_id', user.id).eq('status','completed');
  const completedIds = new Set((completedRows ?? []).map((r:any)=>r.quest_id));
  const completed = quests?.filter((q:any)=>completedIds.has(q.id)).length ?? 0;
  const totalXp = quests?.filter((q:any)=>completedIds.has(q.id)).reduce((sum:number,q:any)=>sum + q.xp_value,0) ?? 0;
  return <main className="min-h-screen p-8"><div className="mx-auto max-w-6xl space-y-6"><Suspense fallback={<div>Loading dashboard...</div>}><BootcampSummary totalXp={totalXp} completed={completed} total={quests?.length ?? 28} /></Suspense></div></main>;
}
