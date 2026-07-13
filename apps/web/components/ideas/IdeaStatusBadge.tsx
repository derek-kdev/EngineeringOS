// apps/web/components/ideas/IdeaStatusBadge.tsx
"use client";

import { IdeaStatus } from "@/types/ideas";

interface IdeaStatusBadgeProps {
  status: IdeaStatus;
}

const statusConfig: Record<IdeaStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "Draft", color: "text-zinc-400", bg: "bg-zinc-500/20" },
  under_review: { label: "Under Review", color: "text-amber-400", bg: "bg-amber-500/20" },
  planned: { label: "Planned", color: "text-blue-400", bg: "bg-blue-500/20" },
  in_progress: { label: "In Progress", color: "text-emerald-400", bg: "bg-emerald-500/20" },
  implemented: { label: "Implemented", color: "text-green-400", bg: "bg-green-500/20" },
  archived: { label: "Archived", color: "text-zinc-500", bg: "bg-zinc-500/20" },
};

export default function IdeaStatusBadge({ status }: IdeaStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`rounded-full ${config.bg} px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}