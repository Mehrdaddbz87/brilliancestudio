import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { Button } from "@/components/button";
import { CmsSections } from "@/components/cms-sections";
import { FadeInSection } from "@/components/fade-in-section";
import { getPageContent } from "@/lib/content";
import { serviceNavItems, servicePages, servicePagesBySlug } from "@/lib/service-pages";

// Short nav descriptions indexed by slug for card subtitles
const navDescBySlug = Object.fromEntries(
  serviceNavItems.map((s) => [
    s.href.replace("/services/", ""),
    s.description,
  ]),
);

function ServiceCard({ service, item, size = "md" }) {
  const href = `/services/${service.slug}`;
  const imageUrl = item?.image?.url || null;
  const category = item?.eyebrow || "Services";
  const description = navDescBySlug[service.slug] || service.subtitle;

  const heightClass = {
    lg: "h-[400px]",
    md: "h-[320px]",
    sm: "h-[280px]",
  }[size];

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 0 40px rgba(185,154,69,0.20)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-[1.5rem] border border-accent/25 ${heightClass}`}
    >
      <Link href={href} className="block h-full w-full">
        {imageUrl ? (
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt={item?.image?.alt || service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,154,69,0.22),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

        {/* Hover gold shimmer */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-t from-accent/10 to-transparent" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-accent">
            {category}
          </p>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white leading-tight sm:text-base lg:text-lg">
            {service.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60 line-clamp-2">
            {description}
          </p>
          <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-all duration-300 group-hover:tracking-[0.3em]">
            Explore Service &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesPage({ content }) {
  const seoDescription =
    content.seoDescription ||
    "Premium renovation and design services in Canada for custom homes, remodels, additions, and structural transformations.";

  const serviceOverridesBySlug = Object.fromEntries(
    (content.items || [])
      .filter((item) => servicePagesBySlug[item.slug || ""])
      .map((item) => [item.slug, item]),
  );

  // Map servicePages to {service, item} pairs
  const entries = servicePages.map((service) => ({
    service,
    item: serviceOverridesBySlug[service.slug],
  }));

  // Split into layout rows: [0], [1,2], [3,4,5], [6]
  const [featured, ...rest] = entries;
  const row2 = rest.slice(0, 2);
  const row3 = rest.slice(2, 5);
  const row4 = rest.slice(5);

  return (
    <>
      <Head>
        <title>{content.seoTitle || "Services | Brilliance Studio"}</title>
        <meta name="description" content={seoDescription} />
      </Head>
      <main className="overflow-x-clip pb-24">

        {/* ── Page Header ── */}
        <FadeInSection>
          <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              {content.eyebrow || "Our Services"}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Crafted with precision.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text/60">
              {content.description ||
                "Every service we offer is designed, coordinated, and delivered to the highest standard."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {content.primaryAction?.label && content.primaryAction?.href ? (
                <Button href={content.primaryAction.href}>
                  {content.primaryAction.label}
                </Button>
              ) : (
                <Button href="/contact">Start Your Project</Button>
              )}
              {content.secondaryAction?.label && content.secondaryAction?.href ? (
                <Button href={content.secondaryAction.href} variant="ghost">
                  {content.secondaryAction.label}
                </Button>
              ) : (
                <Button href="/portfolio" variant="ghost">
                  View Portfolio
                </Button>
              )}
            </div>
          </section>
        </FadeInSection>

        {/* ── Services Editorial Grid ── */}
        <FadeInSection delay={0.08}>
          <section className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">

            {/* Row 1 — featured full-width */}
            {featured && (
              <ServiceCard
                service={featured.service}
                item={featured.item}
                size="lg"
              />
            )}

            {/* Row 2 — two equal cards */}
            {row2.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {row2.map(({ service, item }) => (
                  <ServiceCard key={service.slug} service={service} item={item} size="md" />
                ))}
              </div>
            )}

            {/* Row 3 — three equal cards */}
            {row3.length > 0 && (
              <div className="grid gap-5 md:grid-cols-3">
                {row3.map(({ service, item }) => (
                  <ServiceCard key={service.slug} service={service} item={item} size="sm" />
                ))}
              </div>
            )}

            {/* Row 4 — remaining card(s) at ~50% width */}
            {row4.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {row4.map(({ service, item }) => (
                  <ServiceCard key={service.slug} service={service} item={item} size="sm" />
                ))}
              </div>
            )}

          </section>
        </FadeInSection>

        <CmsSections sections={content.sections} />
      </main>
    </>
  );
}

export async function getServerSideProps(context = {}) {
  context?.res?.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  const content = await getPageContent("services");

  return {
    props: { content },
  };
}
