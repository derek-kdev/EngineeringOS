"use client";

import type { ReactNode } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  Library,
  Calculator,
  Users,
  ShieldCheck,
  Box,
  Cpu,
  Database,
  Bot,
  Layers3,
} from "lucide-react";

import type { Role } from "./roles";
import { ADMIN_ROLES } from "./roles";


export interface NavItem {

  name: string;

  href: string;

  icon: ReactNode;

  roles?: Role[];

}



export interface NavGroup {

  name: string;

  items: NavItem[];

}



export const NAV_GROUPS: NavGroup[] = [

  {
    name: "Workspace",

    items: [

      {
        name: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard size={16}/>
      },


      {
        name: "Projects",
        href: "/dashboard/projects",
        icon: <FolderKanban size={16}/>
      },


      {
        name: "Ideas Hub",
        href: "/dashboard/ideas",
        icon: <Lightbulb size={16}/>
      },

    ],
  },


  {
    name: "Engineering",

    items: [

      {
        name: "CAD Workspace",
        href: "/dashboard/cad",
        icon: <Box size={16}/>
      },


      {
        name: "Simulation Engine",
        href: "/dashboard/simulation",
        icon: <Cpu size={16}/>
      },


      {
        name: "Materials Database",
        href: "/dashboard/materials",
        icon: <Database size={16}/>
      },


      {
        name: "AI Engineering Assistant",
        href: "/dashboard/ai-engineering",
        icon: <Bot size={16}/>
      },


      {
        name: "Prototype",
        href: "/dashboard/prototype",
        icon: <Layers3 size={16}/>
      },

    ],
  },


  {
    name: "Research",

    items: [

      {
        name: "Research Library",
        href: "/dashboard/research",
        icon: <Library size={16}/>
      },


      {
        name: "Calculations",
        href: "/dashboard/calculations",
        icon: <Calculator size={16}/>
      },

    ],
  },


  {
    name: "Community",

    items: [

      {
        name: "Community",
        href: "/dashboard/community",
        icon: <Users size={16}/>
      },


      {
        name: "Organisations",
        href: "/dashboard/community/organisations",
        icon: <Users size={16}/>
      },

    ],
  },


  {
    name: "Administration",

    items: [

      {
        name: "Admin",
        href: "/dashboard/admin",
        icon: <ShieldCheck size={16}/>,
        roles: ADMIN_ROLES,
      },

    ],
  },


];



export const NAV_ITEMS: NavItem[] =
  NAV_GROUPS.flatMap(
    group => group.items
  );
