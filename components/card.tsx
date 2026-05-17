"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
  media?: ReactNode;
  children?: ReactNode;
};

/**
 * Displays a branded content card that can render as either static content or a linked teaser.
 */
export function Card({
  eyebrow,
  title,
  description,
  href,
  cta = "Learn more",
  media,
  children,
}: CardProps) {
  const shouldReduceMotion = useReducedMotion();
  const hoverAnimation = shouldReduceMotion
    ? {}
    : { y: -8, scale: 1.01, borderColor: "rgba(185,154,69,0.6)" };

  const content = (
    <motion.article
      className="group h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-accent/60 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(185,154,69,0.08)]"
      whileHover={hoverAnimation}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {media ? (
        <div className="mb-6 overflow-hidden rounded-[1.5rem]">{media}</div>
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">
        {eyebrow}
      </p>
      <h3 className="mt-4 break-words font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
        {title}
      </h3>
      <p className="mt-4 text-lg leading-7 text-text/72">{description}</p>
      {children ? <div className="mt-6">{children}</div> : null}
      {href ? (
        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
          <span>{cta}</span>
          <motion.span
            aria-hidden="true"
            className="transition"
            whileHover={shouldReduceMotion ? {} : { x: 4 }}
          >
            →
          </motion.span>
        </div>
      ) : null}
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
