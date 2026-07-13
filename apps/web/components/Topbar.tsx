// apps/web/components/Topbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/providers/auth.providers";
import { Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import UniversalSearch from "@/components/ui/UniversalSearch";

export default function Topbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        setScrolled(currentY > 20);

        // Ignore tiny jitters; only react once scroll passes a small threshold
        if (Math.abs(delta) > 4) {
          if (delta > 0 && currentY > 80) {
            setHidden(true); // scrolling down -> fade/slide up out of view
          } else if (delta < 0) {
            setHidden(false); // scrolling up -> slide/fade back in
          }
          lastScrollY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`
        fixed top-3 left-64 right-3 z-[9999]
        transition-all duration-500 ease-in-out will-change-transform
        ${hidden ? "-translate-y-24 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}
      `}
    >
      <nav
        className={`
          grid grid-cols-3 h-16 items-center gap-4
          rounded-2xl pl-5 pr-2
          transition-all duration-300
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          hover:bg-white/8
          ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "shadow-[0_8px_32px_rgba(0,0,0,0.2)]"}
        `}
      >
        {/* ===== Welcome (static, always visible) ===== */}
        <div className="flex items-center overflow-hidden">
          <span className="text-base font-semibold text-white whitespace-nowrap">
            Welcome back, <span className="text-[#FF6200]">{user?.name || "Kingsley"}</span> 👋
          </span>
        </div>

        {/* ===== Search (centered, always fully expanded) ===== */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <UniversalSearch />
          </div>
        </div>

        {/* ===== Right actions ===== */}
        <div className="flex items-center justify-end gap-1.5 flex-shrink-0">
          {isLoggedIn ? (
            <>
              <button className="relative p-2 text-white/80 hover:text-white transition">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6200] text-[10px] font-bold text-white">
                  3
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 p-1 pl-2 pr-1.5 border border-white/10 hover:border-white/30 transition"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-xs font-bold text-black shadow-lg shadow-[#FF6200]/25">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <ChevronDown size={14} className="text-white/70" />
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
        </div>
      </nav>
    </header>
  );
}