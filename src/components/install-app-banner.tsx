"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "lg-admin-install-dismissed";

export default function InstallAppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);
    setIsIOS(/iphone|ipad|ipod/i.test(window.navigator.userAgent));
    setDismissed(localStorage.getItem(DISMISSED_KEY) === "true");

    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, "true");
  }

  async function handleInstallClick() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  if (isStandalone || dismissed) return null;
  if (!deferredPrompt && !isIOS) return null;

  return (
    <div className="animate-fade-in-up relative w-full max-w-sm mb-4 rounded-xl border border-gold-500/40 bg-gold-50 dark:bg-gold-500/10 px-4 py-3 flex items-start gap-3">
      <div className="text-gold-600 dark:text-gold-500 shrink-0 mt-0.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-900 dark:text-white">Install the Admin App</p>
        {deferredPrompt ? (
          <>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
              This will be installed to your phone like an app — no app store needed.
            </p>
            <button
              onClick={handleInstallClick}
              className="mt-2 text-xs font-semibold rounded-lg bg-gold-600 text-white px-3 py-1.5 transition-all duration-150 hover:bg-gold-500"
            >
              Add to Home Screen
            </button>
          </>
        ) : (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
            Tap the Share icon, then &quot;Add to Home Screen&quot;. It&apos;ll be installed to your phone
            like an app.
          </p>
        )}
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors shrink-0"
      >
        ✕
      </button>
    </div>
  );
}
