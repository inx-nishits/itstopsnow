"use client";

import { useEffect, useRef } from "react";
import { useInView, animate, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  /** Animate from this value (default: 0) */
  from?: number;
  /** Animate to this value */
  to?: number;
  /** Shorthand for to (counts from 0 to value) */
  value?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Suffix after number (e.g. "+", "%") */
  suffix?: string;
  /** Prefix before number (e.g. "£") */
  prefix?: string;
  /** Format as float with 1 decimal place */
  isFloat?: boolean;
}

export function AnimatedCounter({
  from = 0,
  to,
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  isFloat = false,
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const target = to ?? value ?? 0;

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    if (!node) return;

    const formattedStatic = () => {
      const formatted = isFloat ? target.toFixed(1) : Math.round(target).toLocaleString();
      node.textContent = `${prefix}${formatted}${suffix}`;
    };

    if (prefersReducedMotion) {
      formattedStatic();
      return;
    }

    const controls = animate(from, target, {
          duration,
          ease: "easeOut",
          onUpdate(v) {
            const formatted = isFloat ? v.toFixed(1) : Math.round(v).toLocaleString();
            node.textContent = `${prefix}${formatted}${suffix}`;
          },
        });
        return () => controls.stop();
  }, [isInView, from, target, duration, prefix, suffix, isFloat, prefersReducedMotion]);

  return (
    <span ref={nodeRef}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}
