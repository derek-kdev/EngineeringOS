// apps/web/components/motion/ScrollReveal.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ 
  children, 
  className, 
  delay = 0 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.7], [12, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, filter: `blur(${blur}px)` }}
      initial={{ opacity: 0 }}
      transition={{ delay, duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}