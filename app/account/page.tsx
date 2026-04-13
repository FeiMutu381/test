import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AccountClient } from "@/components/AccountClient";

async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId, status: "paid" },
    include: { asset: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  const userId = (session.user as any).id;
  const orders = await getUserOrders(userId);

  // Also find free downloads (open-source assets): we track by orders too
  const freeOrders = orders.filter((o) => o.asset.isOpenSource);
  const paidOrders = orders.filter((o) => !o.asset.isOpenSource);

  return (
    <AccountClient
      user={session.user}
      orders={orders}
    />
  );
}
