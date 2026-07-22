"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AdminRole, GameType } from "@/types";
import { getAllowedGames } from "@/lib/access";
import ThemeToggle from "./theme-toggle";

const ROLE_LABEL: Record<AdminRole, string> = {
  HEAD: "Head Admin",
  ADMIN: "Admin",
  MP_ADMIN: "MP Admin",
  BR_ADMIN: "BR Admin",
};

const ROLE_BADGE: Record<AdminRole, string> = {
  HEAD: "text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-500/10 border-gold-300 dark:border-gold-500/30",
  ADMIN: "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
  MP_ADMIN: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30",
  BR_ADMIN: "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/30",
};

const GAME_OPTIONS: { value: "ALL" | GameType; label: string }[] = [
  { value: "ALL", label: "All Games" },
  { value: "MP", label: "MP" },
  { value: "BR", label: "BR" },
];

const NAV_LINKS = [
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 3v18h18" />
        <path d="M18.7 8 12 14.7l-3.5-3.5L4 15.7" />
      </svg>
    ),
  },
  {
    href: "/admin",
    label: "Board",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    href: "/admin/accounts",
    label: "Accounts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const PROFILE_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

export default function AdminSidebar({
  currentAdmin,
}: {
  currentAdmin: { name: string; role: AdminRole };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [gameMenuOpen, setGameMenuOpen] = useState(false);

  const allowedGames = getAllowedGames(currentAdmin.role);
  const rawGameParam = searchParams.get("game");
  const currentGame =
    rawGameParam && allowedGames.includes(rawGameParam as GameType) ? rawGameParam : "ALL";

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  function handleGameSelect(value: "ALL" | GameType) {
    if (value !== "ALL" && !allowedGames.includes(value)) return;
    setOpen(false);
    setGameMenuOpen(false);
    router.push(value === "ALL" ? "/admin" : `/admin?game=${value}`);
  }


  const linkClass = (href: string) =>
    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
      isActive(href)
        ? "bg-gold-600 text-white"
        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
    }`;

  const sidebarBody = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <p className="text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase">
          Last Game Reborn
        </p>
        <h1 className="font-bold text-neutral-900 dark:text-white">Admin Panel</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_LINKS.map((link) => {
          const isBoard = link.href === "/admin";
          return (
            <div key={link.href} className="relative">
              <Link
                href={link.href}
                onClick={(e) => {
                  if (isBoard) {
                    e.preventDefault();
                    setGameMenuOpen((v) => !v);
                    router.push(currentGame === "ALL" ? "/admin" : `/admin?game=${currentGame}`);
                  } else {
                    setGameMenuOpen(false);
                  }
                  setOpen(false);
                }}
                className={linkClass(link.href)}
              >
                {link.icon}
                <span className="flex-1">{link.label}</span>
                {isBoard && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${gameMenuOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Link>

              {isBoard && gameMenuOpen && (
                <div className="animate-fade-in-up mt-1 mb-1 ml-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
                  {GAME_OPTIONS.map((opt) => {
                      const locked = opt.value !== "ALL" && !allowedGames.includes(opt.value);
                      const selected = currentGame === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          disabled={locked}
                          onClick={() => handleGameSelect(opt.value)}
                          title={locked ? "You don't have access to this game" : undefined}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                            locked
                              ? "text-neutral-300 dark:text-neutral-700 cursor-not-allowed"
                              : selected
                              ? "bg-gold-600 text-white"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          {opt.label}
                          {locked && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                              <rect x="3" y="11" width="18" height="11" rx="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6M10 14 21 3" />
          </svg>
          View form
        </Link>
      </nav>

      <div className="px-3 py-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/profile"
            onClick={() => setOpen(false)}
            className={`flex-1 min-w-0 flex items-center gap-2.5 rounded-lg px-2 py-2 transition-all duration-150 ${
              isActive("/admin/profile")
                ? "bg-gold-600 text-white"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isActive("/admin/profile")
                  ? "bg-white/15 text-white"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {PROFILE_ICON}
            </div>
            <div className="min-w-0">
              <p
                className={`text-sm font-semibold truncate ${
                  isActive("/admin/profile") ? "text-white" : "text-neutral-900 dark:text-neutral-100"
                }`}
              >
                {currentAdmin.name}
              </p>
              <span
                className={`inline-block mt-0.5 text-[10px] font-semibold rounded-full border px-2 py-0.5 ${
                  isActive("/admin/profile")
                    ? "text-white border-white/40 bg-white/10"
                    : ROLE_BADGE[currentAdmin.role]
                }`}
              >
                {ROLE_LABEL[currentAdmin.role]}
              </span>
            </div>
          </Link>
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400 py-2 transition-all duration-150 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-700"
        >
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <span className="font-bold text-sm text-neutral-900 dark:text-white">Admin Panel</span>
        <ThemeToggle />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden sm:flex sm:flex-col sm:w-64 sm:shrink-0 sm:h-screen sm:sticky sm:top-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        {sidebarBody}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden">
          <div
            onClick={() => setOpen(false)}
            className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[1px] z-40"
          />
          <aside className="animate-slide-in-left fixed inset-y-0 left-0 w-64 max-w-[80vw] bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 shadow-2xl z-50">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              ✕
            </button>
            {sidebarBody}
          </aside>
        </div>
      )}
    </>
  );
}
