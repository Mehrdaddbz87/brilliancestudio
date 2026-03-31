import Head from "next/head";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";

/**
 * Renders a premium service detail page for a single renovation offering.
 */
export function ServiceDetailPage({ service }) {
  return (
    <>
      <Head>
        <title>{service.title} | Brilliance Studio</title>
        <meta name="description" content={service.metaDescription} />
      </Head>
      <main className="bg-black pb-20 text-white">
        <PageIntro
          eyebrow="Services"
          title={service.title}
          description={service.subtitle}
          actions={<Button href="/contact">Contact Us</Button>}
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Description
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                Built with quality, precision, and efficiency.
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-8 text-text/75">
                {service.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <aside className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Key Benefits
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                Benefits
              </h2>
              <ul className="mt-6 space-y-4">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-4 text-base leading-7 text-text/80"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.12}>
          <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Visual Section
              </p>
              <div className="mt-5 rounded-[1.5rem] border border-dashed border-accent/30 bg-black/30 px-6 py-16 text-center">
                <p className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                  CMS-ready image placeholder
                </p>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text/65">
                  This section is ready for future CMS-managed photography, renderings,
                  material studies, and before-and-after visuals for this service.
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.16}>
          <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-accent/20 bg-[radial-gradient(circle_at_top,rgba(185,154,69,0.18),transparent_35%),rgba(185,154,69,0.06)] p-8 shadow-[0_0_80px_rgba(185,154,69,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Next Step
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                Ready to discuss your project?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-text/75">
                Contact us to discuss scope, timeline, and the right design-build
                direction for your renovation goals.
              </p>
              <div className="mt-8">
                <Button href="/contact">Contact Us</Button>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
