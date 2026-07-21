import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import CreateAccountForm from "@/components/create-account-form";

export const dynamic = "force-dynamic";

const ROLE_BADGE: Record<string, string> = {
  HEAD: "text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-500/10 border-gold-300 dark:border-gold-500/30",
  ADMIN: "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
};

export default async function AccountsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const admins = await prisma.admin.findMany({
    select: { id: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main className="min-h-screen">
      <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <p className="text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase">
          Accounts
        </p>
        <h1 className="font-bold text-neutral-900 dark:text-white">Admin Accounts</h1>
      </div>

      <div className="p-4 sm:p-6 max-w-lg space-y-6">
        <div className="space-y-2">
          {admins.map((admin, i) => (
            <div
              key={admin.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fade-in-up flex flex-wrap items-center justify-between gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              <div className="min-w-0">
                <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {admin.name}
                  {admin.id === session.adminId && (
                    <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-600">(you)</span>
                  )}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-0.5">
                  Created {new Date(admin.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`shrink-0 text-xs font-semibold rounded-full border px-2.5 py-0.5 ${ROLE_BADGE[admin.role]}`}
              >
                {admin.role}
              </span>
            </div>
          ))}
        </div>

        {session.role === "HEAD" && <CreateAccountForm />}
      </div>
    </main>
  );
}
