import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ChangePasswordForm from "@/components/change-password-form";

export const dynamic = "force-dynamic";

const ROLE_LABEL: Record<string, string> = {
  HEAD: "Head Admin",
  ADMIN: "Admin",
  MP_ADMIN: "MP Admin",
  BR_ADMIN: "BR Admin",
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <main className="min-h-screen">
      <div className="p-4 sm:p-6 max-w-3xl space-y-6">
        <div className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 max-w-sm">
          <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-1">
            Signed in as
          </p>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{session.name}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-600">
            {ROLE_LABEL[session.role] || session.role}
          </p>
        </div>

        <ChangePasswordForm />
      </div>
    </main>
  );
}
