"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function LandingFooter() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#0B132B]/40 backdrop-blur-md py-4 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-xs sm:text-sm">
        {/* Main navigation */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/70">
          <Link href="/about" className="hover:text-[#00D2FF]">
            About
          </Link>
          <Link href="/terms" className="hover:text-[#00D2FF]">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-[#00D2FF]">
            Privacy
          </Link>
          <Link href="/disclosures" className="hover:text-[#00D2FF]">
            Disclosures
          </Link>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 text-white/50">
          <a href="https://x.com/engineeringos_gh" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
            <FaXTwitter size={16} />
          </a>
          <a href="https://linkedin.com/in/engineeringos.gh" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
            <FaLinkedinIn size={16} />
          </a>
          <a href="https://facebook.com/engineeringos" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
            <FaFacebookF size={16} />
          </a>
          <a href="https://instagram.com/engineering_os_gh" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
            <FaInstagram size={16} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/30 text-xs">
          &copy; {new Date().getFullYear()} EngineeringOS
        </p>
      </div>
    </footer>
  );
}
