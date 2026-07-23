// apps/web/types/dashboard/admin.ts


export type AuditAction =
  | "user.login"
  | "user.role_changed"
  | "project.created"
  | "project.deleted"
  | "calculation.saved"
  | "member.invited"
  | "member.removed"
  | "billing.plan_changed";



export interface AuditLogEntry {

  id: string;

  action: AuditAction;

  actorName: string;

  actorEmail: string;

  target?: string;

  timestamp: string;

  ipAddress?: string;

}





export type PlanTier =
  | "free"
  | "team"
  | "enterprise";



export interface BillingSummary {

  plan: PlanTier;

  seatsUsed: number;

  seatsIncluded: number;

  monthlyAmount: number;

  currency: string;

  nextBillingDate: string;

  status:
    | "active"
    | "past_due"
    | "canceled";

}





export interface Invoice {

  id: string;

  date: string;

  amount: number;

  currency: string;

  status:
    | "paid"
    | "pending"
    | "failed";

  downloadUrl?: string;

}





export interface AIUsageMetric {

  date: string;

  requests: number;

  tokensUsed: number;

}





export interface AIUsageSummary {

  totalRequestsThisMonth: number;

  totalTokensThisMonth: number;

  estimatedCost: number;

  currency: string;


  byFeature: {

    feature: string;

    requests: number;

  }[];



  daily: AIUsageMetric[];

}





export type MemberRole =
  | "owner"
  | "admin"
  | "member";



export interface OrgMember {

  id: string;

  name: string;

  email: string;

  role: MemberRole;

  status:
    | "active"
    | "invited"
    | "suspended";

  joinedAt: string;

}





// ===============================
// PLATFORM ANALYTICS
// Admin only
// ===============================


export interface AnalyticsPoint {

  label: string;

  value: number;

}





export interface AnalyticsModuleUsage {

  name: string;

  usage: number;

}





export interface PlatformAnalytics {


  totalUsers: number;


  activeUsers: number;


  totalProjects: number;


  totalEvents: number;



  userGrowth: AnalyticsPoint[];



  projectActivity: AnalyticsPoint[];



  modules: AnalyticsModuleUsage[];


}