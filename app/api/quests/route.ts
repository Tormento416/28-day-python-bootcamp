import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { DAILY_QUESTS_SEED, WEEKLY_BOSSES_SEED } from "@/lib/db/seedData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dayStr = searchParams.get("day");
    const weekStr = searchParams.get("week");

    let { db } = { db: null as any };
    try {
      const conn = await connectToDatabase();
      db = conn.db;
    } catch (e) {
      // Fallback to static seed data if database is not reachable yet
    }

    if (dayStr) {
      const dayNum = Number(dayStr);
      if (db) {
        const quest = await db.collection("quests").findOne({ dayNumber: dayNum });
        if (quest) return NextResponse.json({ quest });
      }
      // Fallback to seed data
      const seedQuest = DAILY_QUESTS_SEED.find((q) => q.dayNumber === dayNum);
      return NextResponse.json({ quest: seedQuest || null });
    }

    if (weekStr) {
      const weekNum = Number(weekStr);
      if (db) {
        const boss = await db.collection("weekly_bosses").findOne({ weekNumber: weekNum });
        if (boss) return NextResponse.json({ weeklyBoss: boss });
      }
      const seedBoss = WEEKLY_BOSSES_SEED.find((b) => b.weekNumber === weekNum);
      return NextResponse.json({ weeklyBoss: seedBoss || null });
    }

    // Return list of all 28 days
    if (db) {
      const quests = await db.collection("quests").find({}).sort({ dayNumber: 1 }).toArray();
      if (quests && quests.length > 0) {
        return NextResponse.json({ quests, weeklyBosses: WEEKLY_BOSSES_SEED });
      }
    }

    return NextResponse.json({ quests: DAILY_QUESTS_SEED, weeklyBosses: WEEKLY_BOSSES_SEED });
  } catch (err: any) {
    return NextResponse.json({ quests: DAILY_QUESTS_SEED, weeklyBosses: WEEKLY_BOSSES_SEED });
  }
}
