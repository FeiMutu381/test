import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const assetId = searchParams.get("assetId");

  if (!assetId) {
    return NextResponse.json({ error: "Asset ID required" }, { status: 400 });
  }

  const asset = await prisma.asset.findUnique({ where: { id: assetId } });
  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  // Free/open-source: allow without auth
  if (asset.isOpenSource || asset.price === 0) {
    return NextResponse.json({ url: asset.downloadUrl });
  }

  // Paid: require auth + purchase
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const order = await prisma.order.findFirst({
    where: { userId, assetId, status: "paid" },
  });

  if (!order) {
    return NextResponse.json({ error: "Purchase required" }, { status: 403 });
  }

  return NextResponse.json({ url: asset.downloadUrl });
}
