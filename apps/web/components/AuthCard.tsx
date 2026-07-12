// apps/web/components/AuthCard.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  backgroundImage?: string;
}

export function AuthCard({ 
  title, 
  subtitle, 
  children, 
  footer, 
  backgroundImage 
}: AuthCardProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>
      )}

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="
          w-full rounded-2xl
          border border-[#FF6200]/20
          bg-[#111111]/90
          backdrop-blur-2xl
          p-8
          shadow-[0_20px_60px_rgba(0,0,0,0.8)]
          hover:shadow-[0_30px_80px_rgba(255,98,0,0.15)]
          transition-all duration-500
        ">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] font-bold text-black shadow-lg shadow-[#FF6200]/30">
              ⚙
            </div>
            <span className="text-xl font-bold text-white">
              Engineering<span className="font-mono">OS</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">
            {title}
          </h1>
          <p className="text-sm text-zinc-400 mb-6">
            {subtitle}
          </p>

          {children}

          <div className="mt-6 text-center text-sm text-zinc-400">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}