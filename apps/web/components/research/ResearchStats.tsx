// apps/web/components/research/ResearchStats.tsx
"use client";

import { useResearchStore } from "@/stores/research";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { FileText, Users, BookOpen, Sparkles } from "lucide-react";

export default function ResearchStats() {
  const { stats } = useResearchStore();

  if (!stats) return null;

  const items = [
    { label: "Total Documents", value: stats.totalDocuments, icon: <FileText size={16} /> },
    { label: "Citations", value: stats.totalCitations, icon: <BookOpen size={16} /> },
    { label: "Extracted Parameters", value: stats.extractedParamsCount, icon: <Sparkles size={16} /> },
    { label: "Categories", value: Object.keys(stats.categories).length, icon: <Users size={16} /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <AnimatedCard
          key={item.label}
          className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#FFB300]">{item.icon}</span>
            <span className="text-xs text-white/60">{item.label}</span>
          </div>
          <p className="text-2xl font-bold text-white">{item.value}</p>
        </AnimatedCard>
      ))}
    </div>
  );
}