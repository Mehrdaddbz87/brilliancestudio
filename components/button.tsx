"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseStyles =
  "inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.24em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-accent/70 focus:ring-offset-2 focus:ring-offset-background";

const variants = {
  primary:
    "border-accent bg-accent text-primary shadow-[0_0_30px_rgba(185,154,69,0.18)] hover:-translate-y-0.5 hover:bg-transparent hover:text-accent",
  ghost:
    "border-white/15 bg-white/5 text-text hover:border-accent hover:bg-accent/10 hover:text-accent",
};

/**
 * Shared CTA component that renders either a link or a native button with motion styles.
 */
export function Button(props: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const { children, href, variant = "primary", className } = props;
  const classes = cn(baseStyles, variants[variant], className);
  const hoverAnimation = shouldReduceMotion ? {} : { y: -2, scale: 1.01 };
  const tapAnimation = shouldReduceMotion ? {} : { scale: 0.985 };

  if (href) {
    return (
      <motion.div
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        <Link href={href} className={classes} onClick={props.onClick}>
          {children}
        </Link>
      </motion.div>
    );
  }

  const {
    onClick,
    type = "button",
    ...buttonProps
  } = props as NativeButtonProps;

  return (
    <motion.div
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      <button
        type={type}
        className={classes}
        onClick={onClick}
        {...buttonProps}
      >
        {children}
      </button>
    </motion.div>
  );
}
