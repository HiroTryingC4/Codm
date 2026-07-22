import type { AdminRole, GameType } from "@/types";

const ALL_GAMES: GameType[] = ["MP", "BR"];

export function getAllowedGames(role: AdminRole): GameType[] {
  if (role === "MP_ADMIN") return ["MP"];
  if (role === "BR_ADMIN") return ["BR"];
  return ALL_GAMES; // HEAD and legacy ADMIN see both games
}

export function canAccessGame(role: AdminRole, game: string): boolean {
  return getAllowedGames(role).includes(game as GameType);
}
