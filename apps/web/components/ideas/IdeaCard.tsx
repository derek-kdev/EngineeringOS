// apps/web/components/ideas/IdeaCard.tsx
"use client";

import Link from "next/link";
import { Idea } from "@/types/ideas";
import VoteButton from "./VoteButton";
import IdeaStatusBadge from "./IdeaStatusBadge";
import { MessageSquare, Pin, User, Calendar } from "lucide-react";

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Link href={`/dashboard/ideas/${idea.id}`}>
      <div className="group relative rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl transition-all hover:border-[#FF8A00]/40 hover:shadow-[0_0_40px_rgba(255,138,0,0.05)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          {/* Vote */}
          <div className="flex items-center gap-3 md:flex-col md:items-center">
            <VoteButton ideaId={idea.id} initialVotes={idea.votes} userVote={idea.userVote} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  {idea.isPinned && <Pin size={14} className="text-[#FFB300]" />}
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#FFB300] transition">
                    {idea.title}
                  </h3>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {idea.author}
                  </span>
                  <span>
                    {new Date(idea.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <IdeaStatusBadge status={idea.status} />
              </div>
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-white/70">{idea.description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap gap-1.5">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#FF6200]/10 px-2 py-0.5 text-xs text-[#FFB300]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-white/30">•</span>
              <span className="flex items-center gap-1 text-xs text-white/50">
                <MessageSquare size={14} />
                {idea.commentCount} comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}