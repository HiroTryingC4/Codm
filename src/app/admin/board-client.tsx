"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Applicant } from "@prisma/client";
import ApplicantCard from "@/components/applicant-card";
import ApplicantDetailSheet from "@/components/applicant-detail-sheet";

export default function BoardClient({ applicants }: { applicants: Applicant[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("applicant");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = query
    ? applicants.filter(
        (a) =>
          a.inGameName.toLowerCase().includes(query) ||
          a.fbName.toLowerCase().includes(query) ||
          a.gcashNumber.toLowerCase().includes(query)
      )
    : applicants;

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

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/admin-cover.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/90 dark:bg-neutral-950/90 transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(234,88,12,0.1),_transparent_60%)]" />

      <main className="relative p-4 sm:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="relative max-w-sm">
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
              placeholder="Search by IGN, name, or number..."
              className="w-full rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 pl-9 pr-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none transition-colors focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            />
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm shadow-lg shadow-neutral-300/30 dark:shadow-black/30 p-4 transition-colors">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-3">
              Members ({filtered.length})
            </h2>
            {filtered.length === 0 ? (
              <p className="text-sm text-neutral-400 dark:text-neutral-700 italic">No members found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((applicant, i) => (
                  <ApplicantCard
                    key={applicant.id}
                    applicant={applicant}
                    highlighted={applicant.id === selectedId}
                    onClick={() => selectApplicant(applicant.id)}
                    animationDelayMs={i * 30}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedId && (
          <ApplicantDetailSheet applicantId={selectedId} onClose={closeDetail} />
        )}
      </main>
    </div>
  );
}
