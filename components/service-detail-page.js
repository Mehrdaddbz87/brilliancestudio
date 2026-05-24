import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";

/**
 * Renders a luxury editorial service detail page for a single offering.
 */
export function ServiceDetailPage({ service }) {
  const benefits = Array.isArray(service.benefits) ? service.benefits : [];
  const descriptions = Array.isArray(service.extraDescriptions) && service.extraDescriptions.length > 0
    ? service.extraDescriptions
    : [service.description];

  return (
    <>
      <Head>
        <title>{`${service.title} in Canada | Brilliance Studio`}</title>
        <meta name="description" content={service.seoDescription || service.metaDescription || service.description} />
        <meta property="og:title" content={`${service.title} | Brilliance Studio Canada`} key="og:title" />
        <meta property="og:description" content={service.seoDescription || service.metaDescription || service.description} key="og:description" />
      </Head>
      <main className="overflow-x-clip bg-black pb-24 text-white">

        {/* ── Hero Header — left text / right image ── */}
        <FadeInSection>
          <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-20 pb-14 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* Left */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                {service.eyebrow || "Services"}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                {service.title}.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
                {service.subtitle || service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact">Start Your Project</Button>
                <Button href="/services" variant="ghost">All Services</Button>
              </div>
            </div>

            {/* Right — single image */}
            {service.imageUrl ? (
              <div className="overflow-hidden rounded-[1.5rem] border border-accent/25 shadow-[0_0_60px_rgba(185,154,69,0.12)]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={service.imageUrl}
                    alt={service.imageAlt || service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-[1.5rem] border border-accent/20 bg-[radial-gradient(circle_at_center,rgba(185,154,69,0.15),transparent_60%)]" />
            )}
          </section>
        </FadeInSection>

        {/* ── Gold divider ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-accent/20" />
        </div>

        {/* ── Content — description left / outcomes right ── */}
        <FadeInSection delay={0.08}>
          <section className="mx-auto grid max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">

            {/* Left — service description */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Service Overview
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                What to expect from this service.
              </h2>
              <div className="mt-6 space-y-5">
                {descriptions.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-white/60">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right — outcomes dash list */}
            {benefits.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                  Key Outcomes
                </p>
                <h2 className="mt-3 text-2xl font-semibold leading-snug text-white">
                  What this service delivers.
                </h2>
                <ul className="mt-8 divide-y divide-white/[0.07]">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-5 py-5">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-base font-semibold leading-none text-accent select-none"
                      >
                        &mdash;
                      </span>
                      <span className="min-w-0 break-words text-sm leading-relaxed text-white/65">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </FadeInSection>

        {/* ── Subtle divider ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-white/[0.07]" />
        </div>

        {/* ── Atmospheric CTA ── */}
        <FadeInSection delay={0.12}>
          <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Gold glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-[500px] rounded-full bg-accent/10 blur-[100px]" />
            </div>
            <div className="relative py-20 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Next Step
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to discuss your project?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/55">
                Contact us to discuss scope, timeline, and the right direction
                for your renovation goals in Canada.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <Button href="/contact">Start Your Project</Button>
                <Link
                  href="/services"
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:text-accent"
                >
                  &larr; All Services
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

      </main>
    </>
  );
}
