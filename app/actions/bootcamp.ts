"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markQuestComplete(formData: FormData) {
  const questId = String(formData.get("questId") || "");
  const reflection = String(formData.get("reflection") || "");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { error } = await supabase.from("user_quests").upsert({ user_id: user.id, quest_id: questId, status: "completed", completed_at: new Date().toISOString(), reflection });
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  revalidatePath(`/quests`);
  return { success: true };
}

export async function saveReflection(formData: FormData) {
  const questId = String(formData.get("questId") || "");
  const reflection = String(formData.get("reflection") || "");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { error } = await supabase.from("user_quests").upsert({ user_id: user.id, quest_id: questId, status: "in_progress", reflection });
  if (error) return { error: error.message };
  revalidatePath(`/quests`);
  return { success: true };
}

export async function submitCheckpoint(formData: FormData) {
  const checkpointId = String(formData.get("checkpointId") || "");
  const payload = JSON.parse(String(formData.get("responses") || "[]"));
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const rows = payload.map((r: any) => ({ user_id: user.id, question_id: r.questionId, answer: r.answer, is_correct: r.isCorrect ?? null }));
  const { error } = await supabase.from("checkpoint_responses").upsert(rows, { onConflict: "user_id,question_id" });
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  revalidatePath(`/checkpoints/${checkpointId}`);
  return { success: true };
}
