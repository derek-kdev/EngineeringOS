// apps/web/services/dashboard/admin.service.ts
// TODO: Replace with real API calls once Admin endpoints exist on the backend.

import type {
  AuditLogEntry,
  BillingSummary,
  Invoice,
  AIUsageSummary,
  OrgMember,
  PlatformAnalytics,
} from "@/types/dashboard/admin";

export async function getAuditLog(): Promise<AuditLogEntry[]> {
  return [];
}

export async function getBillingSummary(): Promise<BillingSummary> {
  return {
    plan: "free",
    seatsUsed: 0,
    seatsIncluded: 0,
    monthlyAmount: 0,
    currency: "USD",
    nextBillingDate: "",
    status: "inactive",
  };
}

export async function getInvoices(): Promise<Invoice[]> {
  return [];
}

export async function getAIUsageSummary(): Promise<AIUsageSummary> {
  return {
    totalRequestsThisMonth: 0,
    totalTokensThisMonth: 0,
    estimatedCost: 0,
    currency: "USD",
    byFeature: [],
    daily: [],
  };
}

export async function getMembers(): Promise<OrgMember[]> {
  return [];
}

export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  return {
    totalUsers: 0,
    activeUsers: 0,
    totalProjects: 0,
    totalEvents: 0,
    userGrowth: [],
    projectActivity: [],
    modules: [],
  };
}
