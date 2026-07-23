import type { Applicant } from "@prisma/client";
import type { ApplicantStatus } from "@/types";
import { STATUS_COLORS } from "@/lib/status-colors";

const TYPE_LABEL: Record<string, string> = {
  COMPETITIVE: "Competitive",
  CASUAL: "Casual",
};

const MODE_LABEL: Record<string, string> = {
  SOLO: "Solo",
  TEAM: "Team",
  DUO: "Duo",
  SQUAD: "Squad",
};

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
  const colors = STATUS_COLORS[applicant.status as ApplicantStatus];

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${animationDelayMs}ms` }}
      className={`animate-fade-in-up w-full text-left rounded-lg px-3 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 border-l-[3px] ${colors.cardBorder} transition-all duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
        highlighted ? "ring-2 ring-gold-500" : ""
      }`}
    >
      <div className="font-semibold text-neutral-900 dark:text-neutral-100">{applicant.inGameName}</div>
      <div className="text-sm text-neutral-500">
        {TYPE_LABEL[applicant.tryoutType]} - {MODE_LABEL[applicant.mode]}
      </div>
    </button>
  );
}
