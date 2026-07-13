// apps/web/components/research/ResearchLibrary.tsx
"use client";

import { useEffect, useState } from "react";
import { useResearchStore } from "@/stores/research";
import { motion } from "framer-motion";
import { Search, Filter, Upload, Sparkles, MessageSquare } from "lucide-react";
import DocumentUpload from "./DocumentUpload";
import DocumentList from "./DocumentList";
import DocumentDetail from "./DocumentDetail";
import AIChatPanel from "./AIChatPanel";
import ResearchStats from "./ResearchStats";
import { AnimatedCard } from "@/components/ui/AnimatedCard";

export default function ResearchLibrary() {
  const { documents, fetchDocuments, isLoading, selectedDocument } = useResearchStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const q = searchQuery.toLowerCase();
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.authors.some((a) => a.toLowerCase().includes(q)) ||
      doc.tags.some((t) => t.toLowerCase().includes(q)) ||
      doc.abstract.toLowerCase().includes(q)
    );
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF6200] border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">📚 Research Library</h1>
          <p className="text-sm text-white/60">Upload, analyse, and generate projects from your research</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowChat(!showChat)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
              showChat
                ? "border-[#FF8A00] bg-[#FF6200]/20 text-white"
                : "border-[#FF6200]/20 text-white/80 hover:bg-[#FF6200]/10"
            }`}
          >
            <MessageSquare size={16} /> AI Assistant
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-5 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
          >
            <Upload size={16} /> Upload Document
          </button>
        </div>
      </div>

      {/* Stats */}
      <ResearchStats />

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-4 backdrop-blur-xl">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search documents, authors, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] py-2 pl-9 pr-4 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-white/40" />
          <select className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-3 py-2 text-sm text-white focus:border-[#FF8A00] focus:outline-none">
            <option value="all">All Categories</option>
            <option value="material_science">Material Science</option>
            <option value="thermodynamics">Thermodynamics</option>
            <option value="aerodynamics">Aerodynamics</option>
            <option value="structural">Structural</option>
            <option value="electrical">Electrical</option>
            <option value="software">Software</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Document List */}
        <div className="lg:col-span-2">
          <DocumentList documents={filteredDocuments} />
        </div>

        {/* AI Chat Panel (toggleable) */}
        {showChat && (
          <div className="lg:col-span-1">
            <AIChatPanel />
          </div>
        )}

        {/* Document Detail (if selected) */}
        {selectedDocument && !showChat && (
          <div className="lg:col-span-1">
            <DocumentDetail document={selectedDocument} />
          </div>
        )}

        {/* Fallback – show parameters panel if no document selected and chat is closed */}
        {!selectedDocument && !showChat && (
          <div className="lg:col-span-1">
            <AnimatedCard className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={20} className="text-[#FFB300]" />
                <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
              </div>
              <p className="text-sm text-white/60">
                Click the <strong>"AI Assistant"</strong> button above to start chatting with your research library.
              </p>
              <p className="mt-2 text-sm text-white/40">
                You can ask questions about your documents, extract parameters, or generate project templates.
              </p>
            </AnimatedCard>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <DocumentUpload isOpen={showUpload} onClose={() => setShowUpload(false)} />
    </motion.div>
  );
}