import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";
import type { AdminRole } from "@/types";

export async function POST(request: NextRequest) {
  const { name, password, rememberMe } = await request.json();

  if (typeof name !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const admin = await prisma.admin.findUnique({ where: { name } });

  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken({
    adminId: admin.id,
    name: admin.name,
    role: admin.role as AdminRole,
  });
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Omitting maxAge makes it a session cookie that clears when the browser closes.
    ...(rememberMe ? { maxAge: ADMIN_SESSION_MAX_AGE } : {}),
  });
  return response;
}
