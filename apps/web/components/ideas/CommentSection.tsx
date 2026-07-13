// apps/web/components/ideas/CommentSection.tsx
"use client";

import { useState } from "react";
import { useIdeasStore } from "@/stores/ideas";
import { Comment } from "@/types/ideas";
import { User, Send } from "lucide-react";

interface CommentSectionProps {
  ideaId: string;
  comments: Comment[];
}

export default function CommentSection({ ideaId, comments }: CommentSectionProps) {
  const { addComment } = useIdeasStore();
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(ideaId, newComment.trim());
    setNewComment("");
  };

  return (
    <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-8 backdrop-blur-xl">
      <h3 className="text-lg font-semibold text-white mb-4">
        Comments ({comments.length})
      </h3>

      {/* Comment List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-sm text-white/40">No comments yet. Start the conversation!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-[#FF6200]/10 pb-4 last:border-0">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6200]/20 text-xs font-bold text-[#FFB300]">
                  {comment.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{comment.author}</span>
                    <span className="text-xs text-white/40">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{comment.content}</p>
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2 ml-4 space-y-2 border-l-2 border-[#FF6200]/20 pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6200]/10 text-xs font-bold text-[#FFB300]">
                            {reply.author.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-white">{reply.author}</span>
                              <span className="text-[10px] text-white/40">
                                {new Date(reply.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <p className="text-xs text-white/70">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Comment */}
      <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6200]/20 text-xs font-bold text-[#FFB300]">
          K
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] p-2.5 text-black transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}