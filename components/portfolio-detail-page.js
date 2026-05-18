import Head from "next/head";
import Link from "next/link";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { ResponsiveImage } from "@/components/responsive-image";

/**
 * Renders a portfolio project detail page with image, description, and CTA.
 */
export function PortfolioDetailPage({ item }) {
  const title = item.title || "Project";
  const category = item.category || "Portfolio";
  const summary = item.summary || "";
  const imageUrl = item.imageUrl || null;
  const imageAlt = item.imageAlt || title;
  const seoDescription =
    item.summary ||
    `${title} — a premium renovation and design project by Brilliance Studio in Canada.`;

  return (
    <>
      <Head>
        <title>{`${title} | Brilliance Studio Portfolio`}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={`${title} | Brilliance Studio`} key="og:title" />
        <meta property="og:description" content={seoDescription} key="og:description" />
      </Head>

      <main className="overflow-x-hidden pb-20">

        {/* Page header — breadcrumb + title only, no duplicate summary */}
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-text/45 transition hover:text-accent"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 3L5 8l5 5" />
            </svg>
            Portfolio
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {category}
          </p>
          <h1 className="mt-4 break-words font-fantasy text-4xl uppercase tracking-[0.1em] text-text sm:text-5xl">
            {title}
          </h1>
        </div>

        {/* Main content — image left, details right */}
        <FadeInSection delay={0.06}>
          <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

              {/* Image */}
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/20">
                {imageUrl ? (
                  <ResponsiveImage
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full"
                    aspectRatio="aspect-[4/3]"
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(185,154,69,0.22),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]">
                    <div className="text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.06]">
                        <svg
                          aria-hidden="true"
                          className="h-8 w-8 text-accent/40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-text/25">
                        Project image
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right column — project details + single CTA */}
              <div className="space-y-5">

                {/* Project info card — summary shown here only */}
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_60px_rgba(185,154,69,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                    Project Overview
                  </p>
                  <h2 className="mt-4 break-words font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                    About this project
                  </h2>
                  {summary ? (
                    <p className="mt-5 break-words text-base leading-7 text-text/75">
                      {summary}
                    </p>
                  ) : null}

                  <div className="mt-6 border-t border-white/[0.06] pt-6">
                    <dl className="space-y-3">
                      <div className="flex items-start gap-3">
                        <dt className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-text/40">
                          Category
                        </dt>
                        <dd className="min-w-0 break-words text-sm text-text/75">{category}</dd>
                      </div>
                      <div className="flex items-start gap-3">
                        <dt className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-text/40">
                          Studio
                        </dt>
                        <dd className="text-sm text-text/75">Brilliance Studio</dd>
                      </div>
                      <div className="flex items-start gap-3">
                        <dt className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-text/40">
                          Region
                        </dt>
                        <dd className="text-sm text-text/75">Canada</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Single CTA card */}
                <div className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                    Interested in a similar project?
                  </p>
                  <h2 className="mt-4 break-words font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                    Let&apos;s discuss your vision.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-text/72">
                    Tell us about your renovation goals and we will shape a
                    plan around your space, timeline, and budget.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/contact">Start your project</Button>
                    <Button href="/portfolio" variant="ghost">
                      All projects
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
