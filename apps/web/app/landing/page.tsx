// apps/web/app/landing/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LandingTopbar from "@/components/LandingTopbar";

// ---- HERO SLIDE ----
const HeroSlide = () => (
  <div className="relative w-full h-full overflow-hidden bg-[#0A0A0A]">
    <Image
      src="/img/hero.png"
      alt="Hero"
      fill
      className="object-cover"
      priority
      quality={90}
    />
    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,98,0,0.06),transparent_70%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(#FF6200_0.6px,transparent_1px)] bg-[length:60px_60px] opacity-5" />

    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-center max-w-4xl">
        Engineering intelligence.
        <br />
        <span className="text-[#FF6200]">Built into one platform.</span>
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl text-center mt-6">
        From research to simulation, ideation to prototype — all in one
        intelligent engineering workspace.
      </p>
      <div className="mt-8 h-1 w-24 mx-auto bg-gradient-to-r from-[#FF6200] to-[#FFB300] rounded-full animate-pulse" />
    </div>
  </div>
);

// ---- EXPLORE IMAGE SLIDE ----
const ExploreImageSlide = ({ src, title, description }: { src: string; title: string; description: string }) => (
  <div className="relative w-full h-full overflow-hidden bg-[#0A0A0A]">
    <Image
      src={src}
      alt={title}
      fill
      className="object-cover"
      sizes="100vw"
      quality={90}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    <div className="absolute bottom-10 left-0 right-0 p-8 md:p-12 text-white z-20">
      <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">{title}</h2>
      <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">{description}</p>
    </div>
  </div>
);

// ---- FOOTER SLIDE ----
const FooterSlide = () => (
  <div className="relative w-full h-full overflow-hidden bg-[#0A0A0A]">
    <Image
      src="/img/footer_img.png"
      alt="Footer"
      fill
      className="object-cover"
      quality={90}
    />
    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white px-4 md:px-8">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
        {["Works", "Services", "About", "Pricing", "Contact us"].map((label) => (
          <Link
            key={label}
            href={`/${label.toLowerCase().replace(" ", "")}`}
            className="text-sm md:text-lg font-medium text-white/80 hover:text-white hover:scale-105 transition"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4">
        {["Terms & Conditions", "Privacy Policy", "Disclosures"].map((label) => (
          <Link
            key={label}
            href={`/${label.toLowerCase().replace(/ & | /g, "-")}`}
            className="text-xs text-white/50 hover:text-white/80 hover:underline transition"
          >
            {label}
          </Link>
        ))}
      </div>
      <p className="text-xs text-white/30 text-center">
        © 2026 EngineeringOS – Built for innovators. All rights reserved.
      </p>
    </div>
  </div>
);

// ---- SLIDES CONFIGURATION ----
const exploreData = [
  { src: "/img/prototype.jpg", title: "Prototype Lab", description: "Build and test digital twins with real‑time physics." },
  { src: "/img/research.jpg", title: "Research Library", description: "Extract engineering parameters using AI from any document." },
  { src: "/img/simulation.png", title: "Simulation Engine", description: "Run high‑fidelity simulations with instant feedback." },
  { src: "/img/calculations.png", title: "AI-Powered Calculations", description: "Automate complex engineering maths with intelligent assistance." },
  { src: "/img/community.png", title: "Community Hub", description: "Connect, collaborate, and share knowledge with your team." },
  { src: "/img/simulation_expansion.jpg", title: "Interactive Simulation", description: "Visualise and interact with simulation results in 3D." },
];

const slides = [
  { id: "hero", component: <HeroSlide /> },
  ...exploreData.map((item, i) => ({
    id: `explore-${i}`,
    component: <ExploreImageSlide {...item} />,
  })),
  { id: "footer", component: <FooterSlide /> },
];

// ---- TRANSITION PRESETS (20+ variations) ----
const presets = [
  { enter: { opacity: 0, scale: 0.8 }, exit: { opacity: 0, scale: 1.2 } },
  { enter: { opacity: 0, x: -100 }, exit: { opacity: 0, x: 100 } },
  { enter: { opacity: 0, x: 100 }, exit: { opacity: 0, x: -100 } },
  { enter: { opacity: 0, y: -100 }, exit: { opacity: 0, y: 100 } },
  { enter: { opacity: 0, y: 100 }, exit: { opacity: 0, y: -100 } },
  { enter: { opacity: 0, rotate: -10, scale: 0.9 }, exit: { opacity: 0, rotate: 10, scale: 1.1 } },
  { enter: { opacity: 0, rotate: 10, scale: 1.1 }, exit: { opacity: 0, rotate: -10, scale: 0.9 } },
  { enter: { opacity: 0, filter: "blur(12px)" }, exit: { opacity: 0, filter: "blur(12px)" } },
  // add more as desired
];

// ---- MAIN COMPONENT ----
export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const presetIndex = currentIndex % presets.length;
  const animation = presets[presetIndex];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0A]">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={animation.enter}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
          }}
          exit={animation.exit}
          transition={{
            duration: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0 w-full h-full"
        >
          {slides[currentIndex].component}
        </motion.div>
      </AnimatePresence>

      {/* Topbar overlay */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
        <div className="pointer-events-auto max-w-7xl mx-auto px-4">
          <LandingTopbar />
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-10 bg-[#FF6200] shadow-[0_0_8px_rgba(255,98,0,0.4)]"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}