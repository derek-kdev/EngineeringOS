// apps/web/components/dashboard/DashboardStats.tsx
"use client";

import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { DashboardData } from "@/types/dashboard";

interface DashboardStatsProps {
  stats: DashboardData;
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
      value: stats?.prototypeProgress || 0,
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
        <AnimatedCard
          key={stat.label}
          delay={index * 0.1}
          direction="up"
          glow={true}
          className={`
            rounded-2xl border border-[#FF6200]/20
            bg-[#111111]/80 p-6 backdrop-blur-xl
            transition-all hover:border-[#FF8A00]/40
            hover:shadow-[0_0_40px_rgba(255,138,0,0.1)]
          `}
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl animate-float">{stat.icon}</span>
            <span className="text-xs font-medium text-emerald-400">
              {stat.change}
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
        </AnimatedCard>
      ))}
    </div>
  );
}