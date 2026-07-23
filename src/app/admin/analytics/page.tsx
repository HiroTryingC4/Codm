import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

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

  const all = await prisma.applicant.findMany({
    select: { createdAt: true },
  });

  const total = all.length;

  const monthCounts = new Map<string, number>();
  for (const a of all) {
    const key = monthKey(a.createdAt);
    monthCounts.set(key, (monthCounts.get(key) || 0) + 1);
  }

  const currentMonthKey = monthKey(new Date());
  const newThisMonth = monthCounts.get(currentMonthKey) || 0;

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
      <div className="p-4 sm:p-6 max-w-6xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-1">
              Total Members
            </p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white">{total}</p>
          </div>
          <div
            style={{ animationDelay: "60ms" }}
            className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-1">
              New This Month
            </p>
            <p className="text-2xl font-bold text-gold-600 dark:text-gold-500">{newThisMonth}</p>
          </div>
        </div>

        <div className="animate-fade-in-up rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-600 uppercase tracking-wide mb-4">
            New Members per Month
          </p>
          {monthlySeries.length === 0 ? (
            <p className="text-sm text-neutral-400 dark:text-neutral-600 italic">No members yet</p>
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
