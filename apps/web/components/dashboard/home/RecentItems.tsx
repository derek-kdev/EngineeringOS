"use client";

import Link from "next/link";
import { FolderKanban, FlaskConical, Play, Calculator, Wrench } from "lucide-react";
import type { RecentItem, RecentItemType } from "@/types/dashboard/home";

const TYPE_ICON: Record<RecentItemType, typeof FolderKanban> = {
  project: FolderKanban,
  research: FlaskConical,
  simulation: Play,
  calculation: Calculator,
  prototype: Wrench,
};

const TYPE_COLOR: Record<RecentItemType, string> = {
  project: "text-[#00D2FF]",
  research: "text-[#0284C7]",
  simulation: "text-[#FF6B00]",
  calculation: "text-emerald-400",
  prototype: "text-amber-400",
};

export default function RecentItems({ items }: { items: RecentItem[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">Recent</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-white/40">
          Nothing here yet — start a project, research entry, or simulation above.
        </p>
      ) : (
        <div className="mt-4 space-y-2.5">
          {items.map((item) => {
            const Icon = TYPE_ICON[item.type];
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex w-fit items-center gap-2.5 group"
              >
                <Icon size={15} className={`flex-shrink-0 ${TYPE_COLOR[item.type]}`} />
                <span className="text-sm text-[#00D2FF] group-hover:underline">{item.title}</span>
                <span className="text-xs text-white/30">{item.subtitle}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
