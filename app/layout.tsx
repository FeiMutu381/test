import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AperData — World Model Synthetic Data Platform",
  description:
    "High-quality synthetic training data and scene assets for World Model development. Browse, purchase, and download Factory, Home, and other 3D environments.",
  keywords: ["world model", "synthetic data", "3D assets", "training data", "AI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-slate-50`}>
        <Providers>
          <Navigation />
          <main>{children}</main>
          <footer className="bg-slate-900 text-slate-400 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <span className="text-white font-bold text-lg">AperData</span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    World Model synthetic data platform powering the next generation of embodied AI.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Platform</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/assets" className="hover:text-white transition-colors">Asset Library</a></li>
                    <li><a href="/account" className="hover:text-white transition-colors">My Account</a></li>
                    <li><a href="/assets?category=Factory" className="hover:text-white transition-colors">Factory Scenes</a></li>
                    <li><a href="/assets?category=Home" className="hover:text-white transition-colors">Home Scenes</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Contact</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="mailto:service@aperdata.ai" className="hover:text-white transition-colors">
                        service@aperdata.ai
                      </a>
                    </li>
                    <li className="text-xs mt-4 text-slate-500">
                      © {new Date().getFullYear()} AperData. All rights reserved.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
