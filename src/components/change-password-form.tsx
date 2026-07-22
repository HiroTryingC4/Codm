"use client";

import { useState } from "react";

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1.5" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          required
          minLength={id === "newPassword" ? 8 : undefined}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 pl-3 pr-10 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors p-1"
        >
          {show ? (
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
  );
}

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/admin/profile/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not update password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-3"
    >
      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-600 uppercase tracking-wide">
        Change Password
      </p>
      <PasswordField
        id="currentPassword"
        label="Current password"
        value={currentPassword}
        onChange={setCurrentPassword}
        autoComplete="current-password"
      />
      <PasswordField
        id="newPassword"
        label="New password"
        value={newPassword}
        onChange={setNewPassword}
        autoComplete="new-password"
      />
      <PasswordField
        id="confirmPassword"
        label="Confirm new password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
      />
      {error && (
        <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {success && (
        <p className="animate-fade-in-up text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 rounded-lg px-3 py-2">
          Password updated.
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-gold-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
      >
        {submitting ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
