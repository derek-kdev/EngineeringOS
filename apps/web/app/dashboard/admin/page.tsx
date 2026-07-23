"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  FileClock,
  CreditCard,
  Sparkles,
  Users,
  BarChart3,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { isAdminRole } from "@/constants/dashboard/roles";

import AuditLogTable from "@/components/dashboard/admin/AuditLogTable";
import BillingPanel from "@/components/dashboard/admin/BillingPanel";
import AIUsagePanel from "@/components/dashboard/admin/AIUsagePanel";
import MembersPanel from "@/components/dashboard/admin/MembersPanel";
import PlatformAnalyticsPanel from "@/components/dashboard/admin/PlatformAnalyticsPanel";

import {
  getAuditLog,
  getBillingSummary,
  getInvoices,
  getAIUsageSummary,
  getMembers,
  getPlatformAnalytics,
} from "@/services/dashboard/admin.service";

import type {
  AuditLogEntry,
  BillingSummary,
  Invoice,
  AIUsageSummary,
  OrgMember,
  PlatformAnalytics,
} from "@/types/dashboard/admin";


type Tab =
  | "analytics"
  | "audit"
  | "billing"
  | "ai"
  | "members";


const TABS: {
  id: Tab;
  label: string;
  icon: typeof FileClock;
}[] = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    id: "audit",
    label: "Audit Log",
    icon: FileClock,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    id: "ai",
    label: "AI Usage",
    icon: Sparkles,
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
  },
];


export default function AdminPage() {

  const { user } = useAuth();

  const [tab, setTab] = useState<Tab>("analytics");


  const [auditLog, setAuditLog] =
    useState<AuditLogEntry[] | null>(null);

  const [billing, setBilling] =
    useState<BillingSummary | null>(null);

  const [invoices, setInvoices] =
    useState<Invoice[] | null>(null);

  const [aiUsage, setAiUsage] =
    useState<AIUsageSummary | null>(null);

  const [members, setMembers] =
    useState<OrgMember[] | null>(null);

  const [analytics, setAnalytics] =
    useState<PlatformAnalytics | null>(null);



  useEffect(() => {

    getAuditLog()
      .then(setAuditLog);

    getBillingSummary()
      .then(setBilling);

    getInvoices()
      .then(setInvoices);

    getAIUsageSummary()
      .then(setAiUsage);

    getMembers()
      .then(setMembers);

    getPlatformAnalytics()
      .then(setAnalytics);

  }, []);



  if (!isAdminRole(user?.role)) {

    return (

      <div className="flex h-[60vh] flex-col items-center justify-center text-center">

        <ShieldAlert
          size={32}
          className="mb-3 text-white/30"
        />

        <p className="text-white/70">
          You don't have access to this area.
        </p>

        <p className="mt-1 text-sm text-white/40">
          Admin or owner role required.
        </p>

      </div>

    );

  }



  return (

    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      transition={{
        duration: 0.5,
      }}

      className="space-y-6"

    >


      <div>

        <h1 className="text-xl font-bold text-white">
          Platform Administration
        </h1>


        <p className="mt-1 text-sm text-white/60">

          Manage organisation activity,
          platform analytics,
          billing,
          AI usage,
          and team administration.

        </p>

      </div>



      <div className="flex flex-wrap gap-2">

        {TABS.map((item) => {

          const Icon = item.icon;

          const active = tab === item.id;


          return (

            <button

              key={item.id}

              onClick={() => setTab(item.id)}

              className={`
                flex items-center gap-1.5
                rounded-full
                px-4 py-1.5
                text-sm
                font-medium
                transition

                ${
                  active
                    ? "bg-gradient-to-r from-[#00D2FF] to-[#FF6B00] text-[#0B132B]"
                    : "border border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                }
              `}

            >

              <Icon size={14} />

              {item.label}

            </button>

          );

        })}

      </div>



      {tab === "analytics" && (

        analytics

          ? (

            <PlatformAnalyticsPanel
              analytics={analytics}
            />

          )

          : (

            <PanelSkeleton />

          )

      )}



      {tab === "audit" && (

        auditLog

          ? (

            <AuditLogTable
              entries={auditLog}
            />

          )

          : (

            <PanelSkeleton />

          )

      )}



      {tab === "billing" && (

        billing && invoices

          ? (

            <BillingPanel

              summary={billing}

              invoices={invoices}

            />

          )

          : (

            <PanelSkeleton />

          )

      )}



      {tab === "ai" && (

        aiUsage

          ? (

            <AIUsagePanel

              summary={aiUsage}

            />

          )

          : (

            <PanelSkeleton />

          )

      )}



      {tab === "members" && (

        members

          ? (

            <MembersPanel

              members={members}

            />

          )

          : (

            <PanelSkeleton />

          )

      )}



    </motion.div>

  );

}



function PanelSkeleton() {

  return (

    <div className="animate-pulse space-y-3">

      <div className="h-20 rounded-2xl bg-white/5" />

      <div className="h-20 rounded-2xl bg-white/5" />

      <div className="h-20 rounded-2xl bg-white/5" />

    </div>

  );

}