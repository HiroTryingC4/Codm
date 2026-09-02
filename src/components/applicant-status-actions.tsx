"use client";

import { useState } from "react";
import type { ApplicantStatus } from "@/types";

export const STATUS_BADGE: Record<ApplicantStatus, string> = {
  PENDING:
    "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
  REVIEWED:
    "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-300 dark:border-blue-500/30",
  ACCEPTED:
    "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-300 dark:border-green-500/30",
  REJECTED:
    "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/30",
};

export const STATUS_LABEL: Record<ApplicantStatus, string> = {
  PENDING: "Pending",
  REVIEWED: "Reviewed",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export default function ApplicantStatusActions({
  applicantId,
  status,
  onChanged,
}: {
  applicantId: string;
  status: ApplicantStatus;
  onChanged: (status: ApplicantStatus) => void;
}) {
  const [submitting, setSubmitting] = useState<ApplicantStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(next: ApplicantStatus) {
    setSubmitting(next);
    setError(null);

    const res = await fetch(`/api/applicants/${applicantId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    setSubmitting(null);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not update status.");
      return;
    }

    onChanged(next);
  }

  return (
    <div className="space-y-2">
      <span
        className={`inline-block text-xs font-semibold rounded-full border px-2.5 py-1 ${STATUS_BADGE[status]}`}
      >
        {STATUS_LABEL[status]}
      </span>

      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => updateStatus("ACCEPTED")}
          disabled={submitting !== null || status === "ACCEPTED"}
          className="flex-1 rounded-lg bg-green-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-green-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting === "ACCEPTED" ? "Accepting..." : "Accept"}
        </button>
        <button
          type="button"
          onClick={() => updateStatus("REJECTED")}
          disabled={submitting !== null || status === "REJECTED"}
          className="flex-1 rounded-lg bg-red-600 text-white py-2 text-sm font-semibold transition-all duration-150 hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting === "REJECTED" ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
}
