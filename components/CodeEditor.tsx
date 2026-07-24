"use client";

import { useState } from "react";
import { executePythonCode } from "@/lib/pyodide";

interface CodeEditorProps {
  initialCode: string;
  testAssertion?: string;
  hints?: string[];
  onSuccess?: (code: string) => void;
  submitLabel?: string;
}

export function CodeEditor({
  initialCode,
  testAssertion,
  hints,
  onSuccess,
  submitLabel = "Execute Spell"
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [passed, setPassed] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  async function handleRun() {
    setRunning(true);
    setOutput("Warming up Pyodide WebAssembly engine...");
    setPassed(null);

    const result = await executePythonCode(code, testAssertion);

    setRunning(false);
    setOutput(result.output);
    setPassed(result.testPassed ?? result.success);

    if ((result.testPassed ?? result.success) && onSuccess) {
      onSuccess(code);
    }
  }

  function handleReset() {
    setCode(initialCode);
    setOutput("");
    setPassed(null);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-xl">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
          <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
          <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
          <span className="ml-2 font-mono text-xs text-slate-400">spellbook.py</span>
        </div>

        <div className="flex items-center gap-2">
          {hints && hints.length > 0 && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-amber-400 hover:text-amber-300 transition"
            >
              {showHint ? "Hide Hint" : "💡 Reveal Hint"}
            </button>
          )}
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white transition"
          >
            Reset Code
          </button>
        </div>
      </div>

      {/* Hint Banner */}
      {showHint && hints && (
        <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
          <strong className="text-amber-300">Spell Hint: </strong>
          {hints[0]}
        </div>
      )}

      {/* Code Textarea */}
      <div className="relative mt-3">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="h-44 w-full rounded-xl border border-slate-800 bg-slate-900/90 p-4 font-mono text-sm text-cyan-300 placeholder-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          placeholder="# Write your Python code here..."
        />
      </div>

      {/* Action Bar */}
      <div className="mt-3 flex items-center justify-between">
        <button
          disabled={running}
          onClick={handleRun}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-6 py-2.5 font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:scale-105 disabled:opacity-50"
        >
          {running ? (
            <>
              <span className="animate-spin text-sm">🔮</span>
              <span>Casting Spell...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>{submitLabel}</span>
            </>
          )}
        </button>

        {passed !== null && (
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${
              passed
                ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                : "border border-rose-500/40 bg-rose-500/20 text-rose-300"
            }`}
          >
            <span>{passed ? "✨ Spell Passed!" : "💥 Spell Fizzled (Try Again)"}</span>
          </div>
        )}
      </div>

      {/* Console Output Window */}
      {output && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Terminal Output</span>
            <span className="font-mono text-[10px] text-cyan-400">stdout/stderr</span>
          </div>
          <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap font-mono text-xs text-slate-200">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
