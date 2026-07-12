"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: string;
}

export function StatCard({ label, value, change, trend, icon }: StatCardProps) {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-zinc-400",
  };

  return (
    <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl transition-all hover:border-[#FF8A00]/40">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-medium ${trendColors[trend]}`}>
          {change}
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </div>
  );
}