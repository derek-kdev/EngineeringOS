"use client";

import { Download, CreditCard } from "lucide-react";
import type { BillingSummary, Invoice } from "@/types/dashboard/admin";

const PLAN_LABEL: Record<BillingSummary["plan"], string> = {
  free: "Free",
  team: "Team",
  enterprise: "Enterprise",
};

const STATUS_STYLE: Record<Invoice["status"], string> = {
  paid: "text-emerald-400 bg-emerald-400/10",
  pending: "text-amber-400 bg-amber-400/10",
  failed: "text-red-400 bg-red-400/10",
};

export default function BillingPanel({
  summary,
  invoices,
}: {
  summary: BillingSummary;
  invoices: Invoice[];
}) {
  const seatPct = Math.round((summary.seatsUsed / summary.seatsIncluded) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 text-white/50">
            <CreditCard size={14} />
            <span className="text-xs">Current Plan</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{PLAN_LABEL[summary.plan]}</p>
          <p className="mt-1 text-xs text-white/40">
            ${summary.monthlyAmount}/mo · renews {summary.nextBillingDate}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <span className="text-xs text-white/50">Seats Used</span>
          <p className="mt-2 text-2xl font-bold text-white">
            {summary.seatsUsed}
            <span className="text-base font-normal text-white/40"> / {summary.seatsIncluded}</span>
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00D2FF] to-[#FF6B00]"
              style={{ width: `${seatPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <span className="text-xs text-white/50">Status</span>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-white">
            <span
              className={`h-2 w-2 rounded-full ${
                summary.status === "active" ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {summary.status === "active" ? "Active" : summary.status === "past_due" ? "Past Due" : "Canceled"}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-white">
          Invoice History
        </div>
        <div className="divide-y divide-white/5">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm text-white">{inv.id}</p>
                <p className="text-xs text-white/40">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/80">
                  ${inv.amount} {inv.currency}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs ${STATUS_STYLE[inv.status]}`}>
                  {inv.status}
                </span>
                <button className="text-white/40 transition hover:text-white" title="Download">
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
