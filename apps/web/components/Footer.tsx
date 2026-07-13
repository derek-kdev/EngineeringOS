// apps/web/components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 pb-4">
      <div className="max-w-7xl mx-auto">
        <div className="
          flex flex-col items-center gap-4
          rounded-2xl px-6 py-6 sm:py-8
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          transition-all duration-300
          hover:bg-white/8
          text-center
        ">
          {/* Row 1: Main Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <Link href="/works" className="hover:text-white transition">Works</Link>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/contact" className="hover:text-white transition">Contact us</Link>
          </div>

          {/* Row 2: Social Icons */}
          <div className="flex items-center justify-center gap-4 text-white/60">
            {/* X (Twitter) */}
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="X"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>

            {/* GitHub */}
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </Link>
          </div>

          {/* Row 3: Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-white/50">
            <Link href="/terms" className="hover:text-white transition">Terms &amp; Conditions</Link>
            <span className="text-white/20">•</span>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <span className="text-white/20">•</span>
            <Link href="/disclosures" className="hover:text-white transition">Disclosures</Link>
          </div>

          {/* Row 4: Copyright */}
          <div className="text-xs text-white/40 mt-1">
            © 2026 EngineeringOS — Built for innovators. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}