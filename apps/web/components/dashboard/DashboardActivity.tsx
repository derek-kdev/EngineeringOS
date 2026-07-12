"use client";

import { Activity } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

interface DashboardActivityProps {
  activities: ActivityItem[];
}

export default function DashboardActivity({ activities }: DashboardActivityProps) {
  const defaultActivities = [
    { id: "1", user: "Kingsley", action: "updated", target: "Mars Rover v2", time: "2 min ago" },
    { id: "2", user: "Sarah", action: "published", target: "Thermal Analysis Paper", time: "15 min ago" },
    { id: "3", user: "Michael", action: "created", target: "New Prototype: Sensor Array", time: "1 hour ago" },
    { id: "4", user: "Anonymous", action: "commented on", target: "AI-Powered Design", time: "3 hours ago" },
  ];

  const data = activities || defaultActivities;

  return (
    <AnimatedCard direction="left" delay={0.2} glow={true}>
      <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-[#FF8A00] animate-glow-pulse" />
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
        </div>
        <div className="mt-4 space-y-4">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border-b border-[#FF6200]/10 pb-3 last:border-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6200]/20 text-xs font-bold text-[#FFB300] animate-float">
                {item.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-zinc-300">
                  <span className="text-white font-medium">{item.user}</span>
                  {" "}{item.action}{" "}
                  <span className="text-[#FFB300]">{item.target}</span>
                </p>
                <p className="text-xs text-zinc-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
}