import Head from "next/head";
import { ChefHat, Hammer, Home, Layers3, ShowerHead } from "lucide-react";

function KitchenBathIcon({ className, strokeWidth, ...props }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true" {...props}>
      <ChefHat className="h-[1.1rem] w-[1.1rem]" strokeWidth={strokeWidth} />
      <span className="h-5 w-px shrink-0 bg-accent/50" />
      <ShowerHead className="h-[1.1rem] w-[1.1rem]" strokeWidth={strokeWidth} />
    </span>
  );
}

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { Hero } from "@/components/hero";
import { getPageContent } from "@/lib/content";

const services = [
  {
    label: "Design + Build",
    icon: Home,
    title: "Custom Home Design & Build",
    description:
      "Residences shaped with intention, from earliest concept through final execution, coordinated for a cohesive and elevated result.",
    href: "/services/custom-home-design-build",
  },
  {
    label: "Remodel",
    icon: KitchenBathIcon,
    title: "Kitchen & Bathroom Remodeling",
    description:
      "High-end remodels that balance layout efficiency, durable materials, and refined visual clarity for spaces that feel both luxurious and practical.",
    href: "/services/kitchen-remodeling",
  },
  {
    label: "Structure",
    icon: Hammer,
    title: "Structural Modifications",
    description:
      "Expert structural work and framing that creates the foundation for safe, successful transformation with exacting attention to quality.",
    href: "/services/structural-modifications-framing",
  },
  {
    label: "Lower Level",
    icon: Layers3,
    title: "Basement Finishing",
    description:
      "Underused lower levels transformed into polished living environments with comfort, lighting, and everyday function.",
    href: "/services/basement-finishing",
  },
];

