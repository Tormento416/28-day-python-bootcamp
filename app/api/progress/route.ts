import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const questId = body.questId as string | undefined;
  if (!questId) return NextResponse.json({ error: "questId required" }, { status: 400 });
  const { error } = await supabase.from('user_quests').upsert({ user_id: user.id, quest_id: questId, status: body.status ?? 'in_progress', reflection: body.reflection ?? null, completed_at: body.status === 'completed' ? new Date().toISOString() : null });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
