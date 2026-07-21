"use client";

import { useRef, useState } from "react";
import { submitTryoutApplication } from "@/app/actions";
import ClanRulesModal from "./clan-rules-modal";

type Toggle<T extends string> = { value: T; label: string };

const TRYOUT_TYPES: Toggle<"COMPETITIVE" | "CASUAL">[] = [
  { value: "COMPETITIVE", label: "Competitive" },
  { value: "CASUAL", label: "Casual" },
];

const MODES: Toggle<"SOLO" | "TEAM">[] = [
  { value: "SOLO", label: "Solo" },
  { value: "TEAM", label: "Team" },
];

const inputClass =
  "w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500";

const labelClass = "block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1.5";

export default function TryoutForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [tryoutType, setTryoutType] = useState<"COMPETITIVE" | "CASUAL">(
    "COMPETITIVE"
  );
  const [mode, setMode] = useState<"SOLO" | "TEAM">("SOLO");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(
    null
  );

  const [rulesOpen, setRulesOpen] = useState(false);
  const [hasReadRules, setHasReadRules] = useState(false);
  const [rulesAgreed, setRulesAgreed] = useState(false);

  const [uid, setUid] = useState("");
  const uidError = uid.length > 0 && !/^\d+$/.test(uid) ? "UID must contain numbers only." : null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!/^\d+$/.test(uid)) {
      setResult({ success: false, error: "UID must contain numbers only." });
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("rulesAgreed", rulesAgreed ? "true" : "false");
      const res = await submitTryoutApplication(formData);

      setResult(res);
      if (res.success) {
        formRef.current?.reset();
        setRulesAgreed(false);
        setHasReadRules(false);
        setUid("");
      }
    } catch {
      setResult({
        success: false,
        error: "Something went wrong submitting your application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="animate-fade-in-up rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/40 p-6 sm:p-8 shadow-2xl shadow-neutral-300/40 dark:shadow-black/40 transition-colors">
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase mb-1">
          Player Application
        </p>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Tryout Form</h1>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass} htmlFor="inGameName">
            In-game name
          </label>
          <input id="inGameName" name="inGameName" required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="uid">
            UID
          </label>
          <input
            id="uid"
            name="uid"
            required
            inputMode="numeric"
            pattern="[0-9]*"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            aria-invalid={!!uidError}
            className={`${inputClass} ${
              uidError ? "border-red-400 dark:border-red-500/60 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {uidError && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{uidError}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Tryout type</label>
          <input type="hidden" name="tryoutType" value={tryoutType} />
          <div className="flex rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            {TRYOUT_TYPES.map((t) => (
              <button
                type="button"
                key={t.value}
                onClick={() => setTryoutType(t.value)}
                className={`flex-1 py-2.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
                  tryoutType === t.value
                    ? "bg-gold-600 text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>Mode</label>
          <input type="hidden" name="mode" value={mode} />
          <div className="flex rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            {MODES.map((m) => (
              <button
                type="button"
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`flex-1 py-2.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
                  mode === m.value
                    ? "bg-gold-600 text-white"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="role">
            Role / class <span className="text-neutral-500 dark:text-neutral-600">(optional)</span>
          </label>
          <input id="role" name="role" className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="motivation">
            Why you want in
          </label>
          <textarea id="motivation" name="motivation" rows={3} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="recruitedBy">
            Recruited by <span className="text-neutral-500 dark:text-neutral-600">(if applicable)</span>
          </label>
          <input
            id="recruitedBy"
            name="recruitedBy"
            placeholder="Name of the clan member who invited you"
            className={inputClass}
          />
        </div>

        <div className="rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3 space-y-3">
          <button
            type="button"
            onClick={() => {
              setRulesOpen(true);
              setHasReadRules(true);
            }}
            className="w-full rounded-lg border border-gold-500 text-gold-700 dark:text-gold-500 py-2 text-sm font-semibold transition-all duration-150 hover:bg-gold-50 dark:hover:bg-gold-500/10 hover:scale-[1.01] active:scale-[0.99]"
          >
            Read Clan Rules
          </button>

          <label
            className={`flex items-start gap-2 text-sm ${
              hasReadRules
                ? "text-neutral-700 dark:text-neutral-300 cursor-pointer"
                : "text-neutral-400 dark:text-neutral-600 cursor-not-allowed"
            }`}
          >
            <input
              type="checkbox"
              checked={rulesAgreed}
              disabled={!hasReadRules}
              onChange={(e) => setRulesAgreed(e.target.checked)}
              className="mt-0.5 accent-gold-600"
            />
            I have read and agree to the clan rules
          </label>
          {!hasReadRules && (
            <p className="text-xs text-neutral-500 dark:text-neutral-600">
              Please open and read the rules above first.
            </p>
          )}
        </div>

        {result?.error && (
          <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
            {result.error}
          </p>
        )}
        {result?.success && (
          <div className="animate-fade-in-up flex items-start gap-3 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 rounded-lg px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mt-0.5 shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
            <div>
              <p className="font-semibold">Successful!</p>
              <p className="text-sm opacity-90">Your tryout application has been submitted.</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !rulesAgreed}
          className="w-full rounded-lg bg-gold-600 text-white py-2.5 font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? "Submitting..." : "Submit application"}
        </button>
      </form>

      <ClanRulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />
    </div>
  );
}
