// apps/web/components/LandingTopbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },   // ✅ Changed from "Plans" to "Pricing"
];

export default function LandingTopbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-[9999] w-full max-w-3xl -translate-x-1/2 px-4">
      <nav
        className={`
          flex h-14 items-center justify-between gap-6
          rounded-full pl-4 pr-2
          transition-all duration-300
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          hover:bg-white/8
          ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "shadow-[0_8px_32px_rgba(0,0,0,0.2)]"}
        `}
      >
        {/* Logo + name – with image */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-full overflow-hidden">
            <img
              src="https://i.pinimg.com/1200x/0b/66/55/0b66550f4aaba065fc955f37fd631a7a.jpg"
              alt="EngineeringOS"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-bold text-white whitespace-nowrap">
            Engineering<span className="text-[#FF6200]">OS</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/signin"
            className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80 hover:text-white transition-all hover:border-white/40 hover:bg-white/10 whitespace-nowrap"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-1.5 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}