"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";
import { motion } from "framer-motion";

const BACKGROUND_IMAGE = "https://i.pinimg.com/1200x/a1/c3/47/a1c3470e2ad52e54066bf877d07e94e3.jpg";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setError("");
    setIsLoading(true);
    setSuccess(false);

    try {
      // 🔄 Replace this URL with your actual backend sign-up endpoint
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          company,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign‑up failed. Please try again.");
      }

      // Success
      setSuccess(true);
      setIsLoading(false);

      // Optionally auto‑login (if endpoint returns a token)
      // If you have auto‑login, you can store token and redirect to dashboard
      // Otherwise, redirect to sign in after a delay
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AuthCard
        title="Create your workspace"
        subtitle="Join an intelligent engineering ecosystem."
        backgroundImage={BACKGROUND_IMAGE}
        footer={
          <>
            Already have an account?{" "}
            <Link href="/signin" className="text-[#FF8A00] hover:text-[#FFB300] transition font-semibold">
              Log in →
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Kingsley"
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

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Company / Organisation
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Corp."
              className="
                w-full rounded-xl 
                border border-[#FF6200]/20 
                bg-[#1F1F1F]/60
                px-4 py-3.5 text-sm
                text-white placeholder-zinc-500
                focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30
                transition-all duration-200
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
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

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className={`
                w-full rounded-xl 
                border ${password !== confirmPassword && confirmPassword ? 'border-red-500/50' : 'border-[#FF6200]/20'}
                bg-[#1F1F1F]/60
                px-4 py-3.5 text-sm
                text-white placeholder-zinc-500
                focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30
                transition-all duration-200
              `}
              required
            />
            {password !== confirmPassword && confirmPassword && (
              <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="
                w-4.5 h-4.5 rounded 
                border-[#FF6200]/30
                text-[#FF8A00] focus:ring-[#FF8A00] focus:ring-offset-0
                bg-[#1F1F1F]
                cursor-pointer
              "
              required
            />
            <label className="text-sm text-zinc-400 cursor-pointer hover:text-white transition">
              I agree to the{" "}
              <Link href="/terms" className="text-[#FF8A00] hover:text-[#FFB300] transition hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#FF8A00] hover:text-[#FFB300] transition hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Error & success messages */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400">
              ✅ Account created successfully! Redirecting to sign in...
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full rounded-full
              bg-gradient-to-r from-[#FF6200] to-[#FFB300]
              px-6 py-3.5 text-sm font-semibold text-black
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)]
              active:scale-95
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {isLoading ? "Creating account..." : "Launch Workspace →"}
          </button>
        </form>

        {/* Social / SSO */}
        <div className="mt-6">
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-[#FF6200]/20" />
            <span className="px-3 text-xs text-zinc-500">Or continue with</span>
            <div className="flex-1 border-t border-[#FF6200]/20" />
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#FF6200]/20 py-2.5 text-sm text-white hover:bg-[#FF6200]/10 hover:border-[#FF8A00] transition-all duration-200">
              <span className="text-lg font-bold">G</span> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#FF6200]/20 py-2.5 text-sm text-white hover:bg-[#FF6200]/10 hover:border-[#FF8A00] transition-all duration-200">
              <span className="text-lg">🐙</span> GitHub
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#FF6200]/20 py-2.5 text-sm text-white hover:bg-[#FF6200]/10 hover:border-[#FF8A00] transition-all duration-200">
              <span className="text-lg">🏢</span> SSO
            </button>
          </div>
        </div>
      </AuthCard>
    </motion.div>
  );
}