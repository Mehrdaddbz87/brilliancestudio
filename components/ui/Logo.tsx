"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  priority?: boolean;
  className?: string;
  variant?: "default" | "light" | "dark";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const ALT_TEXT = "Brilliance Studio - Home Renovation & Design";

/**
 * Renders the site logo with optimized image loading and a graceful text fallback.
 */
export function Logo({
  href = "/",
  priority = true,
  className,
  variant = "default",
  onClick,
}: LogoProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <Link
      href={href}
      aria-label="Go to homepage"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center rounded-2xl px-1 py-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-accent/70 focus:ring-offset-2 focus:ring-offset-background",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {hasImageError ? (
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 font-fantasy text-base uppercase tracking-[0.24em] text-accent transition duration-300 group-hover:border-accent/70 group-hover:bg-accent/15 sm:h-11 sm:w-11">
            BS
          </span>
        ) : (
          <div
            className={cn(
              "relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-accent/35 bg-black/40 transition duration-300 group-hover:opacity-90 group-hover:shadow-[0_0_22px_rgba(185,154,69,0.22)] sm:h-11 sm:w-11",
              variant === "light" && "brightness-110 contrast-110",
              variant === "dark" && "brightness-90",
            )}
          >
            <Image
              src="/images/logo.jpg"
              alt={ALT_TEXT}
              fill
              priority={priority}
              sizes="(max-width: 640px) 40px, 44px"
              className="object-cover"
              onError={() => setHasImageError(true)}
            />
          </div>
        )}

        <div>
          <p className="font-fantasy text-base uppercase tracking-[0.18em] text-text transition duration-300 group-hover:text-accent sm:text-lg">
            Brilliance Studio
          </p>
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-text/55 sm:text-xs">
            High-End Digital Presence
          </p>
        </div>
      </div>
    </Link>
  );
}
