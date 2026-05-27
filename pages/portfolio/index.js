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
          <h3 className="font-raleway text-xl font-semibold uppercase tracking-[0.08em] text-white leading-tight">
            {item.title}
          </h3>
          {item.summary && (
            <p className="mt-2 font-raleway text-sm font-light leading-relaxed tracking-wide text-white/65 line-clamp-2">
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
        {/* ── Portfolio Cards Grid ── */}
        <FadeInSection>
          <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
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

        {/* ── Editorial text block below grid ── */}
        <FadeInSection delay={0.1}>
          <section className="mx-auto max-w-7xl px-4 pb-4 pt-16 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              {content.eyebrow || "Portfolio"}
            </p>
            <h1 className="mt-3 font-raleway text-3xl font-semibold uppercase tracking-[0.1em] text-text sm:text-4xl">
              Our{" "}
              <span className="text-accent">Portfolio.</span>
            </h1>
            <p className="mt-5 max-w-xl font-raleway text-base font-light leading-relaxed tracking-wide text-text/65">
              {pageDescription}
            </p>
            <div className="mt-8">
              <Button href="/contact">Start Your Project</Button>
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
