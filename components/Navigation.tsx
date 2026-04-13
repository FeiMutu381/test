"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, ChevronDown, User, LogOut, Package } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow group-hover:bg-blue-700 transition-colors">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              AperData
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/assets"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            >
              Assets
            </Link>
            <a
              href="mailto:service@aperdata.ai"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
            >
              Contact Us
            </a>

            {status === "loading" ? (
              <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <span className="max-w-[120px] truncate">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <Link
                      href="/account"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Package className="w-4 h-4 text-gray-400" />
                      My Account
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary text-sm py-2 px-5">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-gray-600 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            <Link
              href="/assets"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              Assets
            </Link>
            <a
              href="mailto:service@aperdata.ai"
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              Contact Us
            </a>
            {session ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                >
                  My Account
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-blue-600 font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Overlay for dropdown close */}
      {accountOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setAccountOpen(false)}
        />
      )}
    </nav>
  );
}
