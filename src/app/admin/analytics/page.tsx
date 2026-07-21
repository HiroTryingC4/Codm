import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const STATUS_LIST = ["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"] as const;

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

const STATUS_DOT: Record<string, string> = {
  PENDING: "bg-amber-500",
  REVIEWED: "bg-blue-500",
  ACCEPTED: "bg-emerald-500",
  REJECTED: "bg-red-500",
};

function formatDuration(ms: number) {
  const hours = ms / (1000 * 60 * 60);
  if (hours < 24) return `${hours.toFixed(1)} hrs`;
  return `${(hours / 24).toFixed(1)} days`;
}

export default async function AnalyticsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [total, statusGroups, decided] = await Promise.all([
    prisma.applicant.count(),
    prisma.applicant.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.applicant.findMany({
      where: { status: { in: ["ACCEPTED", "REJECTED"] } },
      select: { status: true, createdAt: true, updatedAt: true },
    }),
  ]);

  const statusCounts: Record<string, number> = Object.fromEntries(
    STATUS_LIST.map((s) => [s, 0])
  );
  for (const g of statusGroups) {
    statusCounts[g.status] = g._count.status;
  }

  const acceptedCount = statusCounts.ACCEPTED;
  const rejectedCount = statusCounts.REJECTED;
  const decidedCount = acceptedCount + rejectedCount;
  const acceptanceRate = decidedCount > 0 ? (acceptedCount / decidedCount) * 100 : null;
  const rejectionRate = decidedCount > 0 ? (rejectedCount / decidedCount) * 100 : null;

  const avgDecisionMs =
    decided.length > 0
      ? decided.reduce((sum, a) => sum + (a.updatedAt.getTime() - a.createdAt.getTime()), 0) /
        decided.length
      : null;

  return (
    <main className="min-h-screen">
      <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <p className="text-xs font-semibold tracking-widest text-gold-700 dark:text-gold-500 uppercase">
          Analytics
        </p>
        <h1 className="font-bold text-neutral-900 dark:text-white">Tryout Analytics</h1>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-1">
              Total Applications
            </p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{total}</p>
          </div>
          <div
            style={{ animationDelay: "60ms" }}
            className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-1">
              Acceptance Rate
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {acceptanceRate === null ? "—" : `${acceptanceRate.toFixed(0)}%`}
            </p>
          </div>
          <div
            style={{ animationDelay: "120ms" }}
            className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-1">
              Not Accepted
            </p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {rejectionRate === null ? "—" : `${rejectionRate.toFixed(0)}%`}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-0.5">
              {rejectedCount} rejected
            </p>
          </div>
          <div
            style={{ animationDelay: "180ms" }}
            className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-1">
              Avg. Time to Decision
            </p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
              {avgDecisionMs === null ? "—" : formatDuration(avgDecisionMs)}
            </p>
          </div>
        </div>

        <div className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-3">
            Breakdown by Status
          </p>
          <div className="space-y-2.5">
            {STATUS_LIST.map((status) => {
              const count = statusCounts[status];
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
                      {STATUS_LABEL[status]}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-600">
                      {count} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${STATUS_DOT[status]} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
