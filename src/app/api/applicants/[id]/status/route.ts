import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "REVIEWED", "ACCEPTED", "REJECTED"];

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await request.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const applicant = await prisma.applicant.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ applicant });
}
