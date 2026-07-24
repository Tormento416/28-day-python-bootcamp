import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        username: user.username,
        displayName: user.displayName || user.username,
        archetype: user.archetype || null,
        level: user.level || 1,
        xp: user.xp || 0,
        hp: user.hp || 100,
        maxHp: user.maxHp || 100,
        mana: user.mana || 100,
        maxMana: user.maxMana || 100,
        currentDay: user.currentDay || 1,
        completedSubQuestIds: user.completedSubQuestIds || [],
        completedMiniBossDays: user.completedMiniBossDays || [],
        completedWeeklyBossWeeks: user.completedWeeklyBossWeeks || [],
        lootInventory: user.lootInventory || [],
        userCodeSubmissions: user.userCodeSubmissions || {}
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, archetype, displayName } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const updateData: any = { updatedAt: new Date() };

    if (archetype) updateData.archetype = archetype;
    if (displayName) updateData.displayName = displayName;

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );

    const updatedUser = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser!._id.toString(),
        username: updatedUser!.username,
        displayName: updatedUser!.displayName || updatedUser!.username,
        archetype: updatedUser!.archetype,
        level: updatedUser!.level || 1,
        xp: updatedUser!.xp || 0,
        currentDay: updatedUser!.currentDay || 1,
        completedSubQuestIds: updatedUser!.completedSubQuestIds || [],
        completedMiniBossDays: updatedUser!.completedMiniBossDays || [],
        completedWeeklyBossWeeks: updatedUser!.completedWeeklyBossWeeks || [],
        lootInventory: updatedUser!.lootInventory || []
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update profile" }, { status: 500 });
  }
}
