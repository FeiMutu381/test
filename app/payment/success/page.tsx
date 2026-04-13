import { Suspense } from "react";
import { PaymentSuccessClient } from "@/components/PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    }>
      <PaymentSuccessClient />
    </Suspense>
  );
}
