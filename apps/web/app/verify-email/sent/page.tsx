"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useState } from "react";
import { authService } from "@/services/auth.service";

export default function VerifyEmailSentPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");

  async function resendEmail() {
    if (!email) return;
    setResending(true);
    setMessage("");

    try {
      await authService.resendVerification({ email });
      setMessage("Verification email sent successfully.");
    } catch (error) {
      setMessage("Unable to resend verification email.");
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B132B] px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center relative">
        {/* Back button */}
        <Link
          href="/signin"
          className="absolute top-5 left-5 inline-flex items-center gap-1 text-sm text-white/40 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Main heading */}
        <h1 className="text-2xl font-bold text-white mb-6 mt-4">
          Check your e‑mail
        </h1>

        {/* Email pill */}
        {email && (
          <div className="inline-block bg-white/10 rounded-full px-6 py-2 text-white/90 font-medium mb-4">
            {email}
          </div>
        )}

        {/* Explanation */}
        <p className="text-white/70 mb-2 text-sm leading-relaxed">
          We&apos;ve sent a verification link to the address above.
        </p>

        {/* Expiry warning */}
        <p className="text-red-400 text-sm font-medium mb-8">
          It will expire shortly, so please verify it right now.
        </p>

        {/* Resend button */}
        <button
          onClick={resendEmail}
          disabled={resending}
          className="inline-flex items-center justify-center gap-2 w-full rounded-full border-2 border-[#00D2FF] text-[#00D2FF] font-semibold py-3 hover:bg-[#00D2FF] hover:text-black transition disabled:opacity-50"
        >
          <RefreshCw size={18} />
          {resending ? "Sending..." : "Resend"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-[#00D2FF]">{message}</p>
        )}

        <hr className="my-8 border-white/10" />

        <p className="text-sm text-white/50">
          Wanna start your own project?{" "}
          <Link
            href="/dashboard/workspace/create"
            className="text-[#00D2FF] font-semibold hover:underline"
          >
            Create your workspace here.
          </Link>
        </p>

        {/* Bottom brand anchor */}
        <div className="mt-8 flex justify-center items-center gap-2 text-white/40">
          <Image
            src="/img/our_logo.jpg"
            alt="EngineeringOS Logo"
            width={24}
            height={24}
            className="rounded"
          />
          <span className="text-sm font-semibold text-white/50">
            EngineeringOS
          </span>
        </div>
      </div>
    </main>
  );
}
