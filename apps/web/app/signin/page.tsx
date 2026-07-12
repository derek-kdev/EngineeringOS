"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { motion } from "framer-motion";

const BACKGROUND_IMAGE = "https://i.pinimg.com/1200x/a1/c3/47/a1c3470e2ad52e54066bf877d07e94e3.jpg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in", { email, password, rememberMe });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AuthCard
        title="Sign in to EngineeringOS"
        subtitle="Welcome back. Access your command centre."
        backgroundImage={BACKGROUND_IMAGE}
        footer={
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#FF8A00] hover:text-[#FFB300] transition font-semibold">
              Create workspace →
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[#FF8A00] hover:text-[#FFB300] transition hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2.5 text-sm text-zinc-400 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="
                  w-4.5 h-4.5 rounded 
                  border-[#FF6200]/30
                  text-[#FF8A00] focus:ring-[#FF8A00] focus:ring-offset-0
                  bg-[#1F1F1F]
                  cursor-pointer
                "
              />
              <span className="group-hover:text-white transition">Remember me</span>
            </label>
            <span className="text-xs text-zinc-500 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              256‑bit encrypted
            </span>
          </div>

          <button
            type="submit"
            className="
              w-full rounded-full
              bg-gradient-to-r from-[#FF6200] to-[#FFB300]
              px-6 py-3.5 text-sm font-semibold text-black
              transition-all duration-300
              hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)]
              active:scale-95
            "
          >
            Sign in
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