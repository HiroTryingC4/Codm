"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Applicant } from "@prisma/client";
import KanbanColumn from "@/components/kanban-column";
import ApplicantDetailSheet from "@/components/applicant-detail-sheet";

export default function BoardClient({
  pending,
  reviewed,
  accepted,
  rejected,
}: {
  pending: Applicant[];
  reviewed: Applicant[];
  accepted: Applicant[];
  rejected: Applicant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("applicant");
  const [showRejected, setShowRejected] = useState(false);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const matches = (a: Applicant) => a.inGameName.toLowerCase().includes(query);
  const filteredPending = query ? pending.filter(matches) : pending;
  const filteredReviewed = query ? reviewed.filter(matches) : reviewed;
  const filteredAccepted = query ? accepted.filter(matches) : accepted;
  const filteredRejected = query ? rejected.filter(matches) : rejected;

  function selectApplicant(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("applicant", id);
    router.push(`/admin?${params.toString()}`);
  }

  function closeDetail() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("applicant");
    const qs = params.toString();
    router.push(qs ? `/admin?${qs}` : "/admin");
  }

  function refreshBoard() {
    router.refresh();
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/admin-cover.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/90 transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.1),_transparent_60%)]" />

      <main className="relative p-4 sm:p-6">
        <div className="max-w-5xl mx-auto mb-6">
          <div className="relative max-w-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-600"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by IGN..."
              className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <KanbanColumn
            title="Pending"
            status="PENDING"
            applicants={filteredPending}
            selectedId={selectedId}
            onSelect={selectApplicant}
          />
          <KanbanColumn
            title="Reviewed"
            status="REVIEWED"
            applicants={filteredReviewed}
            selectedId={selectedId}
            onSelect={selectApplicant}
          />
          <KanbanColumn
            title="Accepted"
            status="ACCEPTED"
            applicants={filteredAccepted}
            selectedId={selectedId}
            onSelect={selectApplicant}
          />
        </div>

        {rejected.length > 0 && (
          <div className="mt-8 max-w-5xl mx-auto">
            <button
              onClick={() => setShowRejected((v) => !v)}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
            >
              {showRejected ? "Hide" : "Show"} Rejected ({filteredRejected.length})
            </button>
            {showRejected && (
              <div className="animate-fade-in-up mt-3 max-w-xs">
                <KanbanColumn
                  title="Rejected"
                  status="REJECTED"
                  applicants={filteredRejected}
                  selectedId={selectedId}
                  onSelect={selectApplicant}
                />
              </div>
            )}
          </div>
        )}

        {selectedId && (
          <ApplicantDetailSheet
            applicantId={selectedId}
            onClose={closeDetail}
            onStatusChanged={refreshBoard}
          />
        )}
      </main>
    </div>
  );
}
