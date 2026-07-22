"use server";

import { prisma } from "@/lib/prisma";
import type { GameType, Mode, TryoutType } from "@/types";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

const MODES_BY_GAME: Record<GameType, Mode[]> = {
  MP: ["SOLO", "TEAM"],
  BR: ["SOLO", "DUO", "SQUAD"],
};

export async function submitTryoutApplication(
  formData: FormData
): Promise<SubmitResult> {
  const game = String(formData.get("game") || "");
  const inGameName = String(formData.get("inGameName") || "").trim();
  const uid = String(formData.get("uid") || "").trim();
  const tryoutType = String(formData.get("tryoutType") || "");
  const mode = String(formData.get("mode") || "");
  const role = String(formData.get("role") || "").trim();
  const motivation = String(formData.get("motivation") || "").trim();
  const recruitedBy = String(formData.get("recruitedBy") || "").trim();
  const rulesAgreed = formData.get("rulesAgreed") === "true";

  if (game !== "MP" && game !== "BR") {
    return { success: false, error: "Please select which game you're trying out for." };
  }

  if (!inGameName || !uid) {
    return { success: false, error: "In-game name and UID are required." };
  }

  if (!/^\d+$/.test(uid)) {
    return { success: false, error: "UID must contain numbers only." };
  }

  if (tryoutType !== "COMPETITIVE" && tryoutType !== "CASUAL") {
    return { success: false, error: "Please select a tryout type." };
  }

  if (!MODES_BY_GAME[game as GameType].includes(mode as Mode)) {
    return { success: false, error: "Please select a valid mode for the chosen game." };
  }

  if (!rulesAgreed) {
    return {
      success: false,
      error: "Please read and agree to the clan rules before submitting.",
    };
  }

  await prisma.applicant.create({
    data: {
      game: game as GameType,
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
