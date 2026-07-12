"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  glow?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  direction = "up",
  glow = false,
}: AnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation();

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionMap[direction],
      }}
      animate={
        isVisible
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                duration: 0.8,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }
          : {}
      }
      className={`${className} ${glow ? "relative" : ""}`}
    >
      {glow && isVisible && (
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#FF6200]/20 to-[#FFB300]/20 blur-xl animate-glow-pulse" />
      )}
      {children}
    </motion.div>
  );
}