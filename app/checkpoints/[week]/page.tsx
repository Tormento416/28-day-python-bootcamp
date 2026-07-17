import { createClient } from "@/lib/supabase/server";
import { CheckpointForm } from "@/components/CheckpointForm";

export default async function CheckpointPage({ params }: { params: { week: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;
  const week = Number(params.week);
  const { data: checkpoint } = await supabase.from('checkpoints').select('*').eq('week_number', week).single();
  const { data: questions } = await supabase.from('checkpoint_questions').select('*').eq('checkpoint_id', checkpoint?.id).order('prompt');
  return <main className="min-h-screen p-8"><div className="mx-auto max-w-4xl space-y-6"><h1 className="text-3xl font-bold">{checkpoint?.title ?? `Checkpoint ${week}`}</h1><CheckpointForm checkpointId={checkpoint?.id ?? ""} questions={questions ?? []} /></div></main>;
}
