import Head from "next/head";
import Link from "next/link";

import { Button } from "@/components/button";

/**
 * Renders a portfolio project detail page with luxury editorial layout.
 */
export function PortfolioDetailPage({ item }) {
  const title = item.title || "Project";
  const category = item.category || "Portfolio";
  const summary = item.summary || "";
  const imageUrl = item.imageUrl || null;
  const imageAlt = item.imageAlt || title;
  const seoDescription =
    item.summary ||
    `${title} - a premium renovation and design project by Brilliance Studio in Canada.`;

  return (
    <>
      <Head>
        <title>{`${title} | Brilliance Studio Portfolio`}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={`${title} | Brilliance Studio`} key="og:title" />
        <meta property="og:description" content={seoDescription} key="og:description" />
      </Head>

      <main className="overflow-x-clip">

        {/* Two-column editorial layout */}
        <div className="lg:flex lg:min-h-[calc(100vh-5rem)] lg:items-stretch">

          {/* Left: full-height sticky image */}
          <div className="relative lg:sticky lg:top-[5rem] lg:h-[calc(100vh-5rem)] lg:w-[48%] lg:shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-64 w-full object-cover sm:h-80 lg:h-full"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(185,154,69,0.22),transparent_55%)] sm:h-80 lg:h-full">
                <div className="text-center">
                  <svg aria-hidden="true" className="mx-auto h-12 w-12 text-accent/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-text/25">Project image</p>
                </div>
              </div>
            )}
            {/* Right-edge fade into black */}
            <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-background to-transparent lg:block" />
          </div>

          {/* Right: scrollable content */}
          <div className="flex-1 px-4 pb-0 pt-10 sm:px-8 lg:px-14 lg:pt-16">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-text/38">
              <Link href="/portfolio" className="transition hover:text-accent">Portfolio</Link>
              <span>/</span>
              <span className="text-text/55">{title}</span>
            </nav>

            {/* Category eyebrow + gold line */}
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              {category}
            </p>
            <div className="mt-3 h-px w-24 bg-gradient-to-r from-accent/80 to-transparent" />

            {/* Headline */}
            <h1 className="mt-6 break-words font-classic text-4xl font-black uppercase leading-[0.92] tracking-[0.03em] text-text sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {/* Summary */}
            {summary ? (
              <p className="mt-6 max-w-lg text-lg leading-8 text-text/72">
                {summary}
              </p>
            ) : null}

            {/* Metadata chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[category, "Canada", "Brilliance Studio"].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-accent/35 bg-accent/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent/85"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Project overview card */}
            <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_0_60px_rgba(185,154,69,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Project Overview
              </p>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-accent/60 to-transparent" />
              {summary ? (
                <p className="mt-5 break-words text-base leading-7 text-text/75">
                  {summary}
                </p>
              ) : (
                <p className="mt-5 text-base leading-7 text-text/50 italic">
                  Project details available upon request.
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Full-width CTA band */}
        <div className="mt-16 border-t border-accent/20 bg-[radial-gradient(circle_at_20%_50%,rgba(185,154,69,0.10),transparent_44%),rgba(255,255,255,0.02)] px-4 py-14 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Interested in a similar project?
              </p>
              <h2 className="mt-4 break-words font-classic text-3xl font-black uppercase leading-[0.92] tracking-[0.03em] text-text sm:text-4xl">
                Let&apos;s discuss your vision.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-text/70">
                Tell us about your renovation goals and we will shape a plan around your space, timeline, and budget.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/contact">Start your project</Button>
              <Button href="/portfolio" variant="ghost">All projects</Button>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
