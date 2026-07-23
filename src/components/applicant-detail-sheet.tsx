"use client";

import { useEffect, useState } from "react";
import type { ApplicantDetail } from "@/types";

export default function ApplicantDetailSheet({
  applicantId,
  onClose,
}: {
  applicantId: string;
  onClose: () => void;
}) {
  const [applicant, setApplicant] = useState<ApplicantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/applicants/${applicantId}`);
      const data = await res.json();
      setApplicant(data.applicant);
      setLoading(false);
    }
    load();
  }, [applicantId]);

  return (
    <>
      <div
        onClick={onClose}
        className="animate-fade-in fixed inset-0 bg-black/60 backdrop-blur-[1px] z-40"
      />
      <div className="animate-slide-in-right fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col z-50">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            Member Detail
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
              <p className="mt-1 text-xs text-neutral-500">
                Joined {new Date(applicant.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setDetailsOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-neutral-500 uppercase tracking-wide bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                Players Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-4 h-4 transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {detailsOpen && (
                <div className="animate-fade-in-up px-3 py-3 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-0.5">In-game name</p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 break-words">{applicant.inGameName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-0.5">UID</p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 break-words">{applicant.uid}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-0.5">FB name</p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 break-words">
                        {applicant.fbName || <span className="text-neutral-400 dark:text-neutral-600">Not specified</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-0.5">GCash Number</p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 break-words">
                        {applicant.gcashNumber || <span className="text-neutral-400 dark:text-neutral-600">Not specified</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-0.5">City / Province</p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 break-words">
                        {applicant.cityProvince || <span className="text-neutral-400 dark:text-neutral-600">Not specified</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-0.5">Streamer Mode</p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 break-words">
                        {applicant.streamerMode || <span className="text-neutral-400 dark:text-neutral-600">Not provided</span>}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-neutral-500 dark:text-neutral-600 mb-0.5">Date joined</p>
                      <p className="text-sm text-neutral-900 dark:text-neutral-100 break-words">
                        {new Date(applicant.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        <span className="text-neutral-500 dark:text-neutral-600">
                          at {new Date(applicant.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
