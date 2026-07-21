"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError("Invalid name or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/admin-cover.jpg')" }}
      />
      <div className="fixed inset-0 bg-white/85 dark:bg-neutral-950/85 transition-colors duration-300" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.12),_transparent_60%)]" />

      <div className="fixed top-4 left-4 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 px-3 py-1.5 transition-all duration-150 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-x-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>
      <div className="fixed top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="animate-fade-in-up w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/40 p-8 shadow-2xl shadow-neutral-300/40 dark:shadow-black/40 transition-colors">
        <p className="text-xs font-semibold tracking-widest text-orange-600 dark:text-orange-500 uppercase mb-1">
          Restricted
        </p>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1.5" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 outline-none transition-colors focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 outline-none transition-colors focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
          {error && (
            <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-orange-600 text-white py-2.5 font-semibold transition-all duration-150 hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
