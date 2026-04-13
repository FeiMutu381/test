import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const stripeSessionId = searchParams.get("session_id");

  if (!stripeSessionId) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: {
      stripeSessionId,
      userId: (session.user as any).id,
    },
    include: { asset: true },
  });

  if (!order || order.status !== "paid") {
    return NextResponse.json({ order: null });
  }

  return NextResponse.json({ order });
}
