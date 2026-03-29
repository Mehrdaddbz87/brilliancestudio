import Head from "next/head";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CmsSections } from "@/components/cms-sections";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { ResponsiveImage } from "@/components/responsive-image";
import { getPageContent } from "@/lib/sanity";

export default function ServicesPage({ content }) {
  return (
    <>
      <Head>
        <title>{content.seoTitle || "Services | Brilliance Studio"}</title>
        <meta
          name="description"
          content={
            content.seoDescription ||
            "Premium web strategy, design systems, and modern development services."
          }
        />
      </Head>
      <main className="pb-20">
        <PageIntro
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
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
                eyebrow={item.eyebrow}
                title={item.title}
                description={item.description}
                href="/contact"
                cta="Start project"
                media={
                  item.image?.url ? (
                    <ResponsiveImage
                      src={item.image.url}
                      alt={item.image.alt || item.title}
                      className="group-hover:scale-[1.03]"
                    />
                  ) : null
                }
              />
            ))}
          </section>
        </FadeInSection>

        <CmsSections sections={content.sections} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const content = await getPageContent("services");

  return {
    props: {
      content,
    },
  };
}
