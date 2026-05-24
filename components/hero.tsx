"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/button";

/**
 * Renders the landing-page hero with staged motion and primary navigation CTAs.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center">
      <div className="grid w-full gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-6 py-12 shadow-[0_0_100px_rgba(185,154,69,0.08)] sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:px-12 xl:px-16">

        {/* Left: headline + body + CTAs */}
        <motion.div
          className="relative min-w-0"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ghost watermark "BRILLIANCE" */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 left-0 select-none break-words font-classic text-[5.5rem] font-black uppercase leading-none tracking-[0.18em] text-white/[0.045] sm:text-[7rem] md:text-[8.5rem]"
          >
            BRILLIANCE
          </span>

          {/* Eyebrow badge */}
          <motion.span
            className="relative inline-flex max-w-full break-words rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:tracking-[0.3em]"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Premium Renovation Studio
          </motion.span>

          {/* Thin gold separator line */}
          <motion.div
            className="relative mt-4 h-px w-28 bg-gradient-to-r from-accent/80 to-transparent"
            initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={shouldReduceMotion ? {} : { scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Headline — split for italic + gold accent */}
          <motion.h1
            className="relative mt-7 break-words font-classic text-3xl font-black uppercase leading-[0.95] tracking-[0.03em] text-text sm:text-4xl md:text-5xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            Luxury Renovation{" "}
            <em className="font-light not-italic italic opacity-80">
              and&nbsp;Design,
            </em>
            <br />
            Crafted with{" "}
            <span className="text-accent">Precision.</span>
          </motion.h1>

          <motion.p
            className="relative mt-7 max-w-lg text-base leading-8 text-text/72 sm:text-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            We design and build elevated living spaces from custom homes and
            kitchen remodels to structural transformations, shaped by
            craftsmanship, refined materials, and a high-end aesthetic.
          </motion.p>

          <motion.div
            className="relative mt-10 flex flex-col gap-4 sm:flex-row"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="/contact">Start project</Button>
            <Button href="/portfolio" variant="ghost">
              View portfolio
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: premium stat panels — no numbers, gold top border */}
        <div className="grid gap-4 self-end md:grid-cols-3 lg:grid-cols-1">
          {[
            ["Approach", "Craftsmanship & Precision."],
            ["Services", "Design, Build, Transform."],
            ["Standard", "High-End, Refined, Lasting."],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 px-5 pb-5 pt-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.22 + index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Gold top border line */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/70 via-accent/30 to-transparent"
              />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-text/40">
                {label}
              </p>
              <p className="mt-3 break-words font-classic text-lg font-light italic text-accent">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
