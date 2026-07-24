"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, displayName: displayName || username })
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      localStorage.setItem("py_hero_user", JSON.stringify(data.user));
      setMessage(mode === "login" ? "Logged in successfully!" : "Hero account created!");
      setLoading(false);

      if (mode === "signup") {
        router.push("/create-character");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setMessage(err.message || "Network error.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      {mode === "signup" && (
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
          placeholder="Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          required
        />
      )}
      <input
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        required
      />
      <input
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
      />
      <button disabled={loading} className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
      </button>
      {message && <p className="text-sm text-slate-300">{message}</p>}
    </form>
  );
}
