"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, displayName: displayName || username })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("py_hero_user", JSON.stringify(data.user));
      router.push("/create-character");
    } catch (err: any) {
      setError(err.message || "Network error");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[85vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <span className="text-4xl">⚔️</span>
          <h1 className="mt-3 text-3xl font-extrabold text-white">Create Hero Account</h1>
          <p className="mt-1 text-xs text-slate-400">Join the 28-day Pythonia training bootcamp</p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-semibold text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300">Display Name</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              placeholder="e.g. Kaelen Fireblade"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              placeholder="e.g. kaelen99"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 py-3.5 font-extrabold text-slate-950 shadow-lg shadow-cyan-400/20 hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Creating Character..." : "Proceed to Day 1 Archetype Selection"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Already registered?{" "}
          <a href="/auth/login" className="font-bold text-cyan-400 hover:underline">
            Log In Here
          </a>
        </p>
      </div>
    </main>
  );
}
