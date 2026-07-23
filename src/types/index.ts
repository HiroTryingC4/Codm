export type GameType = "MP" | "BR";
export type TryoutType = "COMPETITIVE" | "CASUAL";
export type Mode = "SOLO" | "TEAM" | "DUO" | "SQUAD";
export type ApplicantStatus = "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";
// "ADMIN" is a legacy role kept for backward compatibility with accounts
// created before MP/BR-scoped roles existed — it behaves like HEAD for
// game access (sees both), just without account-creation rights. New
// accounts are only ever created as HEAD, MP_ADMIN, or BR_ADMIN.
export type AdminRole = "HEAD" | "ADMIN" | "MP_ADMIN" | "BR_ADMIN";

export interface AdminSummary {
  id: string;
  name: string;
  role: AdminRole;
  createdAt: string;
}

export interface CommentDTO {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface ApplicantSummary {
  id: string;
  game: GameType;
  inGameName: string;
  uid: string;
  tryoutType: TryoutType;
  mode: Mode;
  status: ApplicantStatus;
}

export interface ApplicantDetail extends ApplicantSummary {
  fbName: string;
  cityProvince: string;
  streamerMode: string | null;
  teamName: string | null;
  role: string | null;
  motivation: string;
  recruitedBy: string | null;
  createdAt: string;
  comments: CommentDTO[];
}
