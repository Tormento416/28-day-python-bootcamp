import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");

    const cleanUsername = username.trim().toLowerCase();
    const existingUser = await usersCollection.findOne({ username: cleanUsername });

    if (!existingUser) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    if (existingUser.password !== password) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Return user profile data
    const userProfile = {
      id: existingUser._id.toString(),
      username: existingUser.username,
      displayName: existingUser.displayName || existingUser.username,
      archetype: existingUser.archetype || null,
      level: existingUser.level || 1,
      xp: existingUser.xp || 0,
      hp: existingUser.hp || 100,
      maxHp: existingUser.maxHp || 100,
      mana: existingUser.mana || 100,
      maxMana: existingUser.maxMana || 100,
      currentDay: existingUser.currentDay || 1,
      completedSubQuestIds: existingUser.completedSubQuestIds || [],
      completedMiniBossDays: existingUser.completedMiniBossDays || [],
      completedWeeklyBossWeeks: existingUser.completedWeeklyBossWeeks || [],
      lootInventory: existingUser.lootInventory || []
    };

    const response = NextResponse.json({ user: userProfile, success: true });
    response.cookies.set("py_user_id", existingUser._id.toString(), { path: "/", httpOnly: false });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
  }
}
