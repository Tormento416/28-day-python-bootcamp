import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { DAILY_QUESTS_SEED, WEEKLY_BOSSES_SEED } from "@/lib/db/seedData";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const questsCol = db.collection("quests");
    const weeklyBossesCol = db.collection("weekly_bosses");

    await questsCol.deleteMany({});
    await weeklyBossesCol.deleteMany({});

    await questsCol.insertMany(DAILY_QUESTS_SEED as any[]);
    await weeklyBossesCol.insertMany(WEEKLY_BOSSES_SEED as any[]);

    return NextResponse.json({
      success: true,
      message: `Seeded ${DAILY_QUESTS_SEED.length} daily quests and ${WEEKLY_BOSSES_SEED.length} weekly epic bosses into MongoDB.`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Seeding failed" }, { status: 500 });
  }
}
