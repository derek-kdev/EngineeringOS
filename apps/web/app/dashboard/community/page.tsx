// apps/web/app/dashboard/community/page.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/providers/auth.providers";
import ChannelTabs from "@/components/dashboard/community/ChannelTabs";
import PostComposer from "@/components/dashboard/community/PostComposer";
import PostCard from "@/components/dashboard/community/PostCard";
import CommunitySidebar from "@/components/dashboard/community/CommunitySidebar";
import { CHANNELS, MOCK_POSTS, ACTIVE_MEMBERS, TRENDING_TOPICS } from "@/lib/community-mock-data";
import type { ChannelId, CommunityPost } from "@/types/community";

const PAGE_SIZE = 4;

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState<ChannelId>("all");
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_POSTS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredPosts = useMemo(() => {
    const scoped =
      activeChannel === "all" ? posts : posts.filter((p) => p.channel === activeChannel);
    // Pinned posts always float to the top of whichever view is active.
    return [...scoped].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  }, [posts, activeChannel]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleNewPost = (content: string) => {
    // TODO: replace optimistic local insert with the real POST /community/posts call.
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: user?.name || "Kingsley",
        role: "Lead Engineer",
        initial: user?.name?.charAt(0) || "K",
      },
      channel: activeChannel === "all" ? "general" : activeChannel,
      timestamp: "just now",
      content,
      reactions: {},
      commentCount: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Community</h1>
        <p className="mt-1 text-sm text-white/60">
          Share breakthroughs, troubleshoot problems, and see what your team is working on.
        </p>
      </div>

      <ChannelTabs channels={CHANNELS} active={activeChannel} onChange={setActiveChannel} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Feed */}
        <div className="space-y-4 lg:col-span-2">
          <PostComposer onPost={handleNewPost} />

          <AnimatePresence mode="popLayout">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/50">
                No posts in this channel yet — be the first to share something.
              </div>
            )}
          </AnimatePresence>

          {hasMore && (
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Load more
            </button>
          )}
        </div>

        {/* Right rail */}
        <div className="lg:col-span-1">
          <CommunitySidebar members={ACTIVE_MEMBERS} trending={TRENDING_TOPICS} />
        </div>
      </div>
    </motion.div>
  );
}