// apps/web/app/reset-password/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

const BACKGROUND_IMAGE = "https://i.pinimg.com/1200x/a1/c3/47/a1c3470e2ad52e54066bf877d07e94e3.jpg";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      router.replace("/forgot-password");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (!token) return null;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <AuthCard title="Set new password" subtitle="Enter your new password below" backgroundImage={BACKGROUND_IMAGE} footer={
        <Link href="/signin" className="flex items-center gap-2 text-[#FF8A00] hover:text-[#FFB300] transition font-semibold text-sm">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      }>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Password reset successful!</h3>
            <p className="text-sm text-zinc-400 text-center">Your password has been updated.</p>
            <Link href="/signin" className="mt-2 rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02]">
              Go to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#FF6200]/20 bg-[#1F1F1F]/60 px-4 py-3.5 pr-10 text-sm text-white placeholder-zinc-500 focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#FF6200]/20 bg-[#1F1F1F]/60 px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30"
                required
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)] disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </AuthCard>
    </motion.div>
  );
}