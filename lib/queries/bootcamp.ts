export type Quest = { id: string; day_number: number; title: string; subtitle: string | null; description: string | null; tier: string; xp_value: number; is_boss: boolean };
export type UserQuest = { quest_id: string; status: string; completed_at: string | null; reflection: string | null };
export type Checkpoint = { id: string; week_number: number; title: string; description: string | null };
export type CheckpointQuestion = { id: string; checkpoint_id: string; prompt: string; type: string; options: string[] | null; correct_answer: string | null };

export async function getDashboardData(supabase: any, userId: string) {
  const [questsRes, userQuestsRes, lootRes] = await Promise.all([
    supabase.from('quests').select('*').order('day_number', { ascending: true }),
    supabase.from('user_quests').select('quest_id,status,completed_at,reflection').eq('user_id', userId),
    supabase.from('user_loot').select('loot_id,awarded_at').eq('user_id', userId),
  ]);
  return { quests: questsRes.data ?? [], userQuests: userQuestsRes.data ?? [], loot: lootRes.data ?? [] };
}

export async function getQuestData(supabase: any, userId: string, day: number) {
  const { data: quest } = await supabase.from('quests').select('*').eq('day_number', day).single();
  const { data: progress } = await supabase.from('user_quests').select('quest_id,status,completed_at,reflection').eq('user_id', userId).eq('quest_id', quest?.id).maybeSingle();
  return { quest, progress };
}

export async function getCheckpointData(supabase: any, week: number, userId?: string) {
  const { data: checkpoint } = await supabase.from('checkpoints').select('*').eq('week_number', week).single();
  const { data: questions } = await supabase.from('checkpoint_questions').select('*').eq('checkpoint_id', checkpoint?.id).order('prompt');
  let responses = [];
  if (userId && questions?.length) {
    const ids = questions.map((q: any) => q.id);
    const res = await supabase.from('checkpoint_responses').select('*').eq('user_id', userId).in('question_id', ids);
    responses = res.data ?? [];
  }
  return { checkpoint, questions: questions ?? [], responses };
}
