"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  Library,
  FlaskConical,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Projects", href: "/dashboard/projects", icon: <FolderKanban size={20} />, badge: "6" },
  { name: "Ideas Hub", href: "/dashboard/ideas", icon: <Lightbulb size={20} />, badge: "3" },
  { name: "Research Library", href: "/dashboard/research", icon: <Library size={20} />, badge: "24" },
  { name: "Prototype Lab", href: "/dashboard/prototypes", icon: <FlaskConical size={20} />, badge: "18" },
  { name: "Community", href: "/dashboard/community", icon: <Users size={20} /> },
  { name: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
];

export default function DashboardSidebar({ 
  isOpen, 
  onToggle 
}: { 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-full
        bg-[#111111]/95 backdrop-blur-xl
        border-r border-[#FF6200]/20
        transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-between px-4 border-b border-[#FF6200]/20">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] font-bold text-black">
            ⚙
          </div>
          {isOpen && (
            <span className="text-lg font-bold text-white">
              Engineering<span className="font-mono">OS</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3
                transition-all duration-200
                ${isActive 
                  ? "bg-gradient-to-r from-[#FF6200]/20 to-[#FFB300]/10 border border-[#FF6200]/30" 
                  : "hover:bg-[#FF6200]/10"
                }
                ${!isOpen && "justify-center"}
              `}
            >
              <span className={isActive ? "text-[#FFB300]" : "text-zinc-400"}>
                {item.icon}
              </span>
              {isOpen && (
                <div className="flex flex-1 items-center justify-between">
                  <span className={`text-sm ${isActive ? "text-white" : "text-zinc-400"}`}>
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-[#FF6200]/20 px-2 py-0.5 text-xs text-[#FFB300]">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-24 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6200] text-black shadow-lg shadow-[#FF6200]/30"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#FF6200]/20 p-4">
        <div className={`flex items-center gap-3 ${!isOpen && "justify-center"}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black">
            K
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Kingsley</p>
              <p className="text-xs text-zinc-500">Lead Engineer</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}