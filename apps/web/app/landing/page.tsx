// apps/web/app/landing/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import ExploreSection from "@/components/ExploreSection";
import LandingFooter from "@/components/LandingFooter";

const sections = [
  { id: "hero", component: <Hero /> },
  { id: "explore", component: <ExploreSection /> },
  { id: "footer", component: <LandingFooter /> },
];

export default function LockedLandingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        const next = (currentIndex + 1) % sections.length;
        setCurrentIndex(next);
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    }, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isTransitioning]);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0A0A0A] z-50">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,98,0,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#FF6200_0.6px,transparent_1px)] bg-[length:60px_60px] opacity-5 pointer-events-none" />

      {/* Vertical sliding container */}
      <div
        className="transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
          height: `${sections.length * 100}vh`,
        }}
      >
        {sections.map((section, index) => (
          <div key={section.id} className="h-screen w-full overflow-hidden">
            {section.component}
          </div>
        ))}
      </div>

      {/* NO dots, NO counter – completely clean */}
    </div>
  );
}