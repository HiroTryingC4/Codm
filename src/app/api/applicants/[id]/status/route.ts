import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { canAccessGame } from "@/lib/access";

const VALID_STATUSES = ["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"];

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const existing = await prisma.applicant.findUnique({
    where: { id: params.id },
    select: { game: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!canAccessGame(session.role, existing.game)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const applicant = await prisma.applicant.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ applicant });
}
