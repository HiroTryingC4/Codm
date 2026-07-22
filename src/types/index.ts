export type GameType = "MP" | "BR";
export type TryoutType = "COMPETITIVE" | "CASUAL";
export type Mode = "SOLO" | "TEAM" | "DUO" | "SQUAD";
export type ApplicantStatus = "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";
export type AdminRole = "HEAD" | "ADMIN";

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
  role: string | null;
  motivation: string;
  recruitedBy: string | null;
  createdAt: string;
  comments: CommentDTO[];
}
