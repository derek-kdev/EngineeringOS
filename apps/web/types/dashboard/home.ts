// apps/web/types/dashboard/home.ts

export type RecentItemType = "project" | "research" | "simulation" | "prototype" | "calculation";

export interface RecentItem {
  id: string;
  type: RecentItemType;
  title: string;
  subtitle: string;
  href: string;
  updatedAt: string;
}
