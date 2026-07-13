// apps/web/app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardActivity from "@/components/dashboard/DashboardActivity";
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
      className="space-y-6"
    >
      {/* Stats Grid – with animated counters */}
      <DashboardStats stats={stats} />

      {/* Activity Feed – Full width (no Quick Actions) */}
      <div className="w-full">
        <DashboardActivity activities={stats?.recentActivity} />
      </div>
    </motion.div>
  );
}