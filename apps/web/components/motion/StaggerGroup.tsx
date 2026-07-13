// apps/web/components/motion/StaggerGroup.tsx
"use client";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: { 
      staggerChildren: 0.12, 
      delayChildren: 0.1 
    },
  },
};

export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 32, 
    filter: "blur(8px)", 
    scale: 0.96 
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { 
      duration: 0.85, 
      ease: [0.215, 0.61, 0.355, 1] 
    },
  },
};

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}