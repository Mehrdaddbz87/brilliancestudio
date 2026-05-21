"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bath,
  Hammer,
  Home,
  Layers3,
  Pencil,
  Plus,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/compat/router";
import {
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/button";
import { Logo } from "@/components/ui/Logo";
import { serviceNavItems } from "@/lib/service-pages";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
];

const serviceIconMap = {
  home: Home,
  plus: Plus,
  utensils: UtensilsCrossed,
  bath: Bath,
  pencil: Pencil,
  hammer: Hammer,
  layers: Layers3,
} as const;

function ServiceMenuLink({
  href,
  label,
  icon,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  icon: keyof typeof serviceIconMap;
  onClick: () => void;
  mobile?: boolean;
}) {
  const Icon = serviceIconMap[icon];

  return (
    <Link
      href={href}
      role={mobile ? undefined : "menuitem"}
      className={cn(
        "group flex items-center justify-between rounded-xl transition-all duration-200 ease-in-out",
        mobile
          ? "px-3 py-3 text-sm text-text/82 hover:bg-accent/10 hover:text-accent"
          : "px-4 py-3 text-sm font-medium text-text/88 hover:bg-white/[0.04] hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50",
      )}
      onClick={onClick}
    >
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <Icon
          aria-hidden="true"
          className="h-[18px] w-[18px] shrink-0 translate-x-0 text-white/40 transition-all duration-200 ease-in-out group-hover:translate-x-1 group-hover:text-accent"
          strokeWidth={1.6}
        />
        <span className="min-w-0 break-words transition-colors duration-200 ease-in-out">
          {label}
        </span>
      </span>
      {!mobile ? (
        <span
          aria-hidden="true"
          className="translate-x-0 text-accent/0 transition-all duration-200 ease-in-out group-hover:translate-x-1 group-hover:text-accent"
        >
          Ã¢â€ â€™
        </span>
      ) : null}
    </Link>
  );
}

