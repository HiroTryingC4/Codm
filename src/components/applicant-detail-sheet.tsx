"use client";

import { useEffect, useState } from "react";
import type { ApplicantDetail } from "@/types";
import CommentList from "./comment-list";

const TYPE_LABEL: Record<string, string> = {
  COMPETITIVE: "Competitive",
  CASUAL: "Casual",
};

const MODE_LABEL: Record<string, string> = {
  SOLO: "Solo",
  TEAM: "Team",
};

export default function ApplicantDetailSheet({
  applicantId,
  onClose,
  onStatusChanged,
}: {
  applicantId: string;
  onClose: () => void;
  onStatusChanged: () => void;
}) {
  const [applicant, setApplicant] = useState<ApplicantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/applicants/${applicantId}`);
    const data = await res.json();
    setApplicant(data.applicant);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicantId]);

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setPosting(true);
    await fetch(`/api/applicants/${applicantId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: commentText }),
    });
    setCommentText("");
    setPosting(false);
    await load();
  }

  async function handleStatus(status: string) {
    await fetch(`/api/applicants/${applicantId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    onStatusChanged();
    onClose();
  }

  return (
    <>
      <div
        onClick={onClose}
        className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[1px] z-40"
      />
      <div className="animate-slide-in-right fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col z-50">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            Applicant Detail
          </span>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:rotate-90 transition-all duration-200 rounded p-1"
          >
            ✕
          </button>
        </div>

        {loading || !applicant ? (
          <div className="p-4 text-sm text-neutral-500 dark:text-neutral-600">Loading...</div>
        ) : (
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">{applicant.inGameName}</h2>
              <span className="inline-block mt-1.5 text-xs border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-full px-2.5 py-0.5">
                {TYPE_LABEL[applicant.tryoutType]} - {MODE_LABEL[applicant.mode]}
              </span>
              <p className="mt-2 text-xs text-neutral-500">
                Applied {new Date(applicant.createdAt).toLocaleString()}
                {applicant.recruitedBy && (
                  <>
                    {" "}
                    · Recruited by{" "}
                    <span className="text-neutral-700 dark:text-neutral-300">{applicant.recruitedBy}</span>
                  </>
                )}
              </p>
            </div>

            <CommentList comments={applicant.comments} />

            <form onSubmit={handleAddComment} className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                Add comment (admin only)
              </label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder="Comment"
                className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={posting}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-800 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 transition-all duration-150 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              >
                {posting ? "Posting..." : "Post comment"}
              </button>
            </form>

            {applicant.status === "PENDING" && (
              <button
                onClick={() => handleStatus("REVIEWED")}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-800 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 transition-all duration-150 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-[1.02] active:scale-[0.98]"
              >
                Mark Reviewed
              </button>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleStatus("ACCEPTED")}
                className="flex-1 rounded-lg bg-orange-600 text-white py-2 font-medium transition-all duration-150 hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98]"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatus("REJECTED")}
                className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-800 py-2 font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-150 hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-[1.02] active:scale-[0.98]"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
