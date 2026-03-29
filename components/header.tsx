"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "References", href: "/references" },
  { label: "Contact", href: "/contact" },
];

/**
 * Renders the primary site navigation with animated desktop links and a mobile menu.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const linkHover = shouldReduceMotion ? {} : { y: -2, color: "#b99a45" };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo className="shrink-0" onClick={() => setIsOpen(false)} />
        </motion.div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <motion.div
              key={item.href}
              whileHover={linkHover}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full px-3 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-text/80 transition hover:text-accent"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <Button href="/booking" className="px-5 py-2.5 text-xs">
            Request project
          </Button>
        </nav>

        <motion.button
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-text transition hover:border-accent hover:text-accent lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            {[0, 1, 2].map((line) => (
              <span
                key={line}
                className={cn(
                  "block h-0.5 w-5 bg-current transition",
                  isOpen && line === 0 && "translate-y-2 rotate-45",
                  isOpen && line === 1 && "opacity-0",
                  isOpen && line === 2 && "-translate-y-2 -rotate-45",
                )}
              />
            ))}
          </div>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-background/95 lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.24,
                    delay: index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-text/85 transition hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Button
                  href="/booking"
                  className="mt-2 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Request project
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
