import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import CreateAccountModal from "@/components/create-account-modal";
import RemoveAccountButton from "@/components/remove-account-button";

export const dynamic = "force-dynamic";

const ROLE_BADGE: Record<string, string> = {
  HEAD: "text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-500/10 border-gold-300 dark:border-gold-500/30",
  ADMIN: "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
  MP_ADMIN: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30",
  BR_ADMIN: "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/30",
};

const ROLE_LABEL: Record<string, string> = {
  HEAD: "HEAD",
  ADMIN: "ADMIN",
  MP_ADMIN: "MP ADMIN",
  BR_ADMIN: "BR ADMIN",
};

type AdminRow = {
  id: string;
  name: string;
  role: string;
  createdAt: Date;
};

function AccountList({
  admins,
  currentAdminId,
  canRemove,
}: {
  admins: AdminRow[];
  currentAdminId: string;
  canRemove: boolean;
}) {
  if (admins.length === 0) {
    return <p className="text-sm text-neutral-400 dark:text-neutral-700 italic">None yet</p>;
  }
  return (
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
              {admin.id === currentAdminId && (
                <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-600">(you)</span>
              )}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-0.5">
              Created {new Date(admin.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs font-semibold rounded-full border px-2.5 py-0.5 ${ROLE_BADGE[admin.role] || ROLE_BADGE.ADMIN}`}
            >
              {ROLE_LABEL[admin.role] || admin.role}
            </span>
            {canRemove && admin.id !== currentAdminId && (
              <RemoveAccountButton adminId={admin.id} adminName={admin.name} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function AccountsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const admins = await prisma.admin.findMany({
    select: { id: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const heads = admins.filter((a) => a.role === "HEAD");
  const regular = admins.filter((a) => a.role !== "HEAD");

  return (
    <main className="min-h-screen">
      <div className="p-4 sm:p-6 max-w-3xl space-y-4">
        {session.role === "HEAD" && (
          <div className="flex justify-end">
            <CreateAccountModal />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-2">
              Head Admins ({heads.length})
            </p>
            <AccountList
              admins={heads}
              currentAdminId={session.adminId}
              canRemove={session.role === "HEAD"}
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-2">
              Admins ({regular.length})
            </p>
            <AccountList
              admins={regular}
              currentAdminId={session.adminId}
              canRemove={session.role === "HEAD"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
