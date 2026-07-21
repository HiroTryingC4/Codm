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

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

export default async function AnalyticsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [total, statusGroups, all] = await Promise.all([
    prisma.applicant.count(),
    prisma.applicant.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.applicant.findMany({ select: { createdAt: true } }),
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

  const monthCounts = new Map<string, number>();
  for (const a of all) {
    const key = monthKey(a.createdAt);
    monthCounts.set(key, (monthCounts.get(key) || 0) + 1);
  }

  const monthlySeries: { key: string; count: number }[] = [];
  if (all.length > 0) {
    const sortedDates = all.map((a) => a.createdAt).sort((a, b) => a.getTime() - b.getTime());
    const cursor = new Date(sortedDates[0].getFullYear(), sortedDates[0].getMonth(), 1);
    const end = new Date(
      sortedDates[sortedDates.length - 1].getFullYear(),
      sortedDates[sortedDates.length - 1].getMonth(),
      1
    );
    while (cursor <= end) {
      const key = monthKey(cursor);
      monthlySeries.push({ key, count: monthCounts.get(key) || 0 });
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }
  const maxMonthCount = Math.max(1, ...monthlySeries.map((m) => m.count));

  return (
    <main className="min-h-screen">
      <div className="p-4 sm:p-6 max-w-4xl space-y-6">
        <div className="grid grid-cols-3 gap-3">
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

        <div className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-4">
            Applications per Month
          </p>
          {monthlySeries.length === 0 ? (
            <p className="text-sm text-neutral-400 dark:text-neutral-600 italic">No applications yet</p>
          ) : (
            <div className="flex items-end gap-3 h-40 overflow-x-auto">
              {monthlySeries.map(({ key, count }) => (
                <div key={key} className="flex flex-col items-center justify-end h-full min-w-[2.5rem] shrink-0">
                  <span className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">{count}</span>
                  <div
                    className="w-6 rounded-t bg-gold-600 dark:bg-gold-500 transition-all duration-500"
                    style={{ height: `${Math.max(4, (count / maxMonthCount) * 100)}%` }}
                  />
                  <span className="text-xs text-neutral-500 dark:text-neutral-600 mt-1.5 whitespace-nowrap">
                    {monthLabel(key)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
