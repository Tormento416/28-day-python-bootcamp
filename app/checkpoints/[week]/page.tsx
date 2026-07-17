import { createClient } from "@/lib/supabase/server";
import { CheckpointForm } from "@/components/CheckpointForm";

const checkpointFallbacks: Record<number, { title: string; questions: any[] }> = {
  1: { title: 'Checkpoint 1', questions: [
    { id: 'c1q1', prompt: 'What does a variable store in Python?', type: 'mcq', options: ['A file','A value','A loop','A library'], correct_answer: 'A value' },
    { id: 'c1q2', prompt: 'Which keyword starts a conditional branch?', type: 'mcq', options: ['for','if','def','import'], correct_answer: 'if' },
  ] },
  2: { title: 'Checkpoint 2', questions: [
    { id: 'c2q1', prompt: 'Which loop is best when you know how many times to repeat?', type: 'mcq', options: ['while','for','try','with'], correct_answer: 'for' },
    { id: 'c2q2', prompt: 'What structure uses key-value pairs?', type: 'mcq', options: ['list','tuple','dictionary','set'], correct_answer: 'dictionary' },
  ] },
  3: { title: 'Checkpoint 3', questions: [
    { id: 'c3q1', prompt: 'What does a function help you do?', type: 'mcq', options: ['Store files','Repeat code','Delete bugs','Rename imports'], correct_answer: 'Repeat code' },
    { id: 'c3q2', prompt: 'Which block safely handles runtime errors?', type: 'mcq', options: ['if/else','try/except','for/range','class/object'], correct_answer: 'try/except' },
  ] },
  4: { title: 'Checkpoint 4', questions: [
    { id: 'c4q1', prompt: 'What does a list comprehension do?', type: 'mcq', options: ['Creates classes','Writes files','Builds a list compactly','Imports modules'], correct_answer: 'Builds a list compactly' },
    { id: 'c4q2', prompt: 'Why use a class?', type: 'mcq', options: ['To group related data and behavior','To avoid indentation','To rename variables','To speed up loops'], correct_answer: 'To group related data and behavior' },
  ] },
};

export default async function CheckpointPage({ params }: { params: { week: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;
  const week = Number(params.week);
  const { data: checkpoint } = await supabase.from('checkpoints').select('*').eq('week_number', week).single();
  const { data: questions } = await supabase.from('checkpoint_questions').select('*').eq('checkpoint_id', checkpoint?.id).order('prompt');
  const fallback = checkpointFallbacks[week] ?? { title: `Checkpoint ${week}`, questions: [] };
  const displayQuestions = questions && questions.length ? questions : fallback.questions;
  const title = checkpoint?.title ?? fallback.title;
  return <main className="min-h-screen p-8"><div className="mx-auto max-w-4xl space-y-6"><h1 className="text-3xl font-bold">{title}</h1><CheckpointForm checkpointId={checkpoint?.id ?? `fallback-week-${week}`} questions={displayQuestions} /></div></main>;
}
