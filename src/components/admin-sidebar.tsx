"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { AdminRole } from "@/types";
import ThemeToggle from "./theme-toggle";

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

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function AdminSidebar({
  currentAdmin,
}: {
  currentAdmin: { name: string; role: AdminRole };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
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
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={linkClass(link.href)}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
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
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-600 text-white text-xs font-semibold">
            {getInitials(currentAdmin.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
              {currentAdmin.name}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide">
              {currentAdmin.role === "HEAD" ? "Head Admin" : "Admin"}
            </p>
          </div>
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
