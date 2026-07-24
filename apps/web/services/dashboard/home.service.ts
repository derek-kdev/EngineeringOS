// apps/web/services/dashboard/home.service.ts
// TODO: replace with real calls once Projects/Research/Prototype/Calculation
// endpoints exist on the backend (confirmed absent from Swagger as of this
// writing — only Users, Auth, and Organizations exist). Hrefs below assume
// a /dashboard/{type}/{id} detail route per domain; confirm those routes
// actually exist before relying on deep-linking working end to end.

import type { RecentItem } from "@/types/dashboard/home";

export async function getRecentItems(): Promise<RecentItem[]> {
  return [
    {
      id: "proj-1",
      type: "project",
      title: "Mars Rover v2",
      subtitle: "Project · 72% progress",
      href: "/dashboard/projects/proj-1",
      updatedAt: "2 hours ago",
    },
    {
      id: "res-1",
      type: "research",
      title: "Thermal Analysis of Composite Materials",
      subtitle: "Research · PDF, 24 pages",
      href: "/dashboard/research/res-1",
      updatedAt: "5 hours ago",
    },
    {
      id: "sim-1",
      type: "simulation",
      title: "Stress Test — Arm Prototype v1",
      subtitle: "Simulation · Completed",
      href: "/dashboard/prototype/sim-1",
      updatedAt: "1 day ago",
    },
    {
      id: "calc-1",
      type: "calculation",
      title: "Beam Deflection",
      subtitle: "Calculation · 2.08 mm",
      href: "/dashboard/calculations",
      updatedAt: "2 days ago",
    },
    {
      id: "proto-1",
      type: "prototype",
      title: "Sensor Array — Rev C",
      subtitle: "Prototype · In testing",
      href: "/dashboard/prototype/proto-1",
      updatedAt: "3 days ago",
    },
    {
      id: "proj-2",
      type: "project",
      title: "Sensor Array",
      subtitle: "Project · Completed",
      href: "/dashboard/projects/proj-2",
      updatedAt: "1 week ago",
    },
  ];
}