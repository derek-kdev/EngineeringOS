// apps/web/components/dashboard/community/CommunitySidebar.tsx
"use client";

import { Flame, Users } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import type { CommunityMember, TrendingTopic } from "@/types/community";

interface CommunitySidebarProps {
  members: CommunityMember[];
  trending: TrendingTopic[];
}

export default function CommunitySidebar({ members, trending }: CommunitySidebarProps) {
  return (
    <div className="space-y-6">
      <AnimatedCard direction="right" delay={0.1} glow={true}>
        <div className="rounded-2xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#FF6200]" />
            <h3 className="text-sm font-semibold text-white">Active Members</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {members.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-xs font-bold text-black">
                    {member.initial}
                  </div>
                  {member.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111111] bg-emerald-400" />
                  )}
                </div>
                <span className="text-[10px] text-white/60">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard direction="right" delay={0.2} glow={true}>
        <div className="rounded-2xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-[#FF6200]" />
            <h3 className="text-sm font-semibold text-white">Trending Topics</h3>
          </div>
          <div className="mt-4 space-y-1">
            {trending.map((topic) => (
              <button
                key={topic.id}
                className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <span className="truncate">{topic.label}</span>
                <span className="ml-2 flex-shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
                  {topic.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
}