"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "HEAD">("ADMIN");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, role }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not create account.");
      return;
    }

    setName("");
    setPassword("");
    setRole("ADMIN");
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
        className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password (min 8 characters)"
        required
        minLength={8}
        className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
      />
      <div className="flex rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <button
          type="button"
          onClick={() => setRole("ADMIN")}
          className={`flex-1 py-2 text-sm font-medium transition-all duration-150 active:scale-95 ${
            role === "ADMIN"
              ? "bg-gold-600 text-white"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
          }`}
        >
          Admin
        </button>
        <button
          type="button"
          onClick={() => setRole("HEAD")}
          className={`flex-1 py-2 text-sm font-medium transition-all duration-150 active:scale-95 ${
            role === "HEAD"
              ? "bg-gold-600 text-white"
              : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
          }`}
        >
          Head Admin
        </button>
      </div>
      {error && (
        <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gold-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
      >
        {submitting ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
