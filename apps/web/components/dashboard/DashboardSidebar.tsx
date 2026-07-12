// apps/web/components/dashboard/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/ui";
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

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={`
        fixed left-3 top-[78px] z-40 h-[calc(100vh-90px)]
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        rounded-2xl
        transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-20"}
        shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        flex flex-col
      `}
    >
      {/* Logo area */}
      <div className="flex h-14 items-center px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] font-bold text-black">
            ⚙
          </div>
          {sidebarOpen && (
            <span className="text-base font-bold text-white">
              Engineering<span className="font-mono">OS</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-xl px-3 py-2.5
                transition-all duration-200
                ${isActive 
                  ? "bg-white/10 border-l-2 border-white" 
                  : "hover:bg-white/5"
                }
                ${!sidebarOpen && "justify-center"}
              `}
            >
              <span className={`${isActive ? "text-white" : "text-white/70"}`}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <div className="flex flex-1 items-center justify-between">
                  <span className={`text-sm ${isActive ? "text-white" : "text-white/80"}`}>
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/80">
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
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 border border-white/10 text-white/80 hover:bg-white/30 transition"
      >
        {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* User Profile */}
      <div className="border-t border-white/10 p-4">
        <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black">
            K
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Kingsley</p>
              <p className="text-xs text-white/60 truncate">Lead Engineer</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}