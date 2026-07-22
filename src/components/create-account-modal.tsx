"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type Step = "form" | "confirm";
type NewAccountRole = "MP_ADMIN" | "BR_ADMIN" | "HEAD";

const ROLE_OPTIONS: { value: NewAccountRole; label: string }[] = [
  { value: "MP_ADMIN", label: "MP Admin" },
  { value: "BR_ADMIN", label: "BR Admin" },
  { value: "HEAD", label: "Head Admin" },
];

const ROLE_LABEL: Record<NewAccountRole, string> = {
  MP_ADMIN: "MP Admin",
  BR_ADMIN: "BR Admin",
  HEAD: "Head Admin",
};

const ROLE_DESCRIPTION: Record<NewAccountRole, string> = {
  MP_ADMIN: "Can only see and manage Multiplayer applicants. Can't create accounts.",
  BR_ADMIN: "Can only see and manage Battle Royale applicants. Can't create accounts.",
  HEAD: "Full access to both games, plus can create/manage admin accounts.",
};

export default function CreateAccountModal() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<NewAccountRole>("MP_ADMIN");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function reset() {
    setStep("form");
    setName("");
    setPassword("");
    setShowPassword(false);
    setRole("MP_ADMIN");
    setError(null);
  }

  function closeModal() {
    setOpen(false);
    reset();
  }

  function handleReview(e: React.FormEvent) {
    e.preventDefault();
    setStep("confirm");
  }

  async function handleConfirm() {
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
      setStep("form");
      return;
    }

    closeModal();
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gold-600 text-white px-3.5 py-2 text-sm font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M5 12h14M12 5v14" />
        </svg>
        Create Account
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              onClick={closeModal}
              className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[1px]"
            />
            <div className="animate-fade-in-up relative w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl p-6">
              {step === "form" ? (
                <form onSubmit={handleReview} className="space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Create Account</h2>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:rotate-90 transition-all duration-200 rounded p-1"
                    >
                      ✕
                    </button>
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    autoFocus
                    className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                  />
                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password (min 8 characters)"
                      required
                      minLength={8}
                      className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 pl-3 pr-10 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
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
                  <div className="flex rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    {ROLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRole(opt.value)}
                        className={`flex-1 py-2 text-sm font-medium transition-all duration-150 active:scale-95 ${
                          role === opt.value
                            ? "bg-gold-600 text-white"
                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-600 leading-snug">
                    {ROLE_LABEL[role]}: {ROLE_DESCRIPTION[role]}
                  </p>
                  {error && (
                    <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gold-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Review
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Confirm New Account</h2>
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-600">Name</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-600">Password</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{password}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500 dark:text-neutral-600">Role</span>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {ROLE_LABEL[role]}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-600 leading-snug">
                    {ROLE_DESCRIPTION[role]}
                  </p>
                  {error && (
                    <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-800 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 transition-all duration-150 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={submitting}
                      className="flex-1 rounded-lg bg-gold-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {submitting ? "Creating..." : "Confirm"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
