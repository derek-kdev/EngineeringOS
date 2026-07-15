"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

// This header is `fixed`. DashboardShell already applies pt-20 to <main>,
// which correctly clears this bar's height (~64px) + its top-4 offset —
// no extra clearance needed elsewhere.
interface DashboardTopbarProps {
  expanded: boolean;
}

export default function DashboardTopbar({ expanded }: DashboardTopbarProps) {
  const { user, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [visible, setVisible] = useState(true);

  // A ref instead of state for the scroll position: the previous version
  // tracked lastScroll via useState and listed it in the effect's
  // dependency array, which tore down and re-registered the scroll
  // listener on every single scroll tick. A ref lets the handler read/write
  // the last position without triggering re-renders or effect re-runs.
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScroll.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > lastScroll.current && current > 80) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        lastScroll.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className={`
        fixed
        top-4
        right-4
        z-40
        rounded-2xl
        border
        border-white/10
        bg-[#0B132B]/60
        backdrop-blur-2xl
        px-5
        py-3
        text-white
        transition-all
        duration-300
        ${expanded ? "left-[286px]" : "left-[94px]"}
      `}
    >
      <div className="flex items-center justify-between gap-6">
        {/* LEFT GREETING */}
        <div className="flex-1 hidden lg:block">
          <p className="text-sm text-white/50">Welcome back,</p>
          <h2 className="text-sm font-semibold">
            {user?.firstName || "Engineer"}
            <span className="text-[#FF6B00]"> 👋</span>
          </h2>
        </div>

        {/* SEARCH */}
        <div className="flex-[1.5]">
          <div className="relative group">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00D2FF]"
            />
            <input
              placeholder="Search projects, papers, prototypes..."
              className="
                w-full rounded-xl bg-white/[0.03] pl-10 pr-16 py-2.5
                text-sm text-white placeholder:text-white/30
                outline-none transition
                focus:bg-white/[0.06] focus:ring-1 focus:ring-[#00D2FF]/40
              "
            />
            <span
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                rounded-md bg-white/5 px-2 py-1
                text-[10px] text-white/40
              "
            >
              Ctrl K
            </span>
          </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex flex-1 justify-end items-center gap-5">
          <button className="relative text-white/60 transition hover:text-[#00D2FF]">
            <Bell size={20} />
            <span
              className="
                absolute -right-2 -top-2
                flex h-4 w-4 items-center justify-center
                rounded-full bg-[#FF6B00]
                text-[10px] text-black
              "
            >
              3
            </span>
          </button>

          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2">
              <div
                className="
                  h-9 w-9 rounded-full
                  bg-gradient-to-br from-[#FF6B00] to-[#FFB300]
                  flex items-center justify-center
                  font-bold text-black
                "
              >
                {user?.firstName?.charAt(0) || "E"}
              </div>
              <ChevronDown size={16} />
            </button>

            {showMenu && (
              <div
                className="
                  absolute right-0 mt-3 w-56
                  rounded-xl border border-white/10
                  bg-[#0B132B] p-4 shadow-xl
                "
              >
                <p className="font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-white/40">{user?.email}</p>
                <button
                  onClick={logout}
                  className="mt-4 text-sm text-white/60 hover:text-[#00D2FF]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}