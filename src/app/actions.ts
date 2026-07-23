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
  const fbName = String(formData.get("fbName") || "").trim();
  const cityProvince = String(formData.get("cityProvince") || "").trim();
  const streamerMode = String(formData.get("streamerMode") || "").trim();
  const tryoutType = String(formData.get("tryoutType") || "");
  const mode = String(formData.get("mode") || "");
  const teamName = String(formData.get("teamName") || "").trim();
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

  if (!fbName || !cityProvince) {
    return { success: false, error: "FB name and City/Province are required." };
  }

  if (tryoutType !== "COMPETITIVE" && tryoutType !== "CASUAL") {
    return { success: false, error: "Please select a tryout type." };
  }

  if (!MODES_BY_GAME[game as GameType].includes(mode as Mode)) {
    return { success: false, error: "Please select a valid mode for the chosen game." };
  }

  const needsTeamName = mode === "TEAM" || mode === "SQUAD";
  if (needsTeamName && !teamName) {
    return { success: false, error: "Please enter your team name." };
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
      fbName,
      cityProvince,
      streamerMode: streamerMode || null,
      tryoutType: tryoutType as TryoutType,
      mode: mode as Mode,
      teamName: needsTeamName ? teamName : null,
      role: role || null,
      motivation,
      recruitedBy: recruitedBy || null,
      status: "PENDING",
    },
  });

  return { success: true };
}
