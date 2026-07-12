"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface DashboardWelcomeProps {
  name: string;
  role: string;
}

export default function DashboardWelcome({ name, role }: DashboardWelcomeProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
            }
          : {}
      }
      className="relative overflow-hidden rounded-2xl border border-[#FF6200]/20 bg-gradient-to-r from-[#FF6200]/20 to-[#FFB300]/10 p-6 animate-border-glow"
    >
      {/* Glow orbs */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FF6200]/10 blur-3xl animate-glow-pulse" />
      <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[#FFB300]/10 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, <span className="text-[#FFB300]">{name}</span> 👋
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Your engineering workspace is ready. You are signed in as{" "}
          <span className="text-white">{role}</span>.
        </p>
      </div>
    </motion.div>
  );
}