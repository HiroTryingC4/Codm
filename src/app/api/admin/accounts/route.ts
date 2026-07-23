import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

const PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

function generatePassword(length = 12): string {
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += PASSWORD_CHARS[bytes[i] % PASSWORD_CHARS.length];
  }
  return out;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admins = await prisma.admin.findMany({
    select: { id: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ admins });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "HEAD") {
    return NextResponse.json({ error: "Only the head admin can create accounts" }, { status: 403 });
  }

  const { name, role } = await request.json();

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (role !== "ADMIN" && role !== "HEAD") {
    return NextResponse.json({ error: "Role must be ADMIN or HEAD." }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({ where: { name: name.trim() } });
  if (existing) {
    return NextResponse.json({ error: "An admin with that name already exists." }, { status: 409 });
  }

  const password = generatePassword();
  const passwordHash = await hashPassword(password);
  const admin = await prisma.admin.create({
    data: { name: name.trim(), passwordHash, role },
    select: { id: true, name: true, role: true, createdAt: true },
  });

  return NextResponse.json({ admin, password });
}
