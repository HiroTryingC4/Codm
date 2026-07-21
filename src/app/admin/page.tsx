import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import BoardClient from "./board-client";

export const dynamic = "force-dynamic";

export default async function AdminBoardPage() {
  const [pending, reviewed, accepted, rejected] = await Promise.all([
    prisma.applicant.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
    }),
    prisma.applicant.findMany({
      where: { status: "REVIEWED" },
      orderBy: { createdAt: "asc" },
    }),
    prisma.applicant.findMany({
      where: { status: "ACCEPTED" },
      orderBy: { createdAt: "asc" },
    }),
    prisma.applicant.findMany({
      where: { status: "REJECTED" },
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
      />
    </Suspense>
  );
}
