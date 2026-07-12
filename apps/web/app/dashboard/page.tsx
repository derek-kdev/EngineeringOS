"use client";

import { motion } from "framer-motion";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardActivity from "@/components/dashboard/DashboardActivity";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#FF6200] border-t-transparent" />
          <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-[#FF6200]/10 blur-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center text-zinc-400">
          <p className="text-lg font-medium text-white">Failed to load dashboard</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <DashboardWelcome name={stats?.user?.name || "Kingsley"} role={stats?.user?.role || "Lead Engineer"} />

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Activity + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardActivity activities={stats?.recentActivity} />
        </div>

        <div className="lg:col-span-1">
          <AnimatedCard direction="right" delay={0.3} glow={true}>
            <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-2.5 text-sm font-medium text-black transition-all hover:shadow-[0_0_30px_rgba(255,138,0,0.3)]"
                >
                  + New Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl border border-[#FF6200]/30 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#FF6200]/10"
                >
                  + New Prototype
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl border border-[#FF6200]/30 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#FF6200]/10"
                >
                  + Submit Idea
                </motion.button>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </motion.div>
  );
}