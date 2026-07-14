// apps/web/components/LandingFooter.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const mainTabs = [
  { label: "Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact us", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclosures", href: "/disclosures" },
];

export default function LandingFooter() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Background Image – full screen, no frames */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/footer_img.png"
          alt="Footer background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Content – Centered, clickable */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white px-4 md:px-8">
        {/* Main tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6"
        >
          {mainTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="text-sm md:text-lg font-medium text-white/80 hover:text-white hover:scale-105 transition-all duration-200"
            >
              {tab.label}
            </Link>
          ))}
        </motion.div>

        {/* Legal links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4"
        >
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/50 hover:text-white/80 hover:underline transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xs text-white/30 text-center"
        >
          © 2026 EngineeringOS – Built for innovators. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}