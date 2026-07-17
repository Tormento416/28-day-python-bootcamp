"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const action = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = mode === "login"
      ? await action({ email, password })
      : await action({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } } as any);
    if (error) return setMessage(error.message);
    setMessage(mode === "login" ? "Signed in." : "Check your email for the magic link.");
    router.refresh();
  }
  return (<form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
    <input className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
    <input className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
    <button className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950">{mode === "login" ? "Login" : "Create account"}</button>
    {message && <p className="text-sm text-slate-300">{message}</p>}
  </form>);
}
