// apps/web/components/ui/AnimatedCounter.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation();
  const count = useMotionValue(0);
  const rounded = useSpring(count, { damping: 30, stiffness: 100 });

  useEffect(() => {
    if (isVisible) {
      count.set(value);
    }
  }, [isVisible, count, value]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}