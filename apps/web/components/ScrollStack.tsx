// apps/web/components/ScrollStack.tsx
"use client";

import { Children, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollStackProps {
  children: React.ReactNode;
}

/**
 * Pins each child section full-screen and crossfades between them as the
 * page scrolls, instead of having them stack/slide in the normal document
 * flow. Add or remove children to add/remove slides — sizing is automatic.
 */
export default function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const total = slides.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${total * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
        {slides.map((slide, i) => (
          <ScrollStackSlide key={i} index={i} total={total} scrollYProgress={scrollYProgress}>
            {slide}
          </ScrollStackSlide>
        ))}
      </div>
    </div>
  );
}

function ScrollStackSlide({
  index,
  total,
  scrollYProgress,
  children,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const overlap = segment * 0.3; // how much adjacent slides crossfade into each other

  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Keyframe positions along the whole-page scroll progress (0 -> 1).
  const points = [
    isFirst ? 0 : Math.max(0, start - overlap),
    isFirst ? 0.0001 : start,
    isLast ? 0.9999 : end - overlap,
    isLast ? 1 : end,
  ];

  const opacity = useTransform(scrollYProgress, points, [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]);
  const scale = useTransform(scrollYProgress, points, [isFirst ? 1 : 1.04, 1, 1, isLast ? 1 : 0.94]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, scale, pointerEvents: pointerEvents as unknown as string }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}