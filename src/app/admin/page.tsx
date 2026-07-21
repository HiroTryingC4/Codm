import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import BoardClient from "./board-client";

export const dynamic = "force-dynamic";

export default async function AdminBoardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

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
        currentAdmin={{ name: session.name, role: session.role }}
      />
    </Suspense>
  );
}
