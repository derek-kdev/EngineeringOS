"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

interface DashboardFooterProps {
  expanded?: boolean;
}

export default function DashboardFooter({
  expanded = true,
}: DashboardFooterProps) {
  return (
    <footer
      className={`
        mt-auto
        border-t
        border-white/10
        bg-[#0B132B]
        py-8
        text-center
        text-white
        transition-all
        duration-300
        ${expanded ? "px-6" : "px-4"}
      `}
    >
      <div className="mx-auto max-w-7xl space-y-5">

        {/* Brand */}
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-3"
        >
          <Image
            src="/img/our_logo.jpg"
            alt="EngineeringOS Logo"
            width={36}
            height={36}
            className="rounded-md"
          />

          <span className="text-lg font-bold text-white">
            EngineeringOS
          </span>
        </Link>


        {/* Tagline */}
        <p className="text-sm text-white/60">
          Built for innovators, powered by intelligence.
        </p>


        {/* Main Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/80">

          <Link href="/works" className="hover:text-[#00D2FF]">
            Works
          </Link>

          <span className="text-white/20">·</span>

          <Link href="/services" className="hover:text-[#00D2FF]">
            Services
          </Link>

          <span className="text-white/20">·</span>

          <Link href="/about" className="hover:text-[#00D2FF]">
            About
          </Link>

          <span className="text-white/20">·</span>

          <Link href="/pricing" className="hover:text-[#00D2FF]">
            Pricing
          </Link>

          <span className="text-white/20">·</span>

          <Link href="/contacts" className="hover:text-[#00D2FF]">
            Contact us
          </Link>

        </div>


        {/* Legal */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/40">

          <Link href="/terms" className="hover:text-[#00D2FF]">
            Terms & Conditions
          </Link>

          <span>|</span>

          <Link href="/privacy" className="hover:text-[#00D2FF]">
            Privacy Policy
          </Link>

          <span>|</span>

          <Link href="/disclosures" className="hover:text-[#00D2FF]">
            Disclosures
          </Link>

        </div>


        {/* Socials */}
        <div className="flex justify-center gap-5 pt-2 text-white/50">

          <a
            href="https://x.com/engineeringos_gh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaXTwitter size={18} />
          </a>


          <a
            href="https://linkedin.com/in/engineeringos.gh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaLinkedinIn size={18} />
          </a>


          <a
            href="https://facebook.com/engineeringos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaFacebookF size={18} />
          </a>


          <a
            href="https://instagram.com/engineering_os_gh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaInstagram size={18} />
          </a>

        </div>


        {/* System Status */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/40">

          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

          All systems operational

        </div>


        {/* Copyright */}
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} EngineeringOS. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
