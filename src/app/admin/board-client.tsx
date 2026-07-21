"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Applicant } from "@prisma/client";
import type { AdminRole } from "@/types";
import KanbanColumn from "@/components/kanban-column";
import ApplicantDetailSheet from "@/components/applicant-detail-sheet";
import LogoutButton from "@/components/logout-button";
import ThemeToggle from "@/components/theme-toggle";

export default function BoardClient({
  pending,
  reviewed,
  accepted,
  rejected,
  currentAdmin,
}: {
  pending: Applicant[];
  reviewed: Applicant[];
  accepted: Applicant[];
  rejected: Applicant[];
  currentAdmin: { name: string; role: AdminRole };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("applicant");
  const [showRejected, setShowRejected] = useState(false);

  function selectApplicant(id: string) {
    router.push(`/admin?applicant=${id}`);
  }

  function closeDetail() {
    router.push("/admin");
  }

  function refreshBoard() {
    router.refresh();
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/admin-cover.jpg')" }}
      />
      <div className="fixed inset-0 bg-white/90 dark:bg-neutral-950/90 transition-colors duration-300" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.1),_transparent_60%)]" />

      <header className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm">
        <div>
          <p className="text-xs font-semibold tracking-widest text-orange-600 dark:text-orange-500 uppercase">
            Board
          </p>
          <h1 className="font-bold text-neutral-900 dark:text-white">Admin — Applicants</h1>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-600">
            Signed in as <span className="text-neutral-800 dark:text-neutral-300">{currentAdmin.name}</span>
          </span>
          <Link
            href="/admin/accounts"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all duration-150 hover:-translate-y-0.5 inline-block"
          >
            Accounts
          </Link>
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all duration-150 hover:-translate-y-0.5 inline-block"
          >
            View form
          </Link>
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>

      <main className="relative p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <KanbanColumn
            title="Pending"
            status="PENDING"
            applicants={pending}
            selectedId={selectedId}
            onSelect={selectApplicant}
          />
          <KanbanColumn
            title="Reviewed"
            status="REVIEWED"
            applicants={reviewed}
            selectedId={selectedId}
            onSelect={selectApplicant}
          />
          <KanbanColumn
            title="Accepted"
            status="ACCEPTED"
            applicants={accepted}
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
              {showRejected ? "Hide" : "Show"} Rejected ({rejected.length})
            </button>
            {showRejected && (
              <div className="animate-fade-in-up mt-3 max-w-xs">
                <KanbanColumn
                  title="Rejected"
                  status="REJECTED"
                  applicants={rejected}
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
