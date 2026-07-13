// apps/web/components/motion/Reveal.tsx
"use client";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  duration?: number;
}

/**
 * Enhanced Reveal with GCORE-style smooth cinematic entrance:
 * Slower, more confident easing + subtle blur + gentle scale.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = true,
  duration = 1.1,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)", scale: 0.98 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)", 
        scale: 1 
      }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // GCORE-style smooth overshoot ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}