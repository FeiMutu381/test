import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AssetDetailClient } from "@/components/AssetDetailClient";

interface AssetDetailPageProps {
  params: { id: string };
}

async function getAsset(id: string) {
  return prisma.asset.findUnique({ where: { id } });
}

async function getUserOrder(userId: string, assetId: string) {
  return prisma.order.findFirst({
    where: { userId, assetId, status: "paid" },
  });
}

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const asset = await getAsset(params.id);
  if (!asset) notFound();

  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  let hasPurchased = false;
  if (userId && !asset.isOpenSource) {
    const order = await getUserOrder(userId, asset.id);
    hasPurchased = !!order;
  }

  const images: string[] = JSON.parse(asset.images);
  const tags: string[] = JSON.parse(asset.tags);

  return (
    <AssetDetailClient
      asset={{ ...asset, images, tags }}
      session={session}
      hasPurchased={hasPurchased}
    />
  );
}
