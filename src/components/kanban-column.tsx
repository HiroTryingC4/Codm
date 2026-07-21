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
}: {
  title: string;
  status: ApplicantStatus;
  applicants: Applicant[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const colors = STATUS_COLORS[status];

  return (
    <div>
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
          />
        ))}
      </div>
    </div>
  );
}
