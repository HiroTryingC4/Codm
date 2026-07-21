"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm rounded-lg border border-neutral-300 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 px-3 py-1.5 transition-all duration-150 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-700 hover:scale-105 active:scale-95"
    >
      Log out
    </button>
  );
}
