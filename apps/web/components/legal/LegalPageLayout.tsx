"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function LegalPageLayout({ children, title, subtitle }: LegalPageLayoutProps) {
  const isAuthenticated = useAuthStore((s) => Boolean(s.user && s.accessToken));

  return (
    <main className="min-h-screen bg-[#0B132B] text-white flex flex-col">
      <div className="max-w-3xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Logo + name */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/">
            <Image
              src="/img/our_logo.jpg"
              alt="EngineeringOS Logo"
              width={36}
              height={36}
              className="rounded-md"
            />
          </Link>
          <Link href="/" className="text-xl font-bold text-white hover:text-[#00D2FF]">
            EngineeringOS
          </Link>
        </div>

        {/* Centered title + subtitle */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-white/60 text-sm mt-2">{subtitle}</p>}
        </div>

        {/* Legal content */}
        <div className="prose prose-invert max-w-none text-white/80 space-y-4">
          {children}
        </div>

        {/* Back to Home */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="text-sm text-white/40 hover:text-[#00D2FF]"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0B132B] py-8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Column 1: EngineeringOS */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">EngineeringOS</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/works" className="hover:text-[#00D2FF]">Works</Link></li>
              <li><Link href="/about" className="hover:text-[#00D2FF]">About</Link></li>
              <li><Link href="/pricing" className="hover:text-[#00D2FF]">Pricing</Link></li>
              <li><Link href="/contacts" className="hover:text-[#00D2FF]">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/terms" className="hover:text-[#00D2FF]">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00D2FF]">Privacy</Link></li>
              <li><Link href="/disclosures" className="hover:text-[#00D2FF]">Disclosures</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect / Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
            <div className="flex gap-4 text-white/50">
              <a href="https://x.com/engineeringos_gh" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
                <FaXTwitter size={20} />
              </a>
              <a href="https://linkedin.com/in/engineeringos.gh" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
                <FaLinkedinIn size={20} />
              </a>
              <a href="https://facebook.com/engineeringos" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
                <FaFacebookF size={20} />
              </a>
              <a href="https://instagram.com/engineering_os_gh" target="_blank" rel="noopener noreferrer" className="hover:text-[#00D2FF]">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} EngineeringOS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
