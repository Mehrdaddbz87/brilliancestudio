import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { Button } from "@/components/button";
import { CmsSections } from "@/components/cms-sections";
import { FadeInSection } from "@/components/fade-in-section";
import { getPageContent } from "@/lib/content";

function PortfolioCard({ item }) {
  const href = item.slug ? `/portfolio/${item.slug}` : "/contact";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 0 40px rgba(185,154,69,0.22)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-accent/30 h-full"
    >
      <Link href={href} className="block h-full w-full">
        {item.image?.url ? (
          <div className="absolute inset-0">
            <Image
              src={item.image.url}
              alt={item.image.alt || item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,154,69,0.28),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-t from-accent/10 to-transparent" />

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {item.category && (
            <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent">
              {item.category}
            </p>
          )}
          <h3 className="text-xl font-bold uppercase tracking-wide text-white leading-tight">
            {item.title}
          </h3>
          {item.summary && (
            <p className="mt-2 text-sm leading-relaxed text-white/65 line-clamp-2">
              {item.summary}
            </p>
          )}
          <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-all duration-300 group-hover:tracking-[0.3em]">
            View Project &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioPage({ content }) {
  const pageDescription =
    content.description ||
    "A curated collection of transformative spaces, thoughtfully reimagined with timeless design, meticulous craftsmanship, and enduring quality.";
  const seoDescription =
    content.seoDescription ||
    "Explore our renovation and design portfolio across Canada. High-end craftsmanship and modern living spaces.";

  const items = content.items || [];

  return (
    <>
      <Head>
        <title>{content.seoTitle || "Portfolio | Brilliance Studio"}</title>
        <meta name="description" content={seoDescription} />
      </Head>
      <main className="overflow-x-clip pb-24">
        {/* ── Page Header ── */}
        <FadeInSection>
          <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              {content.eyebrow || "Portfolio"}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-text sm:text-4xl">
              OUR{" "}
              <em className="not-italic font-extrabold italic text-accent">
                Portfolio.
              </em>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text/65">
              {pageDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {content.primaryAction?.label && content.primaryAction?.href ? (
                <Button href={content.primaryAction.href}>
                  {content.primaryAction.label}
                </Button>
              ) : (
                <Button href="/contact">Discuss Your Project</Button>
              )}
              {content.secondaryAction?.label &&
              content.secondaryAction?.href ? (
                <Button href={content.secondaryAction.href} variant="ghost">
                  {content.secondaryAction.label}
                </Button>
              ) : (
                <Button href="/about" variant="ghost">
                  Meet the Studio
                </Button>
              )}
            </div>
          </section>
        </FadeInSection>

        {/* ── Portfolio Cards Grid ── */}
        <FadeInSection delay={0.08}>
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {items.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-3" style={{ gridAutoRows: "420px" }}>
                {items.map((item) => (
                  <PortfolioCard key={item.title} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-[1.5rem] border border-accent/20 bg-accent/5">
                <p className="text-sm text-text/50">No portfolio items yet.</p>
              </div>
            )}
          </section>
        </FadeInSection>

        {/* ── CTA Band ── */}
        <FadeInSection delay={0.16}>
          <section className="relative mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Radial gold glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-[600px] rounded-full bg-accent/10 blur-[120px]" />
            </div>
            <div className="relative py-16 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Craftsmanship
              </p>
              <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">
                Designed to elevate. Built to last.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text/60">
                We blend refined design with expert construction to create
                spaces that stand the test of time — in beauty, function, and
                quality.
              </p>
              <div className="mt-8 flex justify-center">
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
