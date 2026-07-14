// apps/web/components/ui/AvatarDropdown.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, Plug, CreditCard, LogOut, ChevronDown } from "lucide-react";

interface AvatarUser {
  name?: string;
  email?: string;
  role?: string; // e.g. "admin" | "engineer" | "viewer"
}

interface AvatarDropdownProps {
  user?: AvatarUser | null;
  onLogout: () => void;
}

export default function AvatarDropdown({ user, onLogout }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin" || role === "workspace admin";
  const roleLabel = user?.role || "Engineer";

  // Click outside closes the panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape closes the panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleItemClick = () => setIsOpen(false);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white/10 p-1 pl-2.5 pr-2 border border-white/10 hover:border-white/30 transition"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black shadow-lg shadow-[#FF6200]/25">
          {user?.name?.charAt(0) || "U"}
        </div>
        <span className="hidden sm:inline text-sm font-medium text-white">{user?.name}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-white/70" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* User header */}
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-medium text-white">{user?.name}</p>
                  <span className="flex-shrink-0 rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">
                    {roleLabel}
                  </span>
                </div>
                {user?.email && <p className="truncate text-xs text-white/40">{user.email}</p>}
              </div>
            </div>

            <div className="my-1 border-t border-white/10" />

            {/* Account section */}
            <Link
              href="/dashboard/profile"
              onClick={handleItemClick}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <User size={16} /> Profile
            </Link>

            {/* Workspace section (admin only) */}
            {isAdmin && (
              <>
                <div className="my-1 border-t border-white/10" />
                <Link
                  href="/dashboard/settings"
                  onClick={handleItemClick}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                >
                  <Settings size={16} /> Workspace Settings
                </Link>
                <Link
                  href="/dashboard/integrations"
                  onClick={handleItemClick}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                >
                  <Plug size={16} /> Integrations
                </Link>
                <Link
                  href="/dashboard/billing"
                  onClick={handleItemClick}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                >
                  <CreditCard size={16} /> Billing
                </Link>
              </>
            )}

            <div className="my-1 border-t border-white/10" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}