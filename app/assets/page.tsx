import { prisma } from "@/lib/prisma";
import { AssetCard } from "@/components/AssetCard";
import { AssetFilters } from "@/components/AssetFilters";
import { Suspense } from "react";

interface AssetsPageProps {
  searchParams: { q?: string; category?: string };
}

async function getAssets(q?: string, category?: string) {
  return prisma.asset.findMany({
    where: {
      AND: [
        category && category !== "All" ? { category } : {},
        q
          ? {
              OR: [
                { name: { contains: q } },
                { description: { contains: q } },
                { tags: { contains: q } },
                { category: { contains: q } },
              ],
            }
          : {},
      ],
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
}

export default async function AssetsPage({ searchParams }: AssetsPageProps) {
  const { q, category } = searchParams;
  const assets = await getAssets(q, category);

  const counts = await prisma.asset.groupBy({
    by: ["category"],
    _count: { id: true },
  });
  const totalCount = await prisma.asset.count();

  const categoryCounts: Record<string, number> = { All: totalCount };
  counts.forEach((c) => {
    categoryCounts[c.category] = c._count.id;
  });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-3">Asset Library</h1>
          <p className="text-slate-300 text-lg">
            High-quality synthetic scene assets for World Model training
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Suspense>
          <AssetFilters
            currentQ={q}
            currentCategory={category}
            categoryCounts={categoryCounts}
          />
        </Suspense>

        {/* Results */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-5">
            {assets.length} asset{assets.length !== 1 ? "s" : ""}
            {q ? ` matching "${q}"` : ""}
            {category && category !== "All" ? ` in ${category}` : ""}
          </p>

          {assets.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No assets found
              </h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {assets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
