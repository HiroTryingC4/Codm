"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, rememberMe }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setError("Invalid name or password.");
      return;
    }

    router.push("/admin/analytics");
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
        <p className="text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase mb-1">
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
              className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 pl-3 pr-10 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors p-1"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <path d="M2 2l20 20" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-gold-600"
            />
            Remember me
          </label>
          {error && (
            <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gold-600 text-white py-2.5 font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
