import Head from "next/head";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CmsSections } from "@/components/cms-sections";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";
import { ResponsiveImage } from "@/components/responsive-image";
import { getPageContent } from "@/lib/content";
import { servicePages, servicePagesBySlug } from "@/lib/service-pages";

export default function ServicesPage({ content }) {
  const serviceOverridesBySlug = Object.fromEntries(
    (content.items || [])
      .filter((item) => servicePagesBySlug[item.slug || ""])
      .map((item) => [item.slug, item]),
  );

  return (
    <>
      <Head>
        <title>{content.seoTitle || "Services | Brilliance Studio"}</title>
        <meta
          name="description"
          content={
            content.seoDescription ||
            "Premium renovation and design services in Canada for custom homes, remodels, additions, and structural transformations."
          }
        />
      </Head>
      <main className="overflow-x-clip pb-20">
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

        {(!Array.isArray(content.items) || content.items.length > 0) && (
        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8 xl:grid-cols-3">
            {servicePages.map((service) => {
              const item = serviceOverridesBySlug[service.slug];

              return (
                <Card
                  key={service.slug}
                  eyebrow={item?.eyebrow || "Services"}
                  title={service.title}
                  description={item?.description || service.description[0]}
                  href={`/services/${service.slug}`}
                  cta="Explore service"
                  media={
                    item?.image?.url ? (
                      <ResponsiveImage
                        src={item.image.url}
                        alt={item.image.alt || service.title}
                        className="group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="h-full min-h-64 rounded-[1.5rem] border border-dashed border-accent/30 bg-black/20" />
                    )
                  }
                />
              );
            })}
          </section>
        </FadeInSection>
        )}

        <CmsSections sections={content.sections} />
      </main>
    </>
  );
}

export async function getServerSideProps(context = {}) {
  context?.res?.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const content = await getPageContent("services");

  return {
    props: {
      content,
    },
  };
}
