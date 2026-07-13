// apps/web/components/dashboard/community/ChannelTabs.tsx
"use client";

import type { Channel, ChannelId } from "@/types/community";

interface ChannelTabsProps {
  channels: Channel[];
  active: ChannelId;
  onChange: (id: ChannelId) => void;
}

export default function ChannelTabs({ channels, active, onChange }: ChannelTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {channels.map((channel) => {
        const isActive = channel.id === active;
        return (
          <button
            key={channel.id}
            onClick={() => onChange(channel.id)}
            className={`
              rounded-full px-4 py-1.5 text-sm font-medium transition
              ${
                isActive
                  ? "bg-gradient-to-r from-[#FF6200] to-[#FFB300] text-black"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {channel.label}
          </button>
        );
      })}
    </div>
  );
}