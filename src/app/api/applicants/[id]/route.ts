import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id: params.id },
    include: {
      comments: {
        include: { admin: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { comments, ...rest } = applicant;

  return NextResponse.json({
    applicant: {
      ...rest,
      comments: comments.map((c) => ({
        id: c.id,
        text: c.text,
        createdAt: c.createdAt,
        authorName: c.admin.name,
      })),
    },
  });
}
