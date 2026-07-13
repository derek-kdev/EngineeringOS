// apps/web/app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const BACKGROUND_IMAGE = "https://i.pinimg.com/1200x/a1/c3/47/a1c3470e2ad52e54066bf877d07e94e3.jpg";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <AuthCard title="Reset your password" subtitle="Enter your email and we'll send you a reset link" backgroundImage={BACKGROUND_IMAGE} footer={
        <Link href="/signin" className="flex items-center gap-2 text-[#FF8A00] hover:text-[#FFB300] transition font-semibold text-sm">
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      }>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Check your inbox</h3>
            <p className="text-center text-sm text-zinc-400">
              We've sent a password reset link to <br />
              <span className="text-white font-medium">{email}</span>
            </p>
            <button onClick={() => setSubmitted(false)} className="mt-2 text-sm text-[#FF8A00] hover:underline">
              Change email address
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@engineering.com"
                  className="w-full rounded-xl border border-[#FF6200]/20 bg-[#1F1F1F]/60 pl-10 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30"
                  required
                />
              </div>
              {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </AuthCard>
    </motion.div>
  );
}