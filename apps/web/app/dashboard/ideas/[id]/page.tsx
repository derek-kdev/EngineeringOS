// apps/web/app/dashboard/ideas/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useIdeasStore } from "@/stores/ideas";
import { ArrowLeft, MessageSquare, User, Calendar, ExternalLink } from "lucide-react";
import VoteButton from "@/components/ideas/VoteButton";
import IdeaStatusBadge from "@/components/ideas/IdeaStatusBadge";
import CommentSection from "@/components/ideas/CommentSection";

export default function IdeaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { selectedIdea, fetchIdeaById, promoteToProject } = useIdeasStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchIdeaById(params.id as string);
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [params.id]);

  if (isLoading || !selectedIdea) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF6200] border-t-transparent" />
      </div>
    );
  }

  const idea = selectedIdea;

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
      >
        <ArrowLeft size={16} /> Back to Ideas
      </button>

      {/* Main */}
      <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-8 backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Vote */}
          <div className="flex items-center gap-4 md:flex-col md:items-center">
            <VoteButton ideaId={idea.id} initialVotes={idea.votes} userVote={idea.userVote} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{idea.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <User size={14} />
                    {idea.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(idea.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    {idea.commentCount} comments
                  </span>
                </div>
              </div>
              <IdeaStatusBadge status={idea.status} />
            </div>

            <p className="mt-4 text-white/80 leading-relaxed">{idea.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#FF6200]/10 px-3 py-1 text-xs text-[#FFB300]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Admin Actions */}
            {idea.status !== "in_progress" && idea.status !== "implemented" && (
              <div className="mt-6 flex gap-3 border-t border-[#FF6200]/10 pt-4">
                <button
                  onClick={() => promoteToProject(idea.id)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  <ExternalLink size={16} /> Promote to Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments */}
      <CommentSection ideaId={idea.id} comments={idea.comments} />
    </div>
  );
}