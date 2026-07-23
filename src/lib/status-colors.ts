import type { ApplicantStatus } from "@/types";

export const STATUS_COLORS: Record<
  ApplicantStatus,
  { heading: string; dot: string; cardBorder: string; badge: string }
> = {
  PENDING: {
    heading: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500 dark:bg-amber-400",
    cardBorder: "border-l-amber-500 dark:border-l-amber-400",
    badge: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30",
  },
  REVIEWED: {
    heading: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500 dark:bg-blue-400",
    cardBorder: "border-l-blue-500 dark:border-l-blue-400",
    badge: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30",
  },
  ACCEPTED: {
    heading: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    cardBorder: "border-l-emerald-500 dark:border-l-emerald-400",
    badge: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30",
  },
  REJECTED: {
    heading: "text-red-600 dark:text-red-400",
    dot: "bg-red-500 dark:bg-red-400",
    cardBorder: "border-l-red-500 dark:border-l-red-400",
    badge: "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/30",
  },
};
