"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  User,
  Package,
  Download,
  LogOut,
  HardDrive,
  Clock,
  ExternalLink,
} from "lucide-react";

type Order = {
  id: string;
  amount: number;
  status: string;
  createdAt: Date;
  asset: {
    id: string;
    name: string;
    size: string;
    format: string;
    thumbnailUrl: string;
    isOpenSource: boolean;
    category: string;
  };
};

interface Props {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  orders: Order[];
}

export function AccountClient({ user, orders }: Props) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (assetId: string) => {
    setDownloading(assetId);
    try {
      const res = await fetch(`/api/download?assetId=${assetId}`);
      const data = await res.json();
      if (data.url) window.open(data.url, "_blank");
      else alert(data.error || "Download unavailable");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            {user.image ? (
              <Image
                src={user.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full border-3 border-white/20 shadow"
              />
            ) : (
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{user.name || "Account"}</h1>
              <p className="text-slate-300 text-sm">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm">
                <Package className="w-4 h-4" />
                Purchase History
              </button>
              <Link
                href="/assets"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Browse Assets
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-medium text-sm mt-4"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Purchase History
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({orders.length} item{orders.length !== 1 ? "s" : ""})
                </span>
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No purchases yet
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Your purchased and downloaded assets will appear here
                </p>
                <Link href="/assets" className="btn-primary text-sm py-2 px-5">
                  Browse Assets
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={order.asset.thumbnailUrl}
                        alt={order.asset.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/assets/${order.asset.id}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-sm leading-snug block truncate"
                      >
                        {order.asset.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {order.asset.size}
                        </span>
                        <span>{order.asset.format.split(" / ")[0]}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="mt-1">
                        {order.asset.isOpenSource ? (
                          <span className="text-xs text-emerald-600 font-medium">Free / Open Source</span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            Paid ${order.amount.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Download */}
                    <button
                      onClick={() => handleDownload(order.asset.id)}
                      disabled={downloading === order.asset.id}
                      className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      {downloading === order.asset.id ? "..." : "Download"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
