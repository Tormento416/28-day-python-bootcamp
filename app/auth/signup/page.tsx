import { AuthForm } from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-md">
        <h1 className="mb-2 text-3xl font-bold">Register</h1>
        <p className="mb-6 text-slate-300">Create your learner account to track XP, complete quests, and unlock boss battles.</p>
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
