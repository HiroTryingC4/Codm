import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, hashPassword, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();

  if (typeof currentPassword !== "string" || typeof newPassword !== "string" || newPassword.length < 8) {
    return NextResponse.json(
      { error: "Current password is required and new password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.findUnique({ where: { id: session.adminId } });
  if (!admin || !(await verifyPassword(currentPassword, admin.passwordHash))) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.admin.update({
    where: { id: session.adminId },
    data: { passwordHash },
  });

  return NextResponse.json({ success: true });
}
