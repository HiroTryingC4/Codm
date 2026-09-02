import type { Applicant } from "@prisma/client";
import type { ApplicantStatus } from "@/types";
import { STATUS_BADGE, STATUS_LABEL } from "@/components/applicant-status-actions";

export default function ApplicantCard({
  applicant,
  onClick,
  highlighted,
  animationDelayMs = 0,
}: {
  applicant: Applicant;
  onClick: () => void;
  highlighted?: boolean;
  animationDelayMs?: number;
}) {
  const status: ApplicantStatus =
    applicant.status in STATUS_LABEL ? (applicant.status as ApplicantStatus) : "PENDING";

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${animationDelayMs}ms` }}
      className={`animate-fade-in-up w-full text-left rounded-lg px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
        highlighted ? "ring-2 ring-gold-500" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
          {applicant.fbName || applicant.inGameName}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="rounded-full bg-gold-100 dark:bg-gold-500/10 text-gold-700 dark:text-gold-500 text-[10px] font-semibold tracking-wide px-2 py-0.5">
            {applicant.game}
          </span>
          <span className={`rounded-full border text-[10px] font-semibold tracking-wide px-2 py-0.5 ${STATUS_BADGE[status]}`}>
            {STATUS_LABEL[status]}
          </span>
        </div>
      </div>
      <div className="text-sm text-neutral-500 truncate">IGN: {applicant.inGameName}</div>
      {applicant.gcashNumber && (
        <div className="text-sm text-neutral-500 truncate">Number: {applicant.gcashNumber}</div>
      )}
      <div className="text-xs text-neutral-400 dark:text-neutral-600 truncate mt-0.5">
        Joined {new Date(applicant.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
      </div>
    </button>
  );
}
