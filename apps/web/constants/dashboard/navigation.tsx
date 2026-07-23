// apps/web/constants/dashboard/navigation.ts
"use client";

import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  Library,
  Calculator,
  FlaskConical,
  Users,
  ShieldCheck,
} from "lucide-react";
import type { Role } from "./roles";
import { ADMIN_ROLES } from "./roles";

export interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
  /** Omit for items visible to everyone; set to restrict by role. */
  roles?: Role[];
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Ideas Hub", href: "/dashboard/ideas", icon: <Lightbulb size={18} /> },
  { name: "Projects", href: "/dashboard/projects", icon: <FolderKanban size={18} /> },
  { name: "Research Library", href: "/dashboard/research", icon: <Library size={18} /> },
  { name: "Calculations", href: "/dashboard/calculations", icon: <Calculator size={18} /> },
  { name: "Prototype Lab", href: "/dashboard/prototype", icon: <FlaskConical size={18} /> },
  { name: "Community", href: "/dashboard/community", icon: <Users size={18} /> },
  { name: "Admin", href: "/dashboard/admin", icon: <ShieldCheck size={18} />, roles: ADMIN_ROLES },
];