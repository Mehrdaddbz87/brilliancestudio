"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { openCookieConsentPreferences } from "@/lib/cookie-consent";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
];

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Imprint", href: "/impressum" },
];

/**
 * Renders the global footer with social links, legal links, and cookie settings access.
 */
export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const linkHover = shouldReduceMotion ? {} : { x: 4, color: "#b99a45" };

  return (
    <footer
      id="contact"
      className="relative z-0 border-t border-white/10 bg-black/70 backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div className="max-w-md">
          <p className="font-fantasy text-2xl uppercase tracking-[0.16em] text-accent">
            Brilliance Studio
          </p>
          <p className="mt-4 text-lg leading-8 text-text/72">
            Luxury-minded web experiences, elevated visual systems, and refined
            digital storytelling for ambitious brands.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text/55">
            Social
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-xl px-2 py-2 text-base text-text/80 transition hover:text-accent"
                whileHover={linkHover}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-text/55">
            Legal
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {legalLinks.map((link) => (
              <motion.div
                key={link.label}
                className="w-fit"
                whileHover={linkHover}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-xl px-2 py-2 text-base text-text/80 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              type="button"
              className="inline-flex min-h-11 items-center rounded-xl px-2 py-2 text-base text-text/80 transition hover:text-accent"
              whileHover={linkHover}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={openCookieConsentPreferences}
            >
              Cookie settings
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
