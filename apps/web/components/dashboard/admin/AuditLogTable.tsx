"use client";

import { ShieldAlert, LogIn, FolderPlus, Trash2, UserCog, UserPlus, UserMinus, Calculator, CreditCard } from "lucide-react";
import type { AuditAction, AuditLogEntry } from "@/types/dashboard/admin";

const ACTION_ICON: Record<AuditAction, typeof LogIn> = {
  "user.login": LogIn,
  "user.role_changed": UserCog,
  "project.created": FolderPlus,
  "project.deleted": Trash2,
  "calculation.saved": Calculator,
  "member.invited": UserPlus,
  "member.removed": UserMinus,
  "billing.plan_changed": CreditCard,
};

const ACTION_LABEL: Record<AuditAction, string> = {
  "user.login": "Signed in",
  "user.role_changed": "Role changed",
  "project.created": "Project created",
  "project.deleted": "Project deleted",
  "calculation.saved": "Calculation saved",
  "member.invited": "Member invited",
  "member.removed": "Member removed",
  "billing.plan_changed": "Billing plan changed",
};

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuditLogTable({ entries }: { entries: AuditLogEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-white/50">
        <ShieldAlert size={22} className="mx-auto mb-2 text-white/30" />
        No audit activity yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="divide-y divide-white/5">
        {entries.map((entry) => {
          const Icon = ACTION_ICON[entry.action];
          return (
            <div key={entry.id} className="flex items-start gap-3 px-4 py-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#00D2FF]/10 text-[#00D2FF]">
                <Icon size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm font-medium text-white">{ACTION_LABEL[entry.action]}</span>
                  <span className="text-xs text-white/40">by {entry.actorName}</span>
                </div>
                {entry.target && (
                  <p className="mt-0.5 truncate text-xs text-white/50">{entry.target}</p>
                )}
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-white/40">{formatTimestamp(entry.timestamp)}</p>
                {entry.ipAddress && (
                  <p className="text-[11px] text-white/25">{entry.ipAddress}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
