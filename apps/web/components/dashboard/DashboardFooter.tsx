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
    <footer className="mt-auto border-t border-white/10 bg-[#0B132B] py-4 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-xs sm:text-sm">
        {/* Logo + Name */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
        >
          <Image
            src="/img/our_logo.jpg"
            alt="EngineeringOS Logo"
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="text-base font-bold text-white">
            EngineeringOS
          </span>
        </Link>

        {/* Main navigation */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/70">
          <Link href="/works" className="hover:text-[#00D2FF]">
            Works
          </Link>
          <Link href="/about" className="hover:text-[#00D2FF]">
            About
          </Link>
          <Link href="/pricing" className="hover:text-[#00D2FF]">
            Pricing
          </Link>
          <Link href="/contacts" className="hover:text-[#00D2FF]">
            Contact
          </Link>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 text-white/50">
          <a
            href="https://x.com/engineeringos_gh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaXTwitter size={16} />
          </a>
          <a
            href="https://linkedin.com/in/engineeringos.gh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaLinkedinIn size={16} />
          </a>
          <a
            href="https://facebook.com/engineeringos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href="https://instagram.com/engineering_os_gh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00D2FF]"
          >
            <FaInstagram size={16} />
          </a>
        </div>

        {/* Legal links + copyright */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/40 text-xs">
          <Link href="/terms" className="hover:text-[#00D2FF]">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-[#00D2FF]">
            Privacy
          </Link>
          <Link href="/disclosures" className="hover:text-[#00D2FF]">
            Disclosures
          </Link>
          <span className="text-white/30">
            &copy; {new Date().getFullYear()} EngineeringOS
          </span>
        </div>
      </div>
    </footer>
  );
}
