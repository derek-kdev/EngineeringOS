// apps/web/components/dashboard/community/PostCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Pin, MessageCircle, Paperclip, FlaskConical, FileText, FolderKanban } from "lucide-react";
import type { CommunityPost, ReactionType } from "@/types/community";

const REACTION_EMOJI: Record<ReactionType, string> = {
  like: "👍",
  insight: "💡",
  fire: "🔥",
  rocket: "🚀",
  handshake: "🤝",
};

const ATTACHMENT_ICON = {
  paper: FileText,
  prototype: FlaskConical,
  project: FolderKanban,
};

interface PostCardProps {
  post: CommunityPost;
}

export default function PostCard({ post }: PostCardProps) {
  const reactionEntries = Object.entries(post.reactions).filter(([, count]) => !!count) as [
    ReactionType,
    number,
  ][];

  const AttachmentIcon = post.attachment ? ATTACHMENT_ICON[post.attachment.type] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`
        rounded-2xl border p-5 backdrop-blur-xl
        ${post.pinned ? "border-[#FF6200]/30 bg-[#FF6200]/[0.04]" : "border-white/10 bg-white/5"}
      `}
    >
      {post.pinned && (
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-[#FF6200]">
          <Pin size={12} /> Pinned
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black">
          {post.author.initial}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-semibold text-white">{post.author.name}</span>
            <span className="text-xs text-white/50">{post.author.role}</span>
            <span className="text-xs text-white/30">· {post.timestamp}</span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-white/80">{post.content}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {post.attachment && AttachmentIcon && (
            <Link
              href={post.attachment.href}
              className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/80 transition hover:border-[#FF6200]/30 hover:bg-white/10 hover:text-white"
            >
              <AttachmentIcon size={16} className="text-[#FF6200]" />
              <span className="flex-1 truncate">{post.attachment.title}</span>
              <Paperclip size={14} className="text-white/40" />
            </Link>
          )}

          <div className="mt-4 flex items-center gap-4 text-white/60">
            <div className="flex items-center gap-2">
              {reactionEntries.map(([type, count]) => (
                <button
                  key={type}
                  className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs transition hover:bg-white/10"
                >
                  <span>{REACTION_EMOJI[type]}</span>
                  <span className="text-white/70">{count}</span>
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 text-xs transition hover:text-white">
              <MessageCircle size={14} />
              {post.commentCount} comments
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}