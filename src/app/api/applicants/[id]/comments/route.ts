import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
