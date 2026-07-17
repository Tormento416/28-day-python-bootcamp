import { createClient } from "@/lib/supabase/server";
import { QuestDetail } from "@/components/QuestDetail";
import { QuestActions } from "@/components/QuestActions";

const fallbackDescriptions: Record<number, string> = {
  1: 'Python is an interpreted language. That means it does not wait until the entire program is finished before doing work. Instead, it reads and executes code line by line, in the order you wrote it. Order matters, because a later line can only use values that were created earlier. The first tool we learn is print. print is the simplest way to tell Python to display something on the screen, but it is much more important than it first appears. Programmers use print to confirm what a script is doing, to check the result of a calculation, to display the state of an object, or to show whether a task finished successfully. For example, a script might say Finished when everything worked, or Unfinished when it did not. Today your job is to write a program that prints Hello World so you can see the full loop from code to output.',
  2: 'Print is not only for showing a message to a person. It is one of the easiest ways to inspect what your program knows at a moment in time. If a variable has the wrong value, print can reveal it. If a function returned something unexpected, print can help you find out where the problem started. This lesson expands on that idea by having you print several messages and observe how output changes with each line.',
  3: 'A variable gives a name to a value. That matters because code becomes much easier to read when you can say player_name instead of repeating the same text everywhere. Variables also let programs change over time. A score can start at 0, increase after each correct answer, and then be shown at the end. In this quest, you will practice assigning values and reusing them so the idea becomes natural.',
  4: 'Programs become interactive when they can respond to the person using them. input pauses the program and waits for typed text, then returns that text so your code can use it. This is how you ask questions, collect names, get choices, and build conversations. In game terms, input is how the code hears the player. Today you will use it to let your program react to what someone types.',
  5: 'Numbers are the building blocks of calculations. Python can add, subtract, multiply, divide, and compare them, but it does so as real data, not as text. That difference matters because a score should act like a number, not a string of characters. If you accidentally treat numbers like text, the program behaves differently. This lesson helps you see why numeric types are separate and how that powers counters, totals, and game logic.',
  6: 'Strings are sequences of characters, and they are how Python represents words, sentences, names, and dialogue. They are essential because most user-facing parts of a program are text. You will learn how strings are created, combined, and displayed, and why text handling becomes important in menus, prompts, and character creation. By the end of this quest, strings should feel like the language your program uses to speak.'
};

export default async function QuestPage({ params }: { params: { day: string } }){
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <main className="min-h-screen p-8"><a href="/auth/login">Login first</a></main>;
  const day = Number(params.day);
  const { data: quest } = await supabase.from('quests').select('*').eq('day_number', day).single();
  const fallback = { id: `fallback-day-${day}`, day_number: day, title: `Day ${day}`, subtitle: null, description: fallbackDescriptions[day] ?? 'Seed the database to load the full quest details.', tier: 'beginner', xp_value: 25, is_boss: false, isFallback: true };
  const displayQuest = quest ?? fallback;
  const { data: progress } = await supabase.from('user_quests').select('quest_id,status,completed_at,reflection').eq('user_id', user.id).eq('quest_id', displayQuest.id).maybeSingle();
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <QuestDetail quest={displayQuest} progress={progress} />
        <QuestActions questId={displayQuest.id} reflection={progress?.reflection ?? ""} disabled={Boolean((displayQuest as any).isFallback)} />
        {(displayQuest as any).isFallback && (<p className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">This lesson is showing a fallback version because the real quest has not been loaded from the database yet. The lesson text can still be read, but completion cannot be saved until the real quest record exists in Supabase.</p>)})
        <a className="inline-block rounded-full border border-white/15 px-5 py-3 font-semibold" href="/quests">Back to quest list</a>
      </div>
    </main>
  );
}
