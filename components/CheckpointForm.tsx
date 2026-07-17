"use client";
import { useState } from "react";
import { submitCheckpoint } from "@/app/actions/bootcamp";
export function CheckpointForm({ checkpointId, questions }: { checkpointId: string; questions: any[] }) {
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [message, setMessage] = useState("");
  async function onSubmit(formData: FormData) {
    const responses = questions.map((q)=>({ questionId: q.id, answer: answers[q.id] ?? "", isCorrect: q.correct_answer ? (answers[q.id] ?? "").trim().toLowerCase() === q.correct_answer.trim().toLowerCase() : null }));
    formData.set("responses", JSON.stringify(responses));
    const result = await submitCheckpoint(formData);
    setMessage(result?.error ? result.error : "Checkpoint saved.");
  }
  return <form action={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6"><input type="hidden" name="checkpointId" value={checkpointId} />{questions.map((q)=> <label key={q.id} className="block space-y-2"><span className="font-medium">{q.prompt}</span>{q.type === 'mcq' ? <select className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3" value={answers[q.id] ?? ''} onChange={e=>setAnswers(v=>({...v,[q.id]:e.target.value}))}>{['',...(q.options ?? [])].map((o)=><option key={o} value={o}>{o || 'Select an answer'}</option>)}</select> : <input className="w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3" value={answers[q.id] ?? ''} onChange={e=>setAnswers(v=>({...v,[q.id]:e.target.value}))} />}</label>)}<button className="rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950">Submit checkpoint</button>{message && <p className="text-sm text-slate-300">{message}</p>}</form>; }
