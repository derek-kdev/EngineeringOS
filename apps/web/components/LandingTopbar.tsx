// apps/web/components/LandingTopbar.tsx
"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
];

export default function LandingTopbar() {
  return (
    <header className="w-full py-4">
      <nav className="flex items-center justify-between gap-6">
        {/* Logo + name */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-sm font-bold text-black">
            ⚙
          </div>
          <span className="text-sm font-bold text-white whitespace-nowrap">
            Engineering<span className="text-[#FF6200]">OS</span>
          </span>
        </Link>

        {/* Nav links – transparent with border */}
        <div className="hidden sm:flex items-center gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#ad7a5a]/60 bg-[#ad7a5a]/10 px-4 py-1.5 text-sm font-medium text-white/90 hover:bg-[#ad7a5a]/20 hover:border-[#ad7a5a] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/signin"
            className="rounded-full border border-[#ad7a5a]/60 bg-[#ad7a5a]/10 px-4 py-1.5 text-sm font-medium text-white/90 hover:bg-[#ad7a5a]/20 hover:border-[#ad7a5a] transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-4 py-1.5 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,138,0,0.4)]"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}