// apps/web/components/dashboard/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  Library,
  FlaskConical,
  Users,
  Plus,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Ideas Hub", href: "/dashboard/ideas", icon: <Lightbulb size={18} />, badge: "3" },
  { name: "Projects", href: "/dashboard/projects", icon: <FolderKanban size={18} />, badge: "6" },
  { name: "Research Library", href: "/dashboard/research", icon: <Library size={18} />, badge: "24" },
  { name: "Prototype Lab", href: "/dashboard/prototypes", icon: <FlaskConical size={18} />, badge: "18" },
  { name: "Community", href: "/dashboard/community", icon: <Users size={18} /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col">
      {/* Logo – using Pinterest image */}
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden shadow-lg shadow-[#FF6200]/25">
          <img
            src="https://i.pinimg.com/1200x/0b/66/55/0b66550f4aaba065fc955f37fd631a7a.jpg"
            alt="EngineeringOS"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* New Idea Button – Orange plate color */}
      <div className="px-3 py-3">
        <button className="flex w-full items-center gap-2 rounded-lg bg-[#FF6200]/20 px-3 py-2 text-sm text-[#FFB300] hover:bg-[#FF6200]/30 transition border border-[#FF6200]/30">
          <Plus size={16} /> New Idea
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2
                transition-all duration-200
                ${isActive 
                  ? "bg-white/10 text-white" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span className={isActive ? "text-white" : "text-white/70"}>
                {item.icon}
              </span>
              <span className="text-sm flex-1">{item.name}</span>
              {item.badge && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/80">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black">
            K
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Kingsley</p>
            <p className="text-xs text-white/60 truncate">Lead Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}