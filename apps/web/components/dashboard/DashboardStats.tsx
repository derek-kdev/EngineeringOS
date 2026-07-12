"use client";

import { motion } from "framer-motion";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardStats as StatsType } from "@/types/dashboard";

interface DashboardStatsProps {
  stats: StatsType;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statsData = [
    {
      label: "Active Projects",
      value: stats?.projects || 0,
      change: "+2 this month",
      trend: "up",
      icon: "📁",
    },
    {
      label: "Research Papers",
      value: stats?.researchPapers || 0,
      change: "+5 this week",
      trend: "up",
      icon: "📚",
    },
    {
      label: "Prototype Progress",
      value: `${stats?.prototypeProgress || 0}%`,
      change: "+8% this month",
      trend: "up",
      icon: "📊",
    },
    {
      label: "Prototypes",
      value: stats?.prototypes || 0,
      change: `${stats?.dueToday || 0} due today`,
      trend: "neutral",
      icon: "🧪",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
}