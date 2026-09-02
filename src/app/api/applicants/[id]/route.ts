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
  });

  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ applicant });
}

const VALID_STATUSES = ["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await request.json();
  if (typeof status !== "string" || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id: params.id },
  });
  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.applicant.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ applicant: updated });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id: params.id },
  });
  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.applicant.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}
