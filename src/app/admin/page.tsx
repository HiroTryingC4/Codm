import { Suspense } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import BoardClient from "./board-client";

export const dynamic = "force-dynamic";

export default async function AdminBoardPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const applicants = await prisma.applicant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Suspense>
      <BoardClient applicants={applicants} />
    </Suspense>
  );
}
