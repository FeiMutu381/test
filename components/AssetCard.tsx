"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, ShoppingCart, HardDrive, FileType } from "lucide-react";

type Asset = {
  id: string;
  name: string;
  price: number;
  isOpenSource: boolean;
  size: string;
  format: string;
  thumbnailUrl: string;
  category: string;
};

export function AssetCard({ asset }: { asset: Asset }) {
  const categoryColors: Record<string, string> = {
    Factory: "bg-orange-100 text-orange-700",
    Home: "bg-green-100 text-green-700",
    Others: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="card group flex flex-col">
      {/* Thumbnail */}
      <Link href={`/assets/${asset.id}`} className="relative block aspect-video overflow-hidden">
        <Image
          src={asset.thumbnailUrl}
          alt={asset.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge ${categoryColors[asset.category] || "bg-gray-100 text-gray-600"}`}>
            {asset.category}
          </span>
          {asset.isOpenSource && (
            <span className="badge bg-emerald-100 text-emerald-700">Open Source</span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/assets/${asset.id}`}>
          <h3 className="font-semibold text-gray-900 text-base mb-1 hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {asset.name}
          </h3>
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-2 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3.5 h-3.5" />
            {asset.size}
          </span>
          <span className="flex items-center gap-1">
            <FileType className="w-3.5 h-3.5" />
            {asset.format.split(" / ")[0]}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            {asset.isOpenSource ? (
              <span className="text-emerald-600 font-semibold text-base">Free</span>
            ) : (
              <span className="text-gray-900 font-bold text-lg">${asset.price.toFixed(0)}</span>
            )}
          </div>
          <Link
            href={`/assets/${asset.id}`}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
              asset.isOpenSource
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            {asset.isOpenSource ? (
              <>
                <Download className="w-4 h-4" />
                Download
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Buy
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
