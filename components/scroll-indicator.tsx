"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Fixed scroll indicator shown at the bottom of the viewport on the home page.
 * Fades out once the user has scrolled 80px down.
 */
export function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 80) setVisible(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <span
        style={{
          fontSize: "0.6rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Scroll
      </span>
      <div
        style={{
          position: "relative",
          width: "1.25rem",
          height: "2.5rem",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "0.375rem",
            width: "0.375rem",
            height: "0.375rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(185,154,69,0.85)",
            translateX: "-50%",
          }}
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
