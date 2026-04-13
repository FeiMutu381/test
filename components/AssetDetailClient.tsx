"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Download,
  ShoppingCart,
  HardDrive,
  FileType,
  Tag,
  ChevronLeft,
  CheckCircle,
  Play,
  ExternalLink,
} from "lucide-react";
import type { Session } from "next-auth";

type Asset = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isOpenSource: boolean;
  size: string;
  format: string;
  downloadUrl: string;
  thumbnailUrl: string;
  images: string[];
  videoUrl?: string | null;
  tags: string[];
  featured: boolean;
};

interface Props {
  asset: Asset;
  session: Session | null;
  hasPurchased: boolean;
}

const categoryColors: Record<string, string> = {
  Factory: "bg-orange-100 text-orange-700",
  Home: "bg-green-100 text-green-700",
  Others: "bg-purple-100 text-purple-700",
};

export function AssetDetailClient({ asset, session, hasPurchased }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [purchasing, setPurchasing] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const canDownload = asset.isOpenSource || hasPurchased;

  const handleBuy = async () => {
    if (!session) {
      window.location.href = `/login?callbackUrl=/assets/${asset.id}`;
      return;
    }
    setPurchasing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId: asset.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initiate checkout");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setPurchasing(false);
    }
  };

  const handleDownload = async () => {
    if (!session && !asset.isOpenSource) {
      window.location.href = `/login?callbackUrl=/assets/${asset.id}`;
      return;
    }
    setDownloading(true);
    try {
      const res = await fetch(`/api/download?assetId=${asset.id}`);
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        alert(data.error || "Download not available");
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/assets" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              Asset Library
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{asset.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Media */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
              <Image
                src={asset.images[activeImage] || asset.thumbnailUrl}
                alt={asset.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Thumbnail strip */}
            {asset.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {asset.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      i === activeImage ? "border-blue-500 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
                {asset.videoUrl && (
                  <a
                    href={asset.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-20 h-14 rounded-lg bg-gray-900 border-2 border-transparent flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-6 h-6 text-white" />
                  </a>
                )}
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-3">About this Asset</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{asset.description}</p>

              {/* Tags */}
              {asset.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-5">
              {/* Name + category */}
              <div>
                <span className={`badge ${categoryColors[asset.category] || "bg-gray-100 text-gray-600"} mb-3`}>
                  {asset.category}
                </span>
                {asset.isOpenSource && (
                  <span className="badge bg-emerald-100 text-emerald-700 ml-2 mb-3">Open Source</span>
                )}
                <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                  {asset.name}
                </h1>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-100 py-4">
                {asset.isOpenSource ? (
                  <div>
                    <span className="text-3xl font-bold text-emerald-600">Free</span>
                    <p className="text-xs text-gray-400 mt-1">Open Source — no payment required</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      ${asset.price.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">One-time purchase · Lifetime access</p>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-500">
                    <HardDrive className="w-4 h-4" />
                    File Size
                  </span>
                  <span className="font-medium text-gray-900">{asset.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-500">
                    <FileType className="w-4 h-4" />
                    Format
                  </span>
                  <span className="font-medium text-gray-900 text-right max-w-[180px]">
                    {asset.format}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 pt-1">
                {canDownload ? (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    {downloading ? "Preparing..." : "Download Asset"}
                  </button>
                ) : (
                  <button
                    onClick={handleBuy}
                    disabled={purchasing}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {purchasing ? "Redirecting..." : `Buy for $${asset.price.toFixed(2)}`}
                  </button>
                )}

                {hasPurchased && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm justify-center">
                    <CheckCircle className="w-4 h-4" />
                    You own this asset
                  </div>
                )}

                {!session && !asset.isOpenSource && (
                  <p className="text-center text-xs text-gray-400">
                    <Link href={`/login?callbackUrl=/assets/${asset.id}`} className="text-blue-600 hover:underline">
                      Sign in
                    </Link>{" "}
                    to purchase
                  </p>
                )}
              </div>

              {/* Support */}
              <div className="pt-3 border-t border-gray-100">
                <a
                  href="mailto:service@aperdata.ai"
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Need help? Contact service@aperdata.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
