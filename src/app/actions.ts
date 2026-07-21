"use server";

import { prisma } from "@/lib/prisma";
import type { Mode, TryoutType } from "@/types";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitTryoutApplication(
  formData: FormData
): Promise<SubmitResult> {
  const inGameName = String(formData.get("inGameName") || "").trim();
  const uid = String(formData.get("uid") || "").trim();
  const tryoutType = String(formData.get("tryoutType") || "");
  const mode = String(formData.get("mode") || "");
  const role = String(formData.get("role") || "").trim();
  const motivation = String(formData.get("motivation") || "").trim();
  const recruitedBy = String(formData.get("recruitedBy") || "").trim();
  const rulesAgreed = formData.get("rulesAgreed") === "true";

  if (!inGameName || !uid) {
    return { success: false, error: "In-game name and UID are required." };
  }

  if (!/^\d+$/.test(uid)) {
    return { success: false, error: "UID must contain numbers only." };
  }

  if (tryoutType !== "COMPETITIVE" && tryoutType !== "CASUAL") {
    return { success: false, error: "Please select a tryout type." };
  }

  if (mode !== "SOLO" && mode !== "TEAM") {
    return { success: false, error: "Please select solo or team." };
  }

  if (!rulesAgreed) {
    return {
      success: false,
      error: "Please read and agree to the clan rules before submitting.",
    };
  }

  await prisma.applicant.create({
    data: {
      inGameName,
      uid,
      tryoutType: tryoutType as TryoutType,
      mode: mode as Mode,
      role: role || null,
      motivation,
      recruitedBy: recruitedBy || null,
      status: "PENDING",
    },
  });

  return { success: true };
}
