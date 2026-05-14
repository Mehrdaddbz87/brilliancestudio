import Head from "next/head";
import Link from "next/link";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { ResponsiveImage } from "@/components/responsive-image";

/**
 * Renders a database-backed service detail page for a single offering.
 */
export function ServiceDetailPage({ service }) {
  const benefits = Array.isArray(service.benefits) ? service.benefits : [];
  const extraDescriptions = Array.isArray(service.extraDescriptions)
    ? service.extraDescriptions
    : [];

  return (
    <>
      <Head>
        <title>{`${service.title} in Canada | Brilliance Studio`}</title>
        <meta
          name="description"
          content={service.seoDescription || service.description}
        />
        <meta property="og:title" content={`${service.title} | Brilliance Studio Canada`} key="og:title" />
        <meta property="og:description" content={service.seoDescription || service.description} key="og:description" />
      </Head>
      <main className="bg-black pb-20 text-white">
        <PageIntro
          eyebrow={service.eyebrow || "Services"}
          title={service.title}
          description={service.description}
          actions={
            <>
              <Button href="/contact">Start your project</Button>
              <Button href="/services" variant="ghost">All services</Button>
            </>
          }
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Service Overview
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                What to expect from our {service.title.toLowerCase()} service.
              </h2>
              {extraDescriptions.length > 0 ? (
                <div className="mt-6 space-y-5">
                  {extraDescriptions.map((paragraph, i) => (
                    <p key={i} className="text-lg leading-8 text-text/75">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-lg leading-8 text-text/75">
                  {service.description}
                </p>
              )}
            </article>

            <aside className="space-y-6">
              {benefits.length > 0 && (
                <div className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                    What you gain
                  </p>
                  <h2 className="mt-4 font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                    Key outcomes.
                  </h2>
                  <ul className="mt-6 space-y-3">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span className="text-base leading-7 text-text/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.imageUrl ? (
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
                  <ResponsiveImage
                    src={service.imageUrl}
                    alt={service.imageAlt || service.title}
                    className="group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
            </aside>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.16}>
          <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-accent/20 bg-[radial-gradient(circle_at_top,rgba(185,154,69,0.18),transparent_35%),rgba(185,154,69,0.06)] p-8 shadow-[0_0_80px_rgba(185,154,69,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Next Step
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                Ready to discuss your {service.title.toLowerCase()} project?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-text/75">
                Contact us to discuss scope, timeline, and the right design-build
                direction for your renovation goals in Canada.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact">Start your project</Button>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-text/60 transition hover:text-accent"
                >
                  ← All renovation services
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
