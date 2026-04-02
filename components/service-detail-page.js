import Head from "next/head";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { ResponsiveImage } from "@/components/responsive-image";

/**
 * Renders a database-backed service detail page for a single offering.
 */
export function ServiceDetailPage({ service }) {
  return (
    <>
      <Head>
        <title>{`${service.title} | Brilliance Studio`}</title>
        <meta
          name="description"
          content={service.seoDescription || service.description}
        />
      </Head>
      <main className="bg-black pb-20 text-white">
        <PageIntro
          eyebrow={service.eyebrow || "Services"}
          title={service.title}
          description={service.description}
          actions={<Button href="/contact">Contact Us</Button>}
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Service Overview
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                Real project-focused content managed from your local admin.
              </h2>
              <p className="mt-6 text-lg leading-8 text-text/75">
                {service.description}
              </p>
            </article>

            <aside className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Featured Visual
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                Project imagery from your admin content
              </h2>
              {service.imageUrl ? (
                <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
                  <ResponsiveImage
                    src={service.imageUrl}
                    alt={service.imageAlt || service.title}
                    className="group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <p className="mt-6 text-base leading-7 text-text/72">
                  Add an image in the admin panel to feature a service visual here.
                </p>
              )}
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
