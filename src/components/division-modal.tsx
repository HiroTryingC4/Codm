"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type DivisionInfo = {
  name: string;
  tag: string;
  description: string;
  img?: string;
};

export default function DivisionModal({
  division,
  onClose,
}: {
  division: DivisionInfo | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!division || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        onClick={onClose}
        className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[1px]"
      />
      <div className="animate-fade-in-up relative w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl overflow-hidden">
        {division.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={division.img}
            alt={division.name}
            className="w-full aspect-video object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{division.name}</h2>
              <p className="text-xs font-semibold text-gold-700 dark:text-gold-500 uppercase tracking-wide mt-1">
                {division.tag}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:rotate-90 transition-all duration-200 rounded p-1 shrink-0"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
            {division.description}
          </p>

          <button
            onClick={onClose}
            className="w-full rounded-lg bg-gold-600 text-white py-2.5 font-semibold transition-all duration-150 hover:bg-gold-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
