import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import ChangePasswordForm from "@/components/change-password-form";

export const dynamic = "force-dynamic";

const ROLE_LABEL: Record<string, string> = {
  HEAD: "Head Admin",
  ADMIN: "Admin",
};

const ROLE_BADGE: Record<string, string> = {
  HEAD: "text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-500/10 border-gold-300 dark:border-gold-500/30",
  ADMIN: "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const comments = await prisma.comment.findMany({
    where: { adminId: session.adminId },
    include: { applicant: { select: { inGameName: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/admin-cover.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/90 transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.1),_transparent_60%)]" />

      <main className="relative p-4 sm:p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="animate-fade-in-up flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">{session.name}</p>
                <span
                  className={`inline-block mt-1 text-xs font-semibold rounded-full border px-2.5 py-0.5 ${
                    ROLE_BADGE[session.role] || ROLE_BADGE.ADMIN
                  }`}
                >
                  {ROLE_LABEL[session.role] || session.role}
                </span>
              </div>
            </div>

            <div style={{ animationDelay: "60ms" }} className="animate-fade-in-up">
              <ChangePasswordForm />
            </div>
          </div>

          <div
            style={{ animationDelay: "120ms" }}
            className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-3">
              My Comment History ({comments.length})
            </p>
            {comments.length === 0 ? (
              <p className="text-sm text-neutral-400 dark:text-neutral-700 italic">
                You haven't posted any comments yet.
              </p>
            ) : (
              <div className="space-y-2 max-h-[32rem] overflow-y-auto">
                {comments.map((comment, i) => (
                  <div
                    key={comment.id}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-2.5"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {comment.applicant.inGameName}
                        </span>
                      </div>
                      <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-600">
                        {new Date(comment.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap break-words">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
