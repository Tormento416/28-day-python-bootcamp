"use client";
import { useState } from "react";

export function QuestActions({ questId, reflection }: { questId: string; reflection?: string | null }) {
  const [text, setText] = useState(reflection ?? "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function save(status: "in_progress" | "completed") {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questId, status, reflection: text }),
    });
    const data = await res.json().catch(() => ({}));
    setMessage(res.ok ? (status === "completed" ? "Quest completed." : "Reflection saved.") : data.error || "Save failed.");
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a short reflection..."
          className="min-h-32 w-full rounded-2xl border border-white/10 bg-slate-950/40 p-4"
        />
        <button disabled={loading} onClick={() => save("in_progress")} type="button" className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
          {loading ? "Saving..." : "Save reflection"}
        </button>
      </div>

      <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
        <button disabled={loading} onClick={() => save("completed")} type="button" className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
          {loading ? "Saving..." : "Mark complete"}
        </button>
      </div>

      {message && <p className="text-sm text-slate-300">{message}</p>}
    </div>
  );
}
