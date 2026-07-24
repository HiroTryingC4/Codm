"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        onClick={onClose}
        className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[1px]"
      />
      <div className="animate-fade-in-up relative w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl p-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4 12 14.01l-3-3" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">Congratulations!</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          Your information has been submitted successfully.
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-gold-600 text-white py-2.5 font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body
  );
}
