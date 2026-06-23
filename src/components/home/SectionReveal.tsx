"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { MOTION_TRANSITION } from "@/lib/theme/motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: MOTION_TRANSITION.default.duration, ease: MOTION_TRANSITION.default.ease, delay }}
    >
      {children}
    </motion.div>
  );
}
