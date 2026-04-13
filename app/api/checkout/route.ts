import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { assetId } = await req.json();
    if (!assetId) {
      return NextResponse.json({ error: "Asset ID required" }, { status: 400 });
    }

    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }
    if (asset.isOpenSource || asset.price === 0) {
      return NextResponse.json({ error: "Asset is free" }, { status: 400 });
    }

    const userId = (session.user as any).id;

    // Check if already purchased
    const existingOrder = await prisma.order.findFirst({
      where: { userId, assetId, status: "paid" },
    });
    if (existingOrder) {
      return NextResponse.json({ error: "Already purchased" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: asset.name,
              description: `${asset.size} · ${asset.format}`,
              images: [asset.thumbnailUrl],
            },
            unit_amount: Math.round(asset.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/assets/${assetId}`,
      metadata: {
        userId,
        assetId,
      },
    });

    // Create pending order
    await prisma.order.create({
      data: {
        userId,
        assetId,
        amount: asset.price,
        currency: "usd",
        status: "pending",
        stripeSessionId: stripeSession.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
