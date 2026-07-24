"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArchetypeSelector } from "@/components/ArchetypeSelector";
import { Archetype } from "@/lib/db/models";

export default function CreateCharacterPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cached = localStorage.getItem("py_hero_user");
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch (e) {}
    }
  }, []);

  async function handleSelectArchetype(archetype: Archetype) {
    if (!user) {
      alert("Please login or create an account first.");
      router.push("/auth/signup");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id || user._id,
          archetype
        })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.user) {
        localStorage.setItem("py_hero_user", JSON.stringify(data.user));
        router.push("/quests/1");
      } else {
        alert(data.error || "Failed to save archetype choice.");
      }
    } catch (err: any) {
      setLoading(false);
      alert("Network error: " + err.message);
    }
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <ArchetypeSelector
        currentArchetype={user?.archetype}
        onSelect={handleSelectArchetype}
        loading={loading}
      />
    </main>
  );
}
