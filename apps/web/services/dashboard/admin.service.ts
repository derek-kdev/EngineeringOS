// apps/web/services/dashboard/admin.service.ts

import type {
  AuditLogEntry,
  BillingSummary,
  Invoice,
  AIUsageSummary,
  OrgMember,
  PlatformAnalytics,
} from "@/types/dashboard/admin";




// ===============================
// AUDIT LOG
// ===============================

export async function getAuditLog(): Promise<AuditLogEntry[]> {

  return [

    {
      id: "log-1",
      action: "member.invited",
      actorName: "Kingsley",
      actorEmail: "kingsley@engineering.com",
      target: "sarah@engineering.com",
      timestamp: "2026-07-14T09:12:00Z",
      ipAddress: "102.89.44.10",
    },


    {
      id: "log-2",
      action: "project.created",
      actorName: "Sarah Chen",
      actorEmail: "sarah@engineering.com",
      target: "Mars Rover v2",
      timestamp: "2026-07-13T16:40:00Z",
    },


    {
      id: "log-3",
      action: "user.role_changed",
      actorName: "Kingsley",
      actorEmail: "kingsley@engineering.com",
      target: "michael@engineering.com → admin",
      timestamp: "2026-07-12T11:05:00Z",
      ipAddress: "102.89.44.10",
    },


    {
      id: "log-4",
      action: "billing.plan_changed",
      actorName: "Kingsley",
      actorEmail: "kingsley@engineering.com",
      target: "Team → Enterprise",
      timestamp: "2026-07-10T08:00:00Z",
    },


    {
      id: "log-5",
      action: "calculation.saved",
      actorName: "Michael Osei",
      actorEmail: "michael@engineering.com",
      target: "Beam Deflection — Arm Prototype v1",
      timestamp: "2026-07-09T14:22:00Z",
    },

  ];

}





// ===============================
// BILLING
// ===============================

export async function getBillingSummary(): Promise<BillingSummary> {

  return {

    plan: "enterprise",

    seatsUsed: 12,

    seatsIncluded: 25,

    monthlyAmount: 899,

    currency: "USD",

    nextBillingDate: "2026-08-01",

    status: "active",

  };

}





export async function getInvoices(): Promise<Invoice[]> {

  return [

    {
      id: "inv-1042",
      date: "2026-07-01",
      amount: 899,
      currency: "USD",
      status: "paid",
    },


    {
      id: "inv-1031",
      date: "2026-06-01",
      amount: 899,
      currency: "USD",
      status: "paid",
    },


    {
      id: "inv-1020",
      date: "2026-05-01",
      amount: 449,
      currency: "USD",
      status: "paid",
    },

  ];

}





// ===============================
// AI USAGE
// ===============================

export async function getAIUsageSummary(): Promise<AIUsageSummary> {

  return {

    totalRequestsThisMonth: 4218,

    totalTokensThisMonth: 3120400,

    estimatedCost: 62.4,

    currency: "USD",


    byFeature: [

      {
        feature: "Research parameter extraction",
        requests: 1840,
      },


      {
        feature: "Calculations AI assistant",
        requests: 1120,
      },


      {
        feature: "Idea suggestions",
        requests: 640,
      },


      {
        feature: "Community summarization",
        requests: 618,
      },

    ],


    daily: [

      {
        date: "07-08",
        requests: 480,
        tokensUsed: 355000,
      },


      {
        date: "07-09",
        requests: 512,
        tokensUsed: 372000,
      },


      {
        date: "07-10",
        requests: 460,
        tokensUsed: 340000,
      },


      {
        date: "07-11",
        requests: 601,
        tokensUsed: 410000,
      },


      {
        date: "07-12",
        requests: 588,
        tokensUsed: 398000,
      },


      {
        date: "07-13",
        requests: 720,
        tokensUsed: 520000,
      },


      {
        date: "07-14",
        requests: 857,
        tokensUsed: 610000,
      },

    ],

  };

}





// ===============================
// MEMBERS
// ===============================

export async function getMembers(): Promise<OrgMember[]> {

  return [

    {
      id: "m-1",
      name: "Kingsley",
      email: "kingsley@engineering.com",
      role: "owner",
      status: "active",
      joinedAt: "2026-01-10",
    },


    {
      id: "m-2",
      name: "Sarah Chen",
      email: "sarah@engineering.com",
      role: "admin",
      status: "active",
      joinedAt: "2026-02-03",
    },


    {
      id: "m-3",
      name: "Michael Osei",
      email: "michael@engineering.com",
      role: "member",
      status: "active",
      joinedAt: "2026-03-18",
    },


    {
      id: "m-4",
      name: "Emily Zhao",
      email: "emily@engineering.com",
      role: "member",
      status: "invited",
      joinedAt: "2026-07-12",
    },

  ];

}





// ===============================
// PLATFORM ANALYTICS
// Admin only
// ===============================

export async function getPlatformAnalytics(): Promise<PlatformAnalytics> {

  return {

    totalUsers: 12840,

    activeUsers: 8432,

    totalProjects: 3560,

    totalEvents: 184920,


    userGrowth: [

      {
        label: "Week 1",
        value: 720,
      },

      {
        label: "Week 2",
        value: 980,
      },

      {
        label: "Week 3",
        value: 1250,
      },

      {
        label: "Week 4",
        value: 1680,
      },


    ],



    projectActivity: [

      {
        label: "Week 1",
        value: 320,
      },


      {
        label: "Week 2",
        value: 540,
      },


      {
        label: "Week 3",
        value: 720,
      },


      {
        label: "Week 4",
        value: 980,
      },

    ],




    modules: [

      {
        name: "Simulation Engine",
        usage: 8420,
      },


      {
        name: "Engineering Calculations",
        usage: 12640,
      },


      {
        name: "Prototype Workspace",
        usage: 6340,
      },


      {
        name: "AI Engineering Assistant",
        usage: 4218,
      },


    ],

  };

}