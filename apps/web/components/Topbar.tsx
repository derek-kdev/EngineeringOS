// apps/web/components/Topbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/providers/auth.providers";
import { Bell } from "lucide-react";
import UniversalSearch from "@/components/ui/UniversalSearch";
import AvatarDropdown from "@/components/ui/AvatarDropdown";

export default function Topbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isDev = process.env.NODE_ENV === "development";

  // Fetch pending join requests count – silent fallback
  const fetchPendingCount = async () => {
    if (!isLoggedIn) return;
    try {
      const response = await fetch("/api/requests/pending/count");
      if (!response.ok) throw new Error("API not ready");
      const data = await response.json();
      setPendingRequestsCount(data.count || 0);
    } catch {
      // Silently fallback to 0 – API not yet implemented
      setPendingRequestsCount(0);
      // Optional: only log in development for debugging
      if (isDev) {
        console.info("⚠️ Join requests API not available – using fallback 0");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPendingCount();
      // Poll every 30 seconds (only if API is ready)
      const interval = setInterval(fetchPendingCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  // Scroll hide/show (unchanged)
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        setScrolled(currentY > 20);

        if (Math.abs(delta) > 4) {
          if (delta > 0 && currentY > 80) {
            setHidden(true);
          } else if (delta < 0) {
            setHidden(false);
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
        {/* ===== Left: Welcome / Brand ===== */}
        <div className="flex items-center overflow-hidden">
          {isLoggedIn && user?.name ? (
            <span className="text-base font-semibold text-white whitespace-nowrap">
              Welcome back, <span className="text-[#FF6200]">{user.name}</span> 👋
            </span>
          ) : (
            <span className="text-base font-semibold text-white whitespace-nowrap">
              Engineering<span className="text-[#FF6200]">OS</span>
            </span>
          )}
        </div>

        {/* ===== Center: Search ===== */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <UniversalSearch />
          </div>
        </div>

        {/* ===== Right: Actions ===== */}
        <div className="flex items-center justify-end gap-1.5 flex-shrink-0">
          {isLoggedIn ? (
            <>
              <button className="relative p-2 text-white/80 hover:text-white transition">
                <Bell size={18} />
                {pendingRequestsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 min-w-[1rem] items-center justify-center rounded-full bg-[#FF6200] text-[10px] font-bold text-white px-0.5">
                    {pendingRequestsCount > 99 ? "99+" : pendingRequestsCount}
                  </span>
                )}
              </button>
              <AvatarDropdown user={user} onLogout={handleLogout} />
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