// apps/web/components/SlideDeck.tsx
"use client";

import { Children, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideDeckProps {
  children: React.ReactNode;
}

/**
 * Locks page scroll and turns wheel/touch/arrow-key input into slide
 * navigation instead. The page never actually scrolls — each section
 * crossfades in/out full-screen. Add or remove children to change the
 * number of slides; nothing else needs to change.
 */
export default function SlideDeck({ children }: SlideDeckProps) {
  const slides = Children.toArray(children);
  const total = slides.length;
  const [active, setActive] = useState(0);
  const cooling = useRef(false);

  const step = (dir: 1 | -1) => {
    if (cooling.current) return;
    setActive((prev) => {
      const next = Math.max(0, Math.min(total - 1, prev + dir));
      if (next !== prev) {
        cooling.current = true;
        setTimeout(() => {
          cooling.current = false;
        }, 900);
      }
      return next;
    });
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return;
      step(e.deltaY > 0 ? 1 : -1);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) step(1);
      if (["ArrowUp", "PageUp"].includes(e.key)) step(-1);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      step(delta > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slides[active]}
        </motion.div>
      </AnimatePresence>

      {/* Dot navigation */}
      <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === active ? "scale-125 bg-[#FF6200]" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}