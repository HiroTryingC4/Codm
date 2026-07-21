import type { ApplicantStatus } from "@/types";

export const STATUS_COLORS: Record<
  ApplicantStatus,
  { heading: string; dot: string; cardBorder: string }
> = {
  PENDING: {
    heading: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500 dark:bg-amber-400",
    cardBorder: "border-l-amber-500 dark:border-l-amber-400",
  },
  REVIEWED: {
    heading: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500 dark:bg-blue-400",
    cardBorder: "border-l-blue-500 dark:border-l-blue-400",
  },
  ACCEPTED: {
    heading: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    cardBorder: "border-l-emerald-500 dark:border-l-emerald-400",
  },
  REJECTED: {
    heading: "text-red-600 dark:text-red-400",
    dot: "bg-red-500 dark:bg-red-400",
    cardBorder: "border-l-red-500 dark:border-l-red-400",
  },
};
