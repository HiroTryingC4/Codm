"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function RemoveAccountButton({
  adminId,
  adminName,
}: {
  adminId: string;
  adminName: string;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function closeModal() {
    setOpen(false);
    setError(null);
  }

  async function handleRemove() {
    setSubmitting(true);
    setError(null);

    const res = await fetch(`/api/admin/accounts/${adminId}`, { method: "DELETE" });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not remove account.");
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Remove ${adminName}`}
        className="shrink-0 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              onClick={closeModal}
              className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[1px]"
            />
            <div className="animate-fade-in-up relative w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Remove Account</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Remove <span className="font-medium text-neutral-900 dark:text-neutral-100">{adminName}</span>?
                This cannot be undone.
              </p>
              {error && (
                <p className="animate-fade-in-up text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-800 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 transition-all duration-150 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-red-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {submitting ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
