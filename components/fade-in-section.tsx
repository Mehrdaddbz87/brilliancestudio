"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Wraps content in a scroll-triggered reveal animation that respects reduced-motion settings.
 */
export function FadeInSection({
  children,
  className,
  delay = 0,
}: FadeInSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }
      }
      whileInView={
        shouldReduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
