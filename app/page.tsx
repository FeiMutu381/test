import Link from "next/link";
import { ArrowRight, Database, Zap, Shield, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AssetCard } from "@/components/AssetCard";

async function getFeaturedAssets() {
  return prisma.asset.findMany({
    where: { featured: true },
    take: 3,
  });
}

export default async function HomePage() {
  const featured = await getFeaturedAssets();

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTM0N2YiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2MmgxMHYtMmgtNHptMC0zMFYwaDJ2NGgyVjBoLTJ2NEgzNnpNNiAzNHYtNEg0djRIMHYyaDEwdi0ySDZ6TTYgNFYwSDR2NEgwdjJoMTBWNEg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              World Model Training Data Platform
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Synthetic Data for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                World Models
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
              High-quality 3D scene assets and simulation data for training next-generation embodied AI. Factory floors, residential spaces, outdoor environments — all photorealistic.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/assets" className="btn-primary flex items-center gap-2 text-base py-3 px-8">
                Browse Assets
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:service@aperdata.ai"
                className="flex items-center gap-2 text-slate-300 hover:text-white font-semibold text-base py-3 px-6 border border-slate-700 rounded-lg hover:border-slate-500 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10">
            {[
              { label: "Scene Assets", value: "100+" },
              { label: "Asset Categories", value: "3" },
              { label: "File Formats", value: "5+" },
              { label: "Open Source", value: "Free" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for World Model Developers
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every asset is crafted to meet the rigorous demands of training embodied AI and world simulation models.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Production-Ready Formats",
                desc: "USD, glTF, FBX, OBJ — compatible with all major simulation and rendering engines including Isaac Sim, Unreal, and Unity.",
                color: "text-blue-600 bg-blue-50",
              },
              {
                icon: Globe,
                title: "Diverse Environments",
                desc: "Factory floors, residential homes, urban streets, hospitals and more. Comprehensive coverage for embodied AI training scenarios.",
                color: "text-purple-600 bg-purple-50",
              },
              {
                icon: Shield,
                title: "License & Compliance",
                desc: "Clear licensing terms for every asset. Open-source assets freely available; commercial assets with full usage rights for AI training.",
                color: "text-emerald-600 bg-emerald-50",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Assets */}
      {featured.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Assets</h2>
                <p className="text-gray-500">Top picks from our curated collection</p>
              </div>
              <Link
                href="/assets"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Power Your World Model?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Browse hundreds of high-quality scene assets optimized for AI training.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/assets"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Explore Assets
            </Link>
            <a
              href="mailto:service@aperdata.ai"
              className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
