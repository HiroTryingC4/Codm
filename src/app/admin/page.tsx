import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getAllowedGames } from "@/lib/access";
import BoardClient from "./board-client";

export const dynamic = "force-dynamic";

export default async function AdminBoardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const allowedGames = getAllowedGames(session.role);

  const [pending, reviewed, accepted, rejected] = await Promise.all([
    prisma.applicant.findMany({
      where: { status: "PENDING", game: { in: allowedGames } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.applicant.findMany({
      where: { status: "REVIEWED", game: { in: allowedGames } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.applicant.findMany({
      where: { status: "ACCEPTED", game: { in: allowedGames } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.applicant.findMany({
      where: { status: "REJECTED", game: { in: allowedGames } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return (
    <Suspense>
      <BoardClient
        pending={pending}
        reviewed={reviewed}
        accepted={accepted}
        rejected={rejected}
        allowedGames={allowedGames}
      />
    </Suspense>
  );
}
