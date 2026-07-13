// apps/web/components/dashboard/community/PostComposer.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Rocket } from "lucide-react";
import { useAuth } from "@/providers/auth.providers";

interface PostComposerProps {
  onPost?: (content: string) => void;
}

export default function PostComposer({ onPost }: PostComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    // TODO: wire up to POST /community/posts once the backend endpoint exists.
    onPost?.(trimmed);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black">
          {user?.name?.charAt(0) || "K"}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share an update, ask a question, or post a breakthrough..."
          rows={2}
          className="w-full flex-1 resize-none bg-transparent text-sm text-white placeholder-white/40 outline-none"
        />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <Paperclip size={14} /> Attach
        </button>
        <motion.button
          type="submit"
          whileHover={{ scale: content.trim() ? 1.02 : 1 }}
          whileTap={{ scale: content.trim() ? 0.98 : 1 }}
          disabled={!content.trim()}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-1.5 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Rocket size={14} /> Post
        </motion.button>
      </div>
    </form>
  );
}