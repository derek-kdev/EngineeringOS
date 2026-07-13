// apps/web/components/research/ExtractedParamsDisplay.tsx
"use client";

import { ExtractedParameter } from "@/types/research";
import { useResearchStore } from "@/stores/research";
import { Check, X, Sparkles } from "lucide-react";

interface ExtractedParamsDisplayProps {
  documentId: string;
  parameters: ExtractedParameter[];
}

export default function ExtractedParamsDisplay({ documentId, parameters }: ExtractedParamsDisplayProps) {
  const { verifyParameter } = useResearchStore();

  if (parameters.length === 0) {
    return (
      <div className="rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F]/50 p-3 text-center">
        <Sparkles size={16} className="mx-auto text-[#FFB300] animate-pulse" />
        <p className="mt-1 text-xs text-white/40">AI extraction in progress...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Sparkles size={14} className="text-[#FFB300]" />
        <h5 className="text-xs font-medium text-white">Extracted Parameters</h5>
        <span className="text-[10px] text-white/30">(AI suggested)</span>
      </div>
      <div className="space-y-1.5">
        {parameters.map((param) => (
          <div
            key={param.id}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
              param.verified
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-[#FF6200]/20 bg-[#1F1F1F]/50"
            }`}
          >
            <div className="flex-1">
              <span className="font-medium text-white">{param.name}</span>
              <span className="ml-2 text-white/80">
                {param.value} {param.unit || ""}
              </span>
              <span className="ml-2 text-white/30">
                • confidence {(param.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              {param.verified ? (
                <span className="text-emerald-400">✅ Verified</span>
              ) : (
                <button
                  onClick={() => verifyParameter(documentId, param.id)}
                  className="rounded p-1 text-white/30 hover:bg-emerald-500/20 hover:text-emerald-400 transition"
                  title="Verify parameter"
                >
                  <Check size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}