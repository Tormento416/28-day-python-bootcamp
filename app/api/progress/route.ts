import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { userId, type, subQuestId, dayNumber, weekNumber, userCode, xpEarned, lootEarned } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let currentXp = (user.xp || 0) + (xpEarned || 0);
    // Level up every 200 XP
    let currentLevel = Math.floor(currentXp / 200) + 1;

    const completedSubQuestIds = new Set<string>(user.completedSubQuestIds || []);
    const completedMiniBossDays = new Set<number>(user.completedMiniBossDays || []);
    const completedWeeklyBossWeeks = new Set<number>(user.completedWeeklyBossWeeks || []);
    const lootInventory = new Set<string>(user.lootInventory || []);
    const userCodeSubmissions = { ...(user.userCodeSubmissions || {}) };

    if (type === "subquest" && subQuestId) {
      completedSubQuestIds.add(subQuestId);
      if (userCode) userCodeSubmissions[subQuestId] = userCode;
    }

    if (type === "miniboss" && dayNumber) {
      completedMiniBossDays.add(dayNumber);
      if (userCode) userCodeSubmissions[`day_${dayNumber}_miniboss`] = userCode;
      if (lootEarned) lootInventory.add(lootEarned);
    }

    if (type === "weeklyboss" && weekNumber) {
      completedWeeklyBossWeeks.add(weekNumber);
      if (lootEarned) lootInventory.add(lootEarned);
    }

    // Update active day progression if completing mini boss or weekly boss
    let newCurrentDay = user.currentDay || 1;
    if (type === "miniboss" && dayNumber >= newCurrentDay && newCurrentDay < 28) {
      newCurrentDay = dayNumber + 1;
    } else if (type === "weeklyboss" && weekNumber * 7 >= newCurrentDay && newCurrentDay < 28) {
      newCurrentDay = (weekNumber * 7) + 1;
    }

    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          xp: currentXp,
          level: currentLevel,
          currentDay: newCurrentDay,
          completedSubQuestIds: Array.from(completedSubQuestIds),
          completedMiniBossDays: Array.from(completedMiniBossDays),
          completedWeeklyBossWeeks: Array.from(completedWeeklyBossWeeks),
          lootInventory: Array.from(lootInventory),
          userCodeSubmissions,
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.json({
      success: true,
      xp: currentXp,
      level: currentLevel,
      currentDay: newCurrentDay,
      completedSubQuestIds: Array.from(completedSubQuestIds),
      completedMiniBossDays: Array.from(completedMiniBossDays),
      completedWeeklyBossWeeks: Array.from(completedWeeklyBossWeeks),
      lootInventory: Array.from(lootInventory)
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update progress" }, { status: 500 });
  }
}
