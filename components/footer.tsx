"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";


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

function PhoneIcon(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
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
  { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling" },
  { label: "Bathroom Remodeling", href: "/services/bathroom-remodeling" },
  { label: "Basement Finishing", href: "/services/basement-finishing" },
];


function SocialIcons({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [igHover, setIgHover] = useState(false);
  const [fbHover, setFbHover] = useState(false);

  return (
    <div className="mt-5 flex items-center gap-3">
      <motion.a
        href="https://www.instagram.com/brilliancestudio.ca/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        onHoverStart={() => setIgHover(true)}
        onHoverEnd={() => setIgHover(false)}
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200"
        style={{
          borderColor: igHover ? "#E1306C60" : "rgba(185,154,69,0.4)",
          color: igHover ? "#E1306C" : "rgba(185,154,69,0.7)",
        }}
      >
        <InstagramIcon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
      </motion.a>

      <motion.a
        href="https://www.facebook.com/share/18aPrZRs6h/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Facebook"
        onHoverStart={() => setFbHover(true)}
        onHoverEnd={() => setFbHover(false)}
        whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200"
        style={{
          borderColor: fbHover ? "#1877F260" : "rgba(185,154,69,0.4)",
          color: fbHover ? "#1877F2" : "rgba(185,154,69,0.7)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </motion.a>
    </div>
  );
}

/**
 * Renders the global footer with navigation, services, contact info, legal links, and copyright.
 */
export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const linkHover = shouldReduceMotion ? {} : { x: 4, color: "#b99a45" };

  return (
    <footer id="footer" className="relative z-0 border-t border-accent/20 bg-black/70 backdrop-blur-xl">

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.6fr_1fr_1.2fr_0.8fr] lg:px-8">

        {/* Brand column */}
        <div className="max-w-sm">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
            Brilliance Studio
          </p>
          <p className="mt-3 font-raleway text-base font-light leading-7 tracking-wide text-text/55">
            Premium renovation and design,<br />crafted with precision.
          </p>
          <div className="mt-6 space-y-3">
            <a
              href="mailto:info@brilliancestudio.ca"
              className="flex min-w-0 items-center gap-2.5 font-raleway text-base font-light tracking-wide text-text/55 transition hover:text-accent"
            >
              <MailIcon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="break-all">info@brilliancestudio.ca</span>
            </a>
            <a
              href="tel:4165588186"
              className="flex min-w-0 items-center gap-2.5 font-raleway text-base font-light tracking-wide text-text/55 transition hover:text-accent"
            >
              <PhoneIcon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span>416 558 8186</span>
            </a>
            <p className="flex items-center gap-2.5 font-raleway text-base font-light tracking-wide text-text/55">
              <MapPinIcon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              Canada
            </p>
          </div>
          {/* Social icons */}
          <SocialIcons shouldReduceMotion={!!shouldReduceMotion} />
        </div>

        {/* Navigation column */}
        <nav aria-label="Footer navigation">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-accent/80">
            Navigation
          </p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <motion.div
                  whileHover={linkHover}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-raleway text-base font-light tracking-wide text-text/60 transition hover:text-accent"
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
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-accent/80">
            Services
          </p>
          <ul className="mt-5 space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <motion.div
                  whileHover={linkHover}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-raleway text-base font-light tracking-wide text-text/60 transition hover:text-accent"
                  >
                    <span className="break-words">{link.label}</span>
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs text-text/35">
            © 2026 Brilliance Studio. All rights reserved.
          </p>
          <p className="text-xs text-text/35">
            Designed with precision in Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
