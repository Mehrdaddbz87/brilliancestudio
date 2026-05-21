"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function ScrollIndicator() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    function checkScrollable() {
      const menuOpen = document.body.classList.contains("menu-open");
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight + 20;
      const isAtTop = window.scrollY < 80;
      setVisible(isScrollable && isAtTop && !menuOpen);
    }

    const delay = setTimeout(checkScrollable, 900);

    window.addEventListener("scroll", checkScrollable, { passive: true });
    window.addEventListener("resize", checkScrollable, { passive: true });

    // Also listen for menu-open class changes via MutationObserver
    const observer = new MutationObserver(checkScrollable);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearTimeout(delay);
      window.removeEventListener("scroll", checkScrollable);
      window.removeEventListener("resize", checkScrollable);
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted || shouldReduceMotion) return null;

  const indicator = (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: "2.5rem",
        right: "2rem",
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "1.25rem",
          height: "2.5rem",
          borderRadius: "9999px",
          border: "1px solid rgba(185,154,69,0.45)",
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
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
            backgroundColor: "rgba(185,154,69,0.9)",
            translateX: "-50%",
          }}
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span
        style={{
          fontSize: "0.55rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "rgba(185,154,69,0.6)",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          marginTop: "0.25rem",
        }}
      >
        Scroll
      </span>
    </div>
  );

  return createPortal(indicator, document.body);
}