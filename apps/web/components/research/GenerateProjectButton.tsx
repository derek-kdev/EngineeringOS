// apps/web/components/research/GenerateProjectButton.tsx
"use client";

import { useState } from "react";
import { useResearchStore } from "@/stores/research";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";

interface GenerateProjectButtonProps {
  documentId: string;
}

export default function GenerateProjectButton({ documentId }: GenerateProjectButtonProps) {
  const { generateProject, documents } = useResearchStore();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doc = documents.find((d) => d.id === documentId);
  const hasParams = doc && doc.extractedParams.length > 0;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const projectData = generateProject(documentId);
      if (!projectData) {
        setError("No parameters found to generate a project. Try uploading more research.");
        setIsGenerating(false);
        return;
      }

      // Simulate API call to create project
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to projects page
      router.push("/dashboard/projects");
    } catch (err) {
      setError("Failed to generate project. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGenerate}
        disabled={!hasParams || isGenerating}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <><Loader2 size={16} className="animate-spin" /> Generating...</>
        ) : (
          <><Sparkles size={16} /> Generate Project from Research</>
        )}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      {!hasParams && !isGenerating && (
        <p className="mt-1 text-xs text-amber-400">⚠️ No parameters extracted. Upload a research document first.</p>
      )}
    </div>
  );
}