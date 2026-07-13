// apps/web/components/ideas/VoteButton.tsx
"use client";

import { useState } from "react";
import { useIdeasStore } from "@/stores/ideas";
import { ChevronUp, ChevronDown } from "lucide-react";

interface VoteButtonProps {
  ideaId: string;
  initialVotes: number;
  userVote?: "up" | "down" | null;
}

export default function VoteButton({ ideaId, initialVotes, userVote }: VoteButtonProps) {
  const { vote } = useIdeasStore();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={(e) => {
          e.preventDefault();
          vote(ideaId, "up");
        }}
        className={`rounded p-1 transition hover:bg-[#FF6200]/20 ${
          userVote === "up" ? "text-[#FFB300]" : "text-white/40 hover:text-white"
        }`}
      >
        <ChevronUp size={18} />
      </button>
      <span className="min-w-[1.5rem] text-center text-sm font-medium text-white">
        {initialVotes}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          vote(ideaId, "down");
        }}
        className={`rounded p-1 transition hover:bg-[#FF6200]/20 ${
          userVote === "down" ? "text-red-400" : "text-white/40 hover:text-white"
        }`}
      >
        <ChevronDown size={18} />
      </button>
    </div>
  );
}