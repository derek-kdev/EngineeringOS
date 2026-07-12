"use client";

import { motion } from "framer-motion";

interface DashboardWelcomeProps {
  name: string;
  role: string;
}

export default function DashboardWelcome({ name, role }: DashboardWelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF6200]/20 to-[#FFB300]/10 p-6 border border-[#FF6200]/20">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#FF6200]/10 blur-3xl" />
        <div className="relative">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="text-[#FFB300]">{name}</span> 👋
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Your engineering workspace is ready. You are signed in as <span className="text-white">{role}</span>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}