// apps/web/components/research/DocumentDetail.tsx
"use client";

import { ResearchDocument } from "@/types/research";
import { FileText, User, Calendar, Tag, ExternalLink, Sparkles } from "lucide-react";
import ExtractedParamsDisplay from "./ExtractedParamsDisplay";
import GenerateProjectButton from "./GenerateProjectButton";

interface DocumentDetailProps {
  document: ResearchDocument;
}

export default function DocumentDetail({ document }: DocumentDetailProps) {
  return (
    <div className="rounded-xl border border-[#FF6200]/20 bg-[#111111]/80 p-6 backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <FileText size={20} className="text-[#FFB300] mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white">{document.title}</h4>
          <p className="text-xs text-white/40">{document.authors.join(", ")}</p>
        </div>
      </div>

      <div className="mt-3 text-sm text-white/60 leading-relaxed">
        {document.abstract}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {document.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#FF6200]/10 px-2 py-0.5 text-xs text-[#FFB300]">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/40">
        <span>📄 {document.fileName}</span>
        <span>📅 {new Date(document.uploadedAt).toLocaleDateString()}</span>
        <span>⭐ {document.citations} citations</span>
      </div>

      {/* Extracted Parameters */}
      <div className="mt-4">
        <ExtractedParamsDisplay documentId={document.id} parameters={document.extractedParams} />
      </div>

      {/* Generate Project Button */}
      <div className="mt-4">
        <GenerateProjectButton documentId={document.id} />
      </div>

      {/* Linked Items */}
      <div className="mt-4 pt-4 border-t border-[#FF6200]/10">
        <div className="flex flex-wrap gap-4 text-xs">
          {document.linkedProjects.length > 0 && (
            <div>
              <span className="text-white/40">Linked Projects:</span>
              <span className="ml-2 text-white/60">{document.linkedProjects.join(", ")}</span>
            </div>
          )}
          {document.linkedPrototypes.length > 0 && (
            <div>
              <span className="text-white/40">Linked Prototypes:</span>
              <span className="ml-2 text-white/60">{document.linkedPrototypes.join(", ")}</span>
            </div>
          )}
          {document.linkedProjects.length === 0 && document.linkedPrototypes.length === 0 && (
            <span className="text-white/30 text-xs">No linked projects or prototypes yet</span>
          )}
        </div>
      </div>
    </div>
  );
}