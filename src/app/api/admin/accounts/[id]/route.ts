import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "HEAD") {
    return NextResponse.json({ error: "Only the head admin can remove accounts" }, { status: 403 });
  }

  if (params.id === session.adminId) {
    return NextResponse.json({ error: "You can't remove your own account." }, { status: 400 });
  }

  const target = await prisma.admin.findUnique({ where: { id: params.id } });
  if (!target) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (target.role === "HEAD") {
    const headCount = await prisma.admin.count({ where: { role: "HEAD" } });
    if (headCount <= 1) {
      return NextResponse.json(
        { error: "Can't remove the only Head Admin." },
        { status: 400 }
      );
    }
  }

  const commentCount = await prisma.comment.count({ where: { adminId: params.id } });
  if (commentCount > 0) {
    return NextResponse.json(
      { error: "This admin has posted comments and can't be removed." },
      { status: 409 }
    );
  }

  await prisma.admin.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
