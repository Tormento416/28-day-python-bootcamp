import { createClient } from "@/lib/supabase/server";
import { CheckpointForm } from "@/components/CheckpointForm";

const checkpointFallbacks: Record<number, { title: string; questions: any[] }> = {
  1: { title: 'Checkpoint 1', questions: [
    { id: 'c1q1', prompt: 'What does print("Hello") do?', type: 'mcq', options: ['Saves a file','Shows text on screen','Deletes code','Creates a loop'], correct_answer: 'Shows text on screen' },
    { id: 'c1q2', prompt: 'What is the output of a simple loop?', type: 'mcq', options: ['One time only','Repeated output','A new variable','An error always'], correct_answer: 'Repeated output' },
  ] },
  2: { title: 'Checkpoint 2', questions: [
    { id: 'c2q1', prompt: 'Which keyword starts an if statement?', type: 'mcq', options: ['for','if','def','import'], correct_answer: 'if' },
    { id: 'c2q2', prompt: 'What does a variable store?', type: 'mcq', options: ['A value','A loop','A file','A comment'], correct_answer: 'A value' },
  ] },
  3: { title: 'Checkpoint 3', questions: [
    { id: 'c3q1', prompt: 'Which loop repeats a fixed number of times?', type: 'mcq', options: ['while','for','try','with'], correct_answer: 'for' },
    { id: 'c3q2', prompt: 'What does a function help you do?', type: 'mcq', options: ['Repeat code','Delete files','Rename folders','Change colors'], correct_answer: 'Repeat code' },
  ] },
  4: { title: 'Checkpoint 4', questions: [
    { id: 'c4q1', prompt: 'What should a beginner be able to do by now?', type: 'mcq', options: ['Print, loop, and use if statements','Build a database cluster','Deploy satellites','Write an operating system'], correct_answer: 'Print, loop, and use if statements' },
    { id: 'c4q2', prompt: 'Why is try/except useful?', type: 'mcq', options: ['It hides all bugs forever','It helps handle errors','It makes code slower','It prints text'], correct_answer: 'It helps handle errors' },
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
