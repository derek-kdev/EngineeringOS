// apps/web/components/research/DocumentList.tsx
"use client";

import { useResearchStore } from "@/stores/research";
import { ResearchDocument } from "@/types/research";
import { FileText, User, Calendar, Tag, ChevronRight, Trash2 } from "lucide-react";

interface DocumentListProps {
  documents: ResearchDocument[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  const { fetchDocumentById, deleteDocument, selectedDocument } = useResearchStore();

  if (documents.length === 0) {
    return (
      <div className="rounded-2xl border border-[#FF6200]/20 bg-[#111111]/80 p-12 text-center backdrop-blur-xl">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-medium text-white">No documents yet</h3>
        <p className="mt-2 text-sm text-white/60">Upload your first research document to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`group rounded-xl border p-4 transition-all cursor-pointer ${
            selectedDocument?.id === doc.id
              ? "border-[#FF8A00] bg-[#FF6200]/10"
              : "border-[#FF6200]/20 bg-[#111111]/80 hover:border-[#FF8A00]/40"
          }`}
          onClick={() => fetchDocumentById(doc.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#FFB300]" />
                <h4 className="text-sm font-medium text-white truncate">{doc.title}</h4>
                {doc.isProcessing && (
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    Processing...
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-white/60 line-clamp-2">{doc.abstract}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/40">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {doc.authors.join(", ")}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={12} />
                  {doc.tags.slice(0, 3).join(", ")}
                  {doc.tags.length > 3 && ` +${doc.tags.length - 3}`}
                </span>
                <span className="text-[#FFB300]">⭐ {doc.citations} citations</span>
                <span className="text-white/30">•</span>
                <span className="text-white/30">{doc.extractedParams.length} parameters</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Delete this document?")) deleteDocument(doc.id);
                }}
                className="rounded-lg p-1.5 text-white/30 hover:bg-red-500/10 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
              <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 transition" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}