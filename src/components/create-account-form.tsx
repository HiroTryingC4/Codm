"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not create account.");
      return;
    }

    setName("");
    setPassword("");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-4 space-y-3"
    >
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
        Create account
      </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password (min 8 characters)"
        required
        minLength={8}
        className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />
      {error && (
        <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-orange-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
      >
        {submitting ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
