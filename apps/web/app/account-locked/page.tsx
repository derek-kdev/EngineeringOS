"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LockKeyhole, ArrowLeft } from "lucide-react";

export default function AccountLockedPage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const resetHref = emailParam
    ? `/forgot-password?email=${encodeURIComponent(emailParam)}`
    : "/forgot-password";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B132B] px-6 text-white">
      <div className="max-w-md w-full rounded-3xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl p-10 text-center">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
          <LockKeyhole size={32} className="text-red-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold">Account Locked</h1>

        <p className="mt-4 text-white/70">
          Your account has been locked due to multiple failed login attempts.
          A password reset email has been sent.
        </p>

        <Link
          href={resetHref}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#FF6B00] px-6 py-3 font-semibold text-black"
        >
          Reset Password
        </Link>

        <Link
          href="/signin"
          className="mt-5 flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>
      </div>
    </main>
  );
}
