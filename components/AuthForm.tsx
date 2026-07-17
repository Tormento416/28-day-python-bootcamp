"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setMessage(error ? error.message : "Signed in.");
      if (!error) router.push("/dashboard");
      router.refresh();
      setLoading(false);
      return;
    }

    const redirectTo = `${window.location.origin}/auth/callback`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: { display_name: displayName },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (userId && displayName) {
      await supabase.from("profiles").upsert({ id: userId, display_name: displayName });
    }

    setMessage("Account created. Check your email to confirm your registration, then log in.");
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
      {mode === "signup" && (
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
          placeholder="Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          required
        />
      )}
      <input
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
      />
      <input
        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
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