export default function HomePage({ portfolioProjects }) {
  return (
    <>
      <Head>
        <title>Brilliance Studio | Premium Home Renovation & Design in Canada</title>
        <meta name="description" content="Brilliance Studio is a premium renovation and design studio crafting elevated living spaces across Canada, including custom homes, kitchen remodels, bathroom renovations, home additions, basement finishing, and structural transformations." />
        <meta property="og:title" content="Brilliance Studio | Premium Home Renovation & Design in Canada" key="og:title" />
        <meta property="og:description" content="Premium renovation and design studio in Canada. Custom homes, kitchen and bathroom remodels, additions, structural work, and basement finishing crafted with precision and refined materials." key="og:description" />
      </Head>
    <main className="overflow-x-clip bg-background px-4 py-10 sm:px-6 lg:px-8">
      <Hero />

      <FadeInSection delay={0.05}>
        <section className="mx-auto mt-14 w-full max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Services
              </p>
              <h2 className="mt-4 break-words font-fantasy text-2xl uppercase tracking-[0.08em] sm:text-3xl">
                What we build with precision.
              </h2>
            </div>
            <Button href="/services" variant="ghost">
              All services
            </Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            {(() => {
              const [featuredService, ...secondaryServices] = services;
              const FeaturedIcon = featuredService.icon;

              return (
                <>
                  <article className="group relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-accent/65 bg-[radial-gradient(circle_at_8%_12%,rgba(185,154,69,0.24),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-8 shadow-[0_0_105px_rgba(185,154,69,0.14)] transition duration-500 hover:-translate-y-1 hover:border-accent/90 hover:bg-white/[0.05] sm:p-10 lg:min-h-[31rem]">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100"
                    />
                    {/* Real wireframe house image - positioned right half */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 right-0 h-full w-[68%] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-90"
                      style={{
                        backgroundImage: "url('/images/house-wireframe-gold.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center left",
                        opacity: 0.72,
                        maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 22%, black 55%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 22%, black 55%)",
                      }}
                    />

                    <div className="relative max-w-[29rem]">
                      <div className="relative mb-10 inline-flex h-20 w-20 items-center justify-center rounded-full border border-accent/80 bg-black/35 text-accent shadow-[0_0_50px_rgba(185,154,69,0.25)]">
                        <span
                          aria-hidden="true"
                          className="absolute -right-1 top-1 h-4 w-4 rounded-full bg-accent/80 blur-[2px]"
                        />
                        <FeaturedIcon aria-hidden="true" className="h-9 w-9" strokeWidth={1.5} />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                        {featuredService.label}
                      </p>
                      <h3 className="mt-5 max-w-md break-words font-classic text-2xl uppercase leading-tight tracking-[0.02em] text-text sm:text-4xl sm:leading-[0.95] lg:text-5xl">
                        {featuredService.title}
                      </h3>
                      <div className="mt-6 h-px w-28 bg-gradient-to-r from-accent/80 to-transparent" />
                      <p className="mt-6 max-w-sm text-lg leading-8 text-text/78">
                        {featuredService.description}
                      </p>
                      <a
                        href={featuredService.href}
                        className="mt-10 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent transition hover:gap-5 hover:text-text"
                      >
                        Explore service
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </article>

                  <div className="grid gap-4">
                    {secondaryServices.map((service) => {
                      const Icon = service.icon;

                      return (
                        <a
                          key={service.title}
                          href={service.href}
                          className="group relative min-h-[9.65rem] overflow-hidden rounded-[1.75rem] border border-accent/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-6 shadow-[0_0_50px_rgba(185,154,69,0.06)] transition duration-500 hover:-translate-y-1 hover:border-accent/70 hover:bg-white/[0.055] hover:shadow-[0_22px_70px_rgba(185,154,69,0.16)] sm:p-7"
                        >
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-6 left-28 w-px bg-gradient-to-b from-transparent via-accent/35 to-transparent"
                          />
                          <div className="relative flex items-center gap-7">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-accent/45 bg-black/30 text-accent shadow-[0_0_34px_rgba(185,154,69,0.08)] transition duration-300 group-hover:border-accent/80 group-hover:bg-accent/10 group-hover:shadow-[0_0_44px_rgba(185,154,69,0.18)]">
                              <Icon aria-hidden="true" className="h-9 w-9" strokeWidth={1.45} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                                {service.label}
                              </p>
                              <h3 className="mt-3 break-words font-classic text-lg uppercase leading-tight tracking-[0.02em] text-text sm:text-2xl lg:text-3xl lg:leading-[0.95]">
                                {service.title}
                              </h3>
                              <p className="mt-3 line-clamp-2 text-base leading-7 text-text/72">
                                {service.description}
                              </p>
                            </div>
                            <span
                              aria-hidden="true"
                              className="text-3xl text-accent transition duration-300 group-hover:translate-x-1.5 group-hover:text-text"
                            >
                              →
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="mx-auto mt-20 w-full max-w-7xl pb-20">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Portfolio
              </p>
              <h2 className="mt-3 break-words font-classic text-3xl font-black uppercase leading-[0.95] tracking-[0.03em] sm:text-4xl">
                Our{" "}
                <em className="font-light not-italic italic text-accent">
                  Portfolio.
                </em>
              </h2>
            </div>
            <Button href="/portfolio" variant="ghost">
              View portfolio
            </Button>
          </div>

          {/* Asymmetric grid: 1 large + 2 stacked */}
          {portfolioProjects.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              {/* Featured large card */}
              {(() => {
                const featured = portfolioProjects[0];
                const rest = portfolioProjects.slice(1);
                return (
                  <>
                    <a
                      href={featured.slug ? `/portfolio/${featured.slug}` : "/portfolio"}
                      className="group relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-accent/30 transition duration-500 hover:border-accent/70 hover:shadow-[0_30px_90px_rgba(185,154,69,0.14)] lg:min-h-[36rem]"
                    >
                      {featured.image?.url ? (
                        <img
                          src={featured.image.url}
                          alt={featured.image.alt || featured.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-white/5" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                          {featured.category}
                        </p>
                        <h3 className="mt-3 break-words font-classic text-xl font-black uppercase leading-tight tracking-[0.03em] text-white sm:text-3xl sm:leading-[0.95] lg:text-4xl">
                          {featured.title}
                        </h3>
                        {featured.summary ? (
                          <p className="mt-3 line-clamp-2 max-w-lg text-base leading-7 text-white/68">
                            {featured.summary}
                          </p>
                        ) : null}
                        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent transition duration-300 group-hover:gap-4">
                          Case study
                          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                        </span>
                      </div>
                    </a>

                    {/* Two smaller stacked cards */}
                    <div className="grid gap-4">
                      {rest.map((ref) => (
                        <a
                          key={ref.title}
                          href={ref.slug ? `/portfolio/${ref.slug}` : "/portfolio"}
                          className="group relative overflow-hidden rounded-[1.75rem] border border-accent/25 transition duration-500 hover:border-accent/65 hover:shadow-[0_22px_70px_rgba(185,154,69,0.12)]"
                          style={{ minHeight: "calc(50% - 0.5rem)" }}
                        >
                          {ref.image?.url ? (
                            <img
                              src={ref.image.url}
                              alt={ref.image.alt || ref.title}
                              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-white/5" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                              {ref.category}
                            </p>
                            <h3 className="mt-2 break-words font-classic text-base font-black uppercase leading-tight tracking-[0.03em] text-white sm:text-xl sm:leading-[0.95]">
                              {ref.title}
                            </h3>
                            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent transition duration-300 group-hover:gap-3">
                              Case study
                              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : null}
        </section>
      </FadeInSection>
    </main>
    </>
  );
}

export async function getServerSideProps() {
  const portfolioContent = await getPageContent("portfolio");

  return {
    props: {
      portfolioProjects: (portfolioContent?.items || []).slice(0, 3),
    },
  };
}
