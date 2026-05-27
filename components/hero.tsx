"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/button";

const HERO_IMAGE_URL = "/hero-luxury-home-exterior.png";

/**
 * Renders the landing-page hero with staged motion and a floating tilted project photo.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
      <div className="grid w-full items-center gap-12 overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 px-6 py-14 shadow-[0_0_100px_rgba(185,154,69,0.08)] backdrop-blur-sm sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 xl:px-16">

        {/* ── Left: headline + body + CTA ── */}
        <motion.div
          className="relative min-w-0"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow badge */}
          <motion.span
            className="relative inline-flex max-w-full break-words rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:tracking-[0.3em]"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Premium Renovation Studio
          </motion.span>

          {/* Gold separator */}
          <motion.div
            className="relative mt-4 h-px w-28 bg-gradient-to-r from-accent/80 to-transparent"
            initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={shouldReduceMotion ? {} : { scaleX: 1, opacity: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Headline */}
          <motion.h1
            className="relative mt-7 break-words font-raleway text-3xl font-semibold uppercase leading-tight tracking-[0.12em] text-text sm:text-4xl md:text-5xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            Luxury Renovation and Design, Crafted with{" "}
            <span className="text-accent">Precision.</span>
          </motion.h1>

          <motion.p
            className="relative mt-7 max-w-lg font-raleway text-base font-light leading-8 tracking-wide text-text/72 sm:text-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            We design and build elevated living spaces from custom homes and
            kitchen remodels to structural transformations, shaped by
            craftsmanship, refined materials, and a high-end aesthetic.
          </motion.p>

          <motion.div
            className="relative mt-10"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="/portfolio" variant="ghost">
              View portfolio
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Right: floating tilted card photo ── */}
        <motion.div
          className="hidden lg:flex lg:items-center lg:justify-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30, rotate: 4 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={shouldReduceMotion ? {} : { rotate: 1, scale: 1.02, y: -6 }}
        >
          <div
            className="w-full max-w-[480px] overflow-hidden rounded-[1.75rem] border border-accent/30 shadow-[0_32px_100px_rgba(0,0,0,0.7),0_0_60px_rgba(185,154,69,0.14)]"
            style={{ rotate: "3deg" }}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={HERO_IMAGE_URL}
                alt="Luxury renovation project by Brilliance Studio"
                fill
                className="object-cover"
                sizes="480px"
                priority
              />
              {/* Subtle inner dark vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.35)_100%)]" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
