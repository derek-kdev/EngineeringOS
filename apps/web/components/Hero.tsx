// apps/web/components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero.png"
          alt="EngineeringOS Hero"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* Text Content */}
      <div
        className={`
          relative z-10 w-full h-full flex flex-col items-center justify-center text-white
          transition-all duration-1000 ease-out
          ${isExiting ? "opacity-0 -translate-y-32" : "opacity-100 translate-y-0"}
        `}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-center px-4">
          Engineering intelligence.
          <br />
          <span className="text-[#FF6200]">Built into one platform.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl text-center px-4">
          From research to simulation, ideation to prototype — all in one
          intelligent engineering workspace.
        </p>
        <div className="mt-8 h-1 w-24 mx-auto bg-gradient-to-r from-[#FF6200] to-[#FFB300] rounded-full animate-pulse" />
      </div>
    </div>
  );
}