/**
 * Renders the primary site navigation with animated desktop links and a mobile menu.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isServicesAccordionOpen, setIsServicesAccordionOpen] = useState(false);
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const router = useRouter();
  const pathname = usePathname() ?? router?.pathname ?? "";
  const shouldReduceMotion = useReducedMotion();
  const linkHover = shouldReduceMotion ? {} : { y: -2, color: "#b99a45" };
  const servicesRouteActive = pathname.startsWith("/services");

  function isActiveLink(href: string) {
    return pathname === href;
  }

  function clearServicesCloseTimeout() {
    if (servicesCloseTimeoutRef.current) {
      clearTimeout(servicesCloseTimeoutRef.current);
      servicesCloseTimeoutRef.current = null;
    }
  }

  function openServicesMenu() {
    clearServicesCloseTimeout();
    setIsServicesMenuOpen(true);
  }

  function closeServicesMenu(withDelay = false) {
    clearServicesCloseTimeout();

    if (withDelay) {
      servicesCloseTimeoutRef.current = setTimeout(() => {
        setIsServicesMenuOpen(false);
        servicesCloseTimeoutRef.current = null;
      }, 120);
      return;
    }

    setIsServicesMenuOpen(false);
  }

  function closeMobileMenu() {
    setIsOpen(false);
    setIsServicesAccordionOpen(false);
    closeServicesMenu();
  }

  function handleServicesBlur(event: ReactFocusEvent<HTMLDivElement>) {
    const nextFocused = event.relatedTarget as Node | null;

    if (!event.currentTarget.contains(nextFocused)) {
      closeServicesMenu();
    }
  }

  function handleServicesKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      closeServicesMenu();
    }

    if (event.key === "ArrowDown") {
      openServicesMenu();
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !shouldReduceMotion ? (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[40] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo className="shrink-0" onClick={closeMobileMenu} />
        </motion.div>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            if (item.href === "/services") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={() => closeServicesMenu(true)}
                  onFocusCapture={openServicesMenu}
                  onBlurCapture={handleServicesBlur}
                  onKeyDown={handleServicesKeyDown}
                >
                  <motion.div
                    whileHover={linkHover}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      aria-expanded={isServicesMenuOpen}
                      aria-haspopup="menu"
                      aria-controls="services-menu"
                      aria-current={servicesRouteActive ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition",
                        servicesRouteActive
                          ? "text-accent"
                          : "text-text/80 hover:text-accent",
                      )}
                      onClick={() => {
                        if (isServicesMenuOpen) {
                          closeServicesMenu();
                        } else {
                          openServicesMenu();
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "text-[0.7rem] transition duration-200",
                          isServicesMenuOpen ? "rotate-180 text-accent" : "",
                        )}
                      >
                        <svg aria-hidden="true" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline",width:"0.7rem",height:"0.7rem"}}><path d="M1 1l4 4 4-4"/></svg>
                      </span>
                    </button>
                  </motion.div>

                  <AnimatePresence>
                    {isServicesMenuOpen ? (
                      <motion.div
                        id="services-menu"
                        role="menu"
                        aria-label="Services categories"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 2 }}
                        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? {} : { opacity: 0, y: 2 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-full z-[70] w-[min(28rem,calc(100vw-2rem))] pt-2"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute left-0 top-0 h-2 w-full"
                        />
                        <div className="rounded-2xl border border-accent/20 bg-black p-3 shadow-2xl shadow-black/60">
                          <div className="mb-2 px-3 pt-2">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent">
                              Services
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            {serviceNavItems.map((category) => (
                              <ServiceMenuLink
                                key={category.href}
                                href={category.href}
                                icon={category.icon}
                                onClick={() => closeServicesMenu()}
                                label={category.label}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <motion.div
                key={item.href}
                whileHover={linkHover}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={item.href}
                  aria-current={isActiveLink(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full px-3 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition",
                    isActiveLink(item.href)
                      ? "text-accent"
                      : "text-text/80 hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
          <Button href="/contact" className="px-5 py-2.5 text-xs">
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
              {navigation.map((item, index) => {
                if (item.href === "/services") {
                  return (
                    <motion.div
                      key={item.href}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.24,
                        delay: index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="rounded-[1.5rem] border border-white/10 bg-black/25"
                    >
                      <button
                        type="button"
                        aria-expanded={isServicesAccordionOpen}
                        aria-controls="mobile-services-menu"
                        className={cn(
                          "flex min-h-11 w-full items-center justify-between rounded-[1.5rem] px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.22em] transition",
                          servicesRouteActive || isServicesAccordionOpen
                            ? "text-accent"
                            : "text-text/85 hover:text-accent",
                        )}
                        onClick={() =>
                          setIsServicesAccordionOpen((open) => !open)
                        }
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            "text-[0.7rem] transition duration-200",
                            isServicesAccordionOpen ? "rotate-180 text-accent" : "",
                          )}
                        >
                          <svg aria-hidden="true" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline",width:"0.7rem",height:"0.7rem"}}><path d="M1 1l4 4 4-4"/></svg>
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isServicesAccordionOpen ? (
                          <motion.div
                            id="mobile-services-menu"
                            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                            animate={shouldReduceMotion ? {} : { opacity: 1, height: "auto" }}
                            exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden px-3 pb-3"
                          >
                            <div className="flex flex-col gap-1 rounded-2xl bg-white/[0.03] p-2">
                              {serviceNavItems.map((category) => (
                                <ServiceMenuLink
                                  key={category.href}
                                  href={category.href}
                                  icon={category.icon}
                                  label={category.label}
                                  mobile
                                  onClick={closeMobileMenu}
                                />
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
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
                      aria-current={isActiveLink(item.href) ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition",
                        isActiveLink(item.href)
                          ? "border-accent/35 bg-accent/10 text-accent"
                          : "border-transparent text-text/85 hover:border-accent/30 hover:bg-accent/10 hover:text-accent",
                      )}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
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
                  href="/contact"
                  className="mt-2 w-full"
                  onClick={closeMobileMenu}
                >
                  Request project
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
    </>
  );
}
