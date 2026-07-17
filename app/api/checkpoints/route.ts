import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const responses = Array.isArray(body.responses) ? body.responses : [];
  if (!responses.length) return NextResponse.json({ error: "responses required" }, { status: 400 });

  const rows = responses.map((r: any) => ({
    user_id: user.id,
    question_id: r.questionId,
    answer: r.answer,
    is_correct: r.isCorrect ?? null,
  }));

  const { error } = await supabase.from("checkpoint_responses").upsert(rows, { onConflict: "user_id,question_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
