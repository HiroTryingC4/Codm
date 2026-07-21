"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const RULES = [
  "Respect every member — no toxicity, harassment, or hate speech in chat or voice.",
  "Attend scheduled tryouts and scrims on time, or give notice in advance if you can't make it.",
  "Follow officer and shot-caller instructions during matches.",
  "No cheating, exploiting, or use of unauthorized third-party tools.",
  "Represent the clan tag and name with good sportsmanship, in and out of matches.",
];

export default function ClanRulesModal({
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
      <div className="animate-fade-in-up relative w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Clan Rules</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:rotate-90 transition-all duration-200 rounded p-1"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-2.5 mb-6">
          {RULES.map((rule, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-300"
            >
              <span className="text-gold-700 dark:text-gold-500 font-semibold shrink-0">
                {i + 1}.
              </span>
              {rule}
            </li>
          ))}
        </ul>

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
