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

const GAME_BADGE: Record<string, string> = {
  MP: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30",
  BR: "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-300 dark:border-purple-500/30",
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
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100">{applicant.inGameName}</span>
        <span
          className={`shrink-0 text-[10px] font-semibold rounded-full border px-1.5 py-0.5 ${GAME_BADGE[applicant.game] || GAME_BADGE.MP}`}
        >
          {applicant.game}
        </span>
      </div>
      <div className="text-sm text-neutral-500">
        {TYPE_LABEL[applicant.tryoutType]} - {MODE_LABEL[applicant.mode]}
      </div>
    </button>
  );
}
