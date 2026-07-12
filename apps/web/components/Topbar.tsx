"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const dropdowns: Record<string, string[]> = {
  Products: [
    "Engineering Design",
    "Simulation Suite",
    "AI Assistant",
    "Collaboration Tools",
  ],
  Platform: [
    "Engineering Workspace",
    "Calculation Engine",
    "Knowledge Graph",
  ],
  Solutions: [
    "Engineering Teams",
    "Research Labs",
    "Enterprise Systems",
  ],
  Resources: [
    "Documentation",
    "Community",
    "Research Hub",
  ],
};

export default function Topbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`
        fixed top-0 left-0 z-[9999] w-full
        transition-all duration-300
        ${
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#FF6200]/20"
            : "bg-[#0A0A0A]/70 backdrop-blur-md border-b border-transparent"
        }
      `}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-white"
        >
          <div
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              font-bold transition-transform duration-300 group-hover:rotate-12
              bg-gradient-to-br from-[#FF6200] to-[#FFB300] text-black
            "
          >
            ⚙
          </div>
          <span className="text-lg font-bold">
            Engineering<span className="font-mono">OS</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8">
          {Object.keys(dropdowns).map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`
                  flex items-center gap-1 text-sm
                  text-zinc-400
                  hover:text-white
                  transition-colors duration-200
                  relative group
                `}
              >
                {item}
                <span
                  className={`
                    text-xs transition-transform duration-300
                    ${activeDropdown === item ? "rotate-180" : ""}
                  `}
                >
                  ▾
                </span>
                <span
                  className="
                    absolute -bottom-1 left-0 h-0.5 bg-[#FF8A00]
                    transition-all duration-300 ease-out
                    group-hover:w-full w-0
                  "
                />
              </button>

              {/* Dropdown panel */}
              <div
                className={`
                  absolute left-1/2 -translate-x-1/2 top-10
                  w-80 rounded-2xl
                  border border-[#FF6200]/20
                  bg-[#1F1F1F]/95
                  p-4 backdrop-blur-xl
                  shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                  transition-all duration-300 ease-out
                  ${activeDropdown === item
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-5 opacity-0"}
                `}
              >
                {dropdowns[item].map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="
                      block rounded-xl px-4 py-3 text-sm
                      text-zinc-300
                      transition-all duration-200
                      hover:bg-[#FF6200]/10 hover:text-[#FFB300]
                      hover:translate-x-1
                    "
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
            className="
              text-sm text-zinc-400 hover:text-white
              transition-colors duration-200 relative group
            "
          >
            Pricing
            <span
              className="
                absolute -bottom-1 left-0 h-0.5 bg-[#FF8A00]
                transition-all duration-300 ease-out
                group-hover:w-full w-0
              "
            />
          </Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/signin"
            className="
              rounded-full border border-[#FF6200]/30
              px-5 py-2 text-sm text-white
              transition-all duration-200
              hover:border-[#FF8A00] hover:bg-[#FF6200]/10
            "
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="
              rounded-full
              bg-gradient-to-r from-[#FF6200] to-[#FFB300]
              px-6 py-2 text-sm font-semibold text-black
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(255,138,0,0.5)]
              animate-pulse-once
            "
          >
            Get Started
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-2xl text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-xl p-8 text-white border-t border-[#FF6200]/20">
          {Object.entries(dropdowns).map(([category, links]) => (
            <div key={category} className="mb-6">
              <h3 className="mb-2 text-[#FF8A00] font-semibold">{category}</h3>
              {links.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="block py-2 text-zinc-400 hover:text-white transition"
                  onClick={closeMobile}
                >
                  {link}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/signin"
            className="block py-3 text-zinc-400 hover:text-white transition"
            onClick={closeMobile}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="
              mt-3 block rounded-full
              bg-gradient-to-r from-[#FF6200] to-[#FFB300]
              px-6 py-3 text-center font-semibold text-black
              hover:shadow-[0_0_40px_rgba(255,138,0,0.5)] transition
            "
            onClick={closeMobile}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}