"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download, Package } from "lucide-react";

export function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }

    const poll = async () => {
      try {
        const res = await fetch(`/api/orders/by-session?session_id=${sessionId}`);
        const data = await res.json();
        if (data.order) {
          setOrder(data.order);
          setLoading(false);
        } else {
          // Poll again in 1.5s (webhook may not have fired yet)
          setTimeout(poll, 1500);
        }
      } catch {
        setLoading(false);
      }
    };
    poll();
  }, [sessionId]);

  const handleDownload = async () => {
    if (!order?.asset?.id) return;
    setDownloading(true);
    try {
      const res = await fetch(`/api/download?assetId=${order.asset.id}`);
      const data = await res.json();
      if (data.url) window.open(data.url, "_blank");
      else alert(data.error || "Download unavailable");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Confirming your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          {order ? (
            <>
              <p className="text-gray-500 text-sm mb-6">
                You&apos;ve successfully purchased{" "}
                <strong className="text-gray-900">{order.asset?.name}</strong>
              </p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-3 disabled:opacity-50"
              >
                <Download className="w-5 h-5" />
                {downloading ? "Preparing..." : "Download Asset"}
              </button>
            </>
          ) : (
            <p className="text-gray-500 text-sm mb-6">
              Your payment was received. Your asset is available in your account.
            </p>
          )}
          <div className="flex gap-3 mt-2">
            <Link
              href="/account"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2.5 rounded-xl text-sm transition-colors border border-gray-200"
            >
              <Package className="w-4 h-4" />
              My Account
            </Link>
            <Link
              href="/assets"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2.5 rounded-xl text-sm transition-colors border border-gray-200"
            >
              Browse More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
