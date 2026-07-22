import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { canAccessGame } from "@/lib/access";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id: params.id },
    select: { game: true },
  });
  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!canAccessGame(session.role, applicant.game)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { text } = await request.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "Comment text is required." }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      applicantId: params.id,
      adminId: session.adminId,
      text: text.trim(),
    },
  });

  return NextResponse.json({
    comment: {
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      authorName: session.name,
    },
  });
}
