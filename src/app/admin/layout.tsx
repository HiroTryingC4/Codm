import { Suspense } from "react";
import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin-sidebar";

export const metadata: Metadata = {
  title: "LG Admin",
  manifest: "/admin-manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "LG Admin",
    statusBarStyle: "black-translucent",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // No session means this is /admin/login (middleware already gates every
  // other /admin/* route) — render it standalone, with no sidebar chrome.
  if (!session) {
    return <div className="min-h-screen bg-white dark:bg-neutral-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 sm:flex">
      <Suspense fallback={null}>
        <AdminSidebar currentAdmin={{ name: session.name, role: session.role }} />
      </Suspense>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
