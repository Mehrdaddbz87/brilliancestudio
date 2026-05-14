"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/button";

/**
 * Renders the landing-page hero with staged motion and primary navigation CTAs.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center">
      <div className="grid w-full gap-10 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-6 py-12 shadow-[0_0_100px_rgba(185,154,69,0.08)] sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:px-12 xl:px-16">
        <motion.div
          className="max-w-4xl"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent sm:text-sm"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Premium Renovation Studio
          </motion.span>
          <motion.h1
            className="mt-8 font-fantasy text-4xl uppercase tracking-[0.12em] text-text sm:text-5xl md:text-6xl xl:text-7xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Luxury renovation and design, crafted with precision.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 text-text/75 sm:text-xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We design and build elevated living spaces — from custom homes and
            kitchen remodels to structural transformations — shaped by
            craftsmanship, refined materials, and a high-end aesthetic.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Button href="/contact">Start project</Button>
            <Button href="/portfolio" variant="ghost">
              View portfolio
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid gap-4 self-end sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["Approach", "Craftsmanship & precision."],
            ["Services", "Design, build, transform."],
            ["Standard", "High-end, refined, lasting."],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              className="rounded-[1.5rem] border border-accent/20 bg-black/40 p-5"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.2 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text/45">
                {label}
              </p>
              <p className="mt-3 font-fantasy text-xl uppercase tracking-[0.08em] text-accent">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-text/35">
            Scroll
          </span>
          <div className="relative h-10 w-5 rounded-full border border-white/20">
            <motion.div
              className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent/70"
              animate={{ y: [0, 14, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
