// apps/web/components/Topbar.tsx
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/providers/auth.providers";
import { useUIStore } from "@/stores/ui";
import { Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import UniversalSearch from "@/components/ui/UniversalSearch";

const dropdowns: Record<string, string[]> = {
  Products: ["Engineering Design", "Simulation Suite", "AI Assistant", "Collaboration Tools"],
  Platform: ["Engineering Workspace", "Calculation Engine", "Knowledge Graph"],
  Solutions: ["Engineering Teams", "Research Labs", "Enterprise Systems"],
  Resources: ["Documentation", "Community", "Research Hub"],
};

export default function Topbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Determine if we are on a dashboard page (for shifting)
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  // Calculate left offset and width based on sidebar state (only on dashboard pages)
  const leftOffset = isDashboard ? (sidebarOpen ? "left-72" : "left-28") : "left-0";
  const widthOffset = isDashboard ? (sidebarOpen ? "calc(100% - 18rem)" : "calc(100% - 7rem)") : "100%";

  return (
    <header
      className={`
        fixed top-3 ${leftOffset} z-[9999] w-[${widthOffset}]
        transition-all duration-300
      `}
      style={{ width: widthOffset }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav
          className={`
            flex h-[68px] items-center justify-between gap-4
            rounded-2xl px-4
            transition-all duration-300
            bg-white/5 backdrop-blur-2xl
            border border-white/10
            hover:bg-white/8
            ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "shadow-[0_8px_32px_rgba(0,0,0,0.2)]"}
          `}
        >
          {/* ===== LEFT: Logo + Desktop Nav ===== */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/" className="group flex items-center gap-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] font-bold text-black transition-transform duration-300 group-hover:rotate-12 shadow-lg shadow-[#FF6200]/25">
                ⚙
              </div>
              <span className="text-base font-bold hidden sm:inline text-white">
                Engineering<span className="font-mono">OS</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-4 ml-2">
              {Object.keys(dropdowns).map((item) => (
                <div
                  key={item}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors duration-200 relative">
                    {item}
                    <span
                      className={`text-xs transition-transform duration-300 ${
                        activeDropdown === item ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full w-0" />
                  </button>

                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 top-8
                      w-80 rounded-2xl
                      border border-white/10
                      bg-white/10 backdrop-blur-2xl
                      p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                      transition-all duration-300 ease-out
                      ${activeDropdown === item ? "visible translate-y-0 opacity-100" : "invisible -translate-y-5 opacity-0"}
                    `}
                    style={{ pointerEvents: activeDropdown === item ? "auto" : "none" }}
                  >
                    {dropdowns[item].map((link) => (
                      <Link
                        key={link}
                        href="#"
                        className="block rounded-xl px-4 py-3 text-sm text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white hover:translate-x-1"
                        onClick={closeMobile}
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="#"
                className="text-sm text-white/80 hover:text-white transition-colors relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full w-0" />
              </Link>
            </div>
          </div>

          {/* ===== CENTER: Universal Search ===== */}
          <div className="flex-1 flex justify-center min-w-0">
            <UniversalSearch />
          </div>

          {/* ===== RIGHT: Actions ===== */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />

            {isLoggedIn ? (
              <>
                <button className="relative p-2 text-white/80 hover:text-white transition">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6200] text-xs font-bold text-white">
                    3
                  </span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full bg-white/10 p-1 pl-3 pr-2 border border-white/10 hover:border-white/30 transition"
                  >
                    <span className="text-sm font-medium text-white hidden sm:inline">{user?.name}</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black shadow-lg shadow-[#FF6200]/25">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <ChevronDown size={16} className="text-white/70" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                      <div className="px-3 py-2 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-white/60">{user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={16} /> Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={16} /> Workspace Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80 hover:text-white transition-all hover:border-white/40 hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-5 py-1.5 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] animate-pulse-once"
                >
                  Get Started
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-2xl text-white/80 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[76px] left-0 w-full bg-white/10 backdrop-blur-2xl p-6 text-white border-t border-white/10">
          {Object.entries(dropdowns).map(([category, links]) => (
            <div key={category} className="mb-4">
              <h3 className="mb-2 text-white font-semibold">{category}</h3>
              {links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="block py-2 text-white/80 hover:text-white transition"
                  onClick={closeMobile}
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="#"
            className="block py-2 text-white/80 hover:text-white transition"
            onClick={closeMobile}
          >
            Pricing
          </Link>
          {isLoggedIn ? (
            <>
              <hr className="my-4 border-white/10" />
              <button
                onClick={() => {
                  handleLogout();
                  closeMobile();
                }}
                className="block w-full rounded-xl bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <hr className="my-4 border-white/10" />
              <Link
                href="/signin"
                className="block py-2 text-white/80 hover:text-white transition"
                onClick={closeMobile}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="mt-2 block rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-3 text-center font-semibold text-black hover:shadow-[0_0_30px_rgba(255,138,0,0.3)] transition"
                onClick={closeMobile}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}