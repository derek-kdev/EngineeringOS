"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";
import { authApi } from "@/lib/api";

const BACKGROUND_IMAGE =
  "https://i.pinimg.com/1200x/a1/c3/47/a1c3470e2ad52e54066bf877d07e94e3.jpg";

type Status = "verifying" | "success" | "error" | "no-token";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>(token ? "verifying" : "no-token");
  const [message, setMessage] = useState("");

  // Resend form (shown when there's no token, or verification failed)
  const [email, setEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [resendError, setResendError] = useState("");

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    authApi
      .verifyEmailToken(token)
      .then(() => {
        if (!cancelled) setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setMessage(
          err?.response?.data?.message || "This verification link is invalid or has expired.",
        );
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendError("");
    setResendStatus("sending");
    try {
      await authApi.verifyEmail({ email });
      setResendStatus("sent");
    } catch (err: any) {
      setResendStatus("idle");
      setResendError(err?.response?.data?.message || "Couldn't send that — try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AuthCard
        title={
          status === "success"
            ? "Email verified"
            : status === "error"
              ? "Verification failed"
              : status === "verifying"
                ? "Verifying..."
                : "Verify your email"
        }
        subtitle={
          status === "success"
            ? "Your account is ready to go."
            : status === "error"
              ? message
              : status === "verifying"
                ? "Hang on a moment."
                : "Enter your email to get a new verification link."
        }
        backgroundImage={BACKGROUND_IMAGE}
        footer={
          <Link
            href="/signin"
            className="text-[#FF8A00] hover:text-[#FFB300] transition font-semibold"
          >
            Back to sign in →
          </Link>
        }
      >
        {status === "verifying" && (
          <div className="flex flex-col items-center gap-3 py-6 text-zinc-400">
            <Loader2 size={32} className="animate-spin text-[#FF8A00]" />
            <p className="text-sm">Confirming your email address...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <CheckCircle2 size={40} className="text-emerald-400" />
            <p className="text-sm text-zinc-400">
              You can sign in now — your account is fully active.
            </p>
            <Link
              href="/signin"
              className="
                w-full rounded-full
                bg-gradient-to-r from-[#FF6200] to-[#FFB300]
                px-6 py-3.5 text-sm font-semibold text-black text-center
                transition-all duration-300
                hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)]
              "
            >
              Sign in
            </Link>
          </div>
        )}

        {(status === "error" || status === "no-token") && (
          <div className="space-y-4">
            {status === "error" && (
              <div className="flex flex-col items-center gap-2 py-2 text-center">
                <XCircle size={32} className="text-red-400" />
              </div>
            )}

            {resendStatus === "sent" ? (
              <div className="flex flex-col items-center gap-2 py-4 text-center">
                <Mail size={28} className="text-[#FF8A00]" />
                <p className="text-sm text-zinc-400">
                  New verification link sent to {email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleResend} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@engineering.com"
                    className="
                      w-full rounded-xl
                      border border-[#FF6200]/20
                      bg-[#1F1F1F]/60
                      px-4 py-3.5 text-sm
                      text-white placeholder-zinc-500
                      focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30
                      transition-all duration-200
                    "
                    required
                  />
                </div>

                {resendError && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                    {resendError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={resendStatus === "sending"}
                  className="
                    w-full rounded-full
                    bg-gradient-to-r from-[#FF6200] to-[#FFB300]
                    px-6 py-3.5 text-sm font-semibold text-black
                    transition-all duration-300
                    hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)]
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                >
                  {resendStatus === "sending" ? "Sending..." : "Send verification link"}
                </button>
              </form>
            )}
          </div>
        )}
      </AuthCard>
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  // useSearchParams needs a Suspense boundary in the app router.
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}