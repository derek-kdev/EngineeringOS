"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScrollShootProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollShoot({ 
  children, 
  className = "", 
  delay = 0 
}: ScrollShootProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "-80px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 120, scale: 0.94, filter: "blur(8px)" }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        filter: "blur(0px)" 
      } : {}}
      transition={{ 
        duration: 1.15, 
        delay, 
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className={`${className} reveal-section ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </motion.div>
  );
}