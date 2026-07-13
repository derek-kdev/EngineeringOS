// apps/web/app/dashboard/ideas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useIdeasStore } from "@/stores/ideas";
import { motion } from "framer-motion";
import { Plus, Search, Filter, TrendingUp, Lightbulb, Clock, CheckCircle } from "lucide-react";
import IdeaCard from "@/components/ideas/IdeaCard";
import NewIdeaModal from "@/components/ideas/NewIdeaModal";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { IdeaStatus } from "@/types/ideas";

const statusLabels: Record<IdeaStatus, string> = {
  draft: "Draft",
  under_review: "Under Review",
  planned: "Planned",
  in_progress: "In Progress",
  implemented: "Implemented",
  archived: "Archived",
};

export default function IdeasPage() {
  const {
    ideas,
    stats,
    sort,
    filter,
    searchQuery,
    isLoading,
    fetchIdeas,
    setSort,
    setFilter,
    setSearchQuery,
  } = useIdeasStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const filteredAndSorted = () => {
    let result = [...ideas];

    // Filter
    if (filter !== "all") {
      result = result.filter((idea) => idea.status === filter);
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (idea) =>
          idea.title.toLowerCase().includes(q) ||
          idea.description.toLowerCase().includes(q) ||
          idea.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          idea.author.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sort) {
      case "latest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "most_voted":
        result.sort((a, b) => b.votes - a.votes);
        break;
      case "most_commented":
        result.sort((a, b) => b.commentCount - a.commentCount);
        break;
      case "trending":
        // Simple trending: votes + comments * 2
        result.sort((a, b) => {
          const scoreA = a.votes + a.commentCount * 2;
          const scoreB = b.votes + b.commentCount * 2;
          return scoreB - scoreA;
        });
        break;
    }

    // Pinned first
    const pinned = result.filter((i) => i.isPinned);
    const unpinned = result.filter((i) => !i.isPinned);
    return [...pinned, ...unpinned];
  };

  const displayedIdeas = filteredAndSorted();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">💡 Ideas Hub</h1>
          <p className="text-sm text-white/60">Capture, refine, and vote on the next big engineering ideas</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,138,0,0.3)]"
        >
          <Plus size={18} /> New Idea
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-[#FFB300]" />
            <span className="text-xs text-white/60">Total</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.total || 0}</p>
        </AnimatedCard>
        <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" />
            <span className="text-xs text-white/60">Under Review</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.byStatus?.under_review || 0}</p>
        </AnimatedCard>
        <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-blue-400" />
            <span className="text-xs text-white/60">Implemented</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.byStatus?.implemented || 0}</p>
        </AnimatedCard>
        <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-amber-400" />
            <span className="text-xs text-white/60">Planned</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats?.byStatus?.planned || 0}</p>
        </AnimatedCard>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] py-2 pl-9 pr-4 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-white/40" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as IdeaStatus | "all")}
              className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-3 py-2 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="under_review">Under Review</option>
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="implemented">Implemented</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-3 py-2 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
          >
            <option value="latest">Latest</option>
            <option value="most_voted">Most Voted</option>
            <option value="most_commented">Most Commented</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF6200] border-t-transparent" />
          </div>
        ) : displayedIdeas.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-12 text-center">
            <div className="mb-4 text-6xl">💡</div>
            <h3 className="text-xl font-medium text-white">No ideas found</h3>
            <p className="mt-2 text-sm text-white/60">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filter."
                : "Be the first to submit an idea!"}
            </p>
            {!searchQuery && filter === "all" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2 text-sm font-semibold text-black"
              >
                + Submit an Idea
              </button>
            )}
          </div>
        ) : (
          displayedIdeas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <IdeaCard idea={idea} />
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <NewIdeaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}