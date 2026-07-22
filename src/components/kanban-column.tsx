import type { Applicant } from "@prisma/client";
import type { ApplicantStatus } from "@/types";
import { STATUS_COLORS } from "@/lib/status-colors";
import ApplicantCard from "./applicant-card";

export default function KanbanColumn({
  title,
  status,
  applicants,
  selectedId,
  onSelect,
  showGameBadge = true,
}: {
  title: string;
  status: ApplicantStatus;
  applicants: Applicant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showGameBadge?: boolean;
}) {
  const colors = STATUS_COLORS[status];

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm shadow-lg shadow-neutral-300/30 dark:shadow-black/30 p-4 transition-colors">
      <h2 className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase mb-3">
        <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
        <span className={colors.heading}>{title}</span>
        <span className="text-neutral-400 dark:text-neutral-700">({applicants.length})</span>
      </h2>
      <div className="space-y-2">
        {applicants.length === 0 && (
          <p className="text-sm text-neutral-400 dark:text-neutral-700 italic">No applicants</p>
        )}
        {applicants.map((applicant, i) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            highlighted={applicant.id === selectedId}
            onClick={() => onSelect(applicant.id)}
            animationDelayMs={i * 50}
            showGameBadge={showGameBadge}
          />
        ))}
      </div>
    </div>
  );
}
