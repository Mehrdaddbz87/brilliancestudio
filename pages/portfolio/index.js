import Head from "next/head";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CmsSections } from "@/components/cms-sections";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { ResponsiveImage } from "@/components/responsive-image";
import { getPageContent } from "@/lib/content";

export default function PortfolioPage({ content }) {
  const pageTitle = content.title || "Our Portfolio";
  const pageDescription =
    content.description ||
    "Explore our latest renovation and design projects";
  const seoDescription =
    content.seoDescription ||
    "Explore our renovation and design portfolio across Canada. High-end craftsmanship and modern living spaces.";

  return (
    <>
      <Head>
        <title>{content.seoTitle || "Portfolio | Brilliance Studio"}</title>
        <meta name="description" content={seoDescription} />
      </Head>
      <main className="overflow-x-clip pb-20">
        <PageIntro
          eyebrow={content.eyebrow}
          title={pageTitle}
          description={pageDescription}
          actions={
            <>
              {content.primaryAction?.label && content.primaryAction?.href ? (
                <Button href={content.primaryAction.href}>
                  {content.primaryAction.label}
                </Button>
              ) : null}
              {content.secondaryAction?.label &&
              content.secondaryAction?.href ? (
                <Button href={content.secondaryAction.href} variant="ghost">
                  {content.secondaryAction.label}
                </Button>
              ) : null}
            </>
          }
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-3">
            {content.items.map((item) => (
              <Card
                key={item.title}
                eyebrow={item.category}
                title={item.title}
                description={item.summary}
                href={item.slug ? `/portfolio/${item.slug}` : "/contact"}
                cta="View project"
                media={
                  item.image?.url ? (
                    <ResponsiveImage
                      src={item.image.url}
                      alt={item.image.alt || item.title}
                      className="group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full min-h-56 rounded-[1.25rem] border border-accent/20 bg-[radial-gradient(circle_at_top,rgba(185,154,69,0.28),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                  )
                }
              />
            ))}
          </section>
        </FadeInSection>

        <FadeInSection delay={0.12}>
          <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-accent/20 bg-[radial-gradient(circle_at_top,rgba(185,154,69,0.18),transparent_35%),rgba(185,154,69,0.06)] p-8 shadow-[0_0_80px_rgba(185,154,69,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Craftsmanship
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                Designed to show transformation with quality.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-text/75">
                Our portfolio highlights renovation and design work shaped by
                precision, craftsmanship, and a modern understanding of how people
                want to live. Each project is presented as a study in thoughtful
                transformation, refined finishes, and high-end execution.
              </p>
              <div className="mt-8">
                <Button href="/contact">Start Your Project</Button>
              </div>
            </div>
          </section>
        </FadeInSection>

        <CmsSections sections={content.sections} />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const content = await getPageContent("portfolio");

  return {
    props: {
      content,
    },
  };
}
