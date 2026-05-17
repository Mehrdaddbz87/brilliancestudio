"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/button";
import { openCookieConsentPreferences } from "@/lib/cookie-consent";

function InstagramIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" ry="5.5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function MailIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function MapPinIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Custom Home Design & Build", href: "/services/custom-home-design-build" },
  { label: "Home Additions", href: "/services/home-additions" },
  { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling" },
  { label: "Bathroom Remodeling", href: "/services/bathroom-remodeling" },
  { label: "Interior & Exterior Design", href: "/services/interior-exterior-design" },
  { label: "Structural Modifications", href: "/services/structural-modifications-framing" },
  { label: "Basement Finishing", href: "/services/basement-finishing" },
];

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Imprint", href: "/impressum" },
];

/**
 * Renders the global footer with navigation, services, contact info, legal links, and copyright.
 */
export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const linkHover = shouldReduceMotion ? {} : { x: 4, color: "#b99a45" };

  return (
    <footer id="footer" className="relative z-0 border-t border-white/10 bg-black/70 backdrop-blur-xl">

      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Ready to transform your space?
            </p>
            <h2 className="mt-3 font-fantasy text-2xl uppercase tracking-[0.1em] text-text sm:text-3xl">
              Let&apos;s shape your next renovation.
            </h2>
          </div>
          <div className="shrink-0">
            <Button href="/contact">Start your project</Button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">

        {/* Brand column */}
        <div className="max-w-sm">
          <p className="font-fantasy text-2xl uppercase tracking-[0.16em] text-accent">
            Brilliance Studio
          </p>
          <p className="mt-4 text-base leading-7 text-text/72">
            Premium renovation and design studio crafting elevated living spaces
            with refined materials, expert craftsmanship, and lasting quality.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href="mailto:hello@example.com"
              className="flex min-w-0 items-center gap-2 text-sm text-text/60 transition hover:text-accent"
            >
              <MailIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span className="break-all">hello@example.com</span>
            </a>
            <p className="flex items-center gap-2 text-sm text-text/60">
              <MapPinIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              Canada
            </p>
            <motion.a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 text-sm text-text/60 transition hover:text-accent"
              whileHover={linkHover}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <InstagramIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
              Instagram
            </motion.a>
          </div>
        </div>

        {/* Navigation column */}
        <nav aria-label="Footer navigation">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text/55">
            Navigation
          </p>
          <ul className="mt-5 space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <motion.div
                  whileHover={linkHover}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 min-w-0 items-center rounded-xl px-2 py-1 text-sm text-text/75 transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services column */}
        <nav aria-label="Services navigation">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text/55">
            Services
          </p>
          <ul className="mt-5 space-y-1">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <motion.div
                  whileHover={linkHover}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 min-w-0 items-center rounded-xl px-2 py-1 text-sm text-text/75 transition hover:text-accent"
                  >
                    <span className="break-words">{link.label}</span>
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal column */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text/55">
            Legal
          </p>
          <ul className="mt-5 space-y-1">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <motion.div
                  whileHover={linkHover}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 min-w-0 items-center rounded-xl px-2 py-1 text-sm text-text/75 transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              </li>
            ))}
            <li>
              <motion.button
                type="button"
                className="inline-flex min-h-9 items-center rounded-xl px-2 py-1 text-sm text-text/75 transition hover:text-accent"
                whileHover={linkHover}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={openCookieConsentPreferences}
              >
                Cookie settings
              </motion.button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-xs text-text/40">
            © {new Date().getFullYear()} Brilliance Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
