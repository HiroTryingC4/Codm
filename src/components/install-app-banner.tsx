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
        ) : isIOS ? (
          <div className="mt-1.5">
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-gold-500/60 text-gold-600 dark:text-gold-500 shrink-0 animate-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 3v10" />
                  <path d="M8 7l4-4 4 4" />
                  <rect x="4" y="12" width="16" height="9" rx="2" />
                </svg>
              </span>
              <span>
                Tap this <strong className="font-semibold">Share</strong> icon in Safari&apos;s toolbar
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5">
              Then scroll down and tap <strong className="font-semibold">&quot;Add to Home Screen&quot;</strong>.
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-500 mt-1.5">
              A new &quot;LG Admin&quot; icon will appear on your Home Screen — that&apos;s the
              confirmation it worked. Open the app from there and this banner will disappear
              automatically.
            </p>
          </div>
        ) : (
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
            Open this page in Chrome or Edge, then look for the install icon in the address bar (or the
            browser menu → &quot;Install app&quot;) to add it to your device like an app.
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
