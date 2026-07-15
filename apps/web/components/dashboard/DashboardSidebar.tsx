"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Lightbulb,
  Library,
  Calculator,
  FlaskConical,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Ideas Hub", href: "/dashboard/ideas", icon: <Lightbulb size={18} /> },
  { name: "Projects", href: "/dashboard/projects", icon: <FolderKanban size={18} /> },
  { name: "Research Library", href: "/dashboard/research", icon: <Library size={18} /> },
  { name: "Calculations", href: "/dashboard/calculations", icon: <Calculator size={18} /> },
  { name: "Prototype Lab", href: "/dashboard/prototype", icon: <FlaskConical size={18} /> },
  { name: "Community", href: "/dashboard/community", icon: <Users size={18} /> },
];

interface DashboardSidebarProps {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
}

// Widths matched exactly to DashboardShell's ml-[270px] / ml-[78px] — these
// two numbers must always agree, or the sidebar and main content drift
// apart (this was the cause of the overlap/misalignment bugs).
export default function DashboardSidebar({ expanded, setExpanded }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen
        bg-[#0B132B]/80 backdrop-blur-2xl border-r border-white/10
        flex flex-col
        transition-all duration-300 ease-in-out
        ${expanded ? "w-[270px]" : "w-[78px]"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00D2FF] to-[#FF6B00] font-bold text-black">
          E
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              title={expanded ? undefined : item.name}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2
                transition-all duration-200
                ${expanded ? "" : "justify-center"}
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {expanded && <span className="text-sm flex-1 truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`
            flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm
            text-white/60 hover:bg-white/5 hover:text-white transition
            ${expanded ? "" : "justify-center"}
          `}
        >
          {expanded ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          {expanded && "Collapse"}
        </button>
      </div>
    </aside>
  );
}