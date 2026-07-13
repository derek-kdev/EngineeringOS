// apps/web/components/ExploreSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/img/prototype.jpg",
    alt: "Prototype Lab",
    title: "Prototype Lab",
    description: "Build and test digital twins with real‑time physics and material science.",
  },
  {
    src: "/img/research.jpg",
    alt: "Research Library",
    title: "Research Library",
    description: "Extract engineering parameters using AI from any document, instantly.",
  },
  {
    src: "/img/simulation.jpg",
    alt: "Simulation Engine",
    title: "Simulation Engine",
    description: "Run high‑fidelity simulations with real‑time feedback and visualisation.",
  },
  {
    src: "/img/calculations.png",
    alt: "AI-Powered Calculations",
    title: "AI‑Powered Calculations",
    description: "Automate complex engineering maths with intelligent assistance and error checking.",
  },
  {
    src: "/img/community.png",
    alt: "Community Hub",
    title: "Community Hub",
    description: "Connect, collaborate, and share knowledge with your entire engineering team.",
  },
  {
    src: "/img/simulation.png",
    alt: "Interactive Simulation",
    title: "Interactive Simulation",
    description: "Visualise and interact with simulation results in 3D – rotate, zoom, and analyse.",
  },
];

export default function ExploreSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto‑advance every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Ambient glow – subtle, behind the image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,98,0,0.08),transparent_60%)] pointer-events-none z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
            quality={90}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-20">
        <motion.h2
          key={currentIndex + "-title"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold mb-2"
        >
          {slides[currentIndex].title}
        </motion.h2>
        <motion.p
          key={currentIndex + "-desc"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl"
        >
          {slides[currentIndex].description}
        </motion.p>
      </div>

      {/* No navigation dots – fully automatic */}
    </div>
  );
}