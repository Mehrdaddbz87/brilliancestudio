import Head from "next/head";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { FadeInSection } from "@/components/fade-in-section";
import { Hero } from "@/components/hero";
import { ResponsiveImage } from "@/components/responsive-image";

const services = [
  {
    eyebrow: "Services",
    title: "Custom Home Design & Build",
    description:
      "Residences shaped with intention, from earliest concept through final execution, coordinated for a cohesive and elevated result.",
  },
  {
    eyebrow: "Services",
    title: "Kitchen & Bathroom Remodeling",
    description:
      "High-end remodels that balance layout efficiency, durable materials, and refined visual clarity for spaces that feel both luxurious and practical.",
  },
  {
    eyebrow: "Services",
    title: "Structural Modifications",
    description:
      "Expert structural work and framing that creates the foundation for safe, successful transformation with exacting attention to quality.",
  },
];

const portfolioProjects = [
  {
    eyebrow: "Custom Home",
    title: "Whole-Home Design & Build",
    description:
      "A complete design-build project coordinated from structural planning through final finishes, with refined materials, elevated atmosphere, and precise execution throughout.",
    href: "/portfolio/whole-home-renovation",
    image: {
      url: "/images/portfolio/whole-home-renovation.svg",
      alt: "Whole-home renovation project illustration",
    },
  },
  {
    eyebrow: "Kitchen Renovation",
    title: "Kitchen & Open-Concept Transformation",
    description:
      "Load-bearing wall removal, custom cabinetry, and a seamless open layout that connects kitchen, dining, and living spaces with a calm, modern visual clarity.",
    href: "/portfolio/kitchen-open-concept-remodel",
    image: {
      url: "/images/portfolio/kitchen-open-concept-remodel.svg",
      alt: "Kitchen and open-concept remodel project illustration",
    },
  },
  {
    eyebrow: "Basement Finishing",
    title: "Lower Level Living Suite",
    description:
      "An underused basement transformed into a polished living environment, with thoughtful lighting, premium finishes, and seamless integration with the rest of the home.",
    href: "/portfolio/basement-living-suite",
    image: {
      url: "/images/portfolio/basement-living-suite.svg",
      alt: "Basement living suite project illustration",
    },
  },
];

export default function HomePage() {
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} {...service} href="/services" />
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <section className="mx-auto mt-20 w-full max-w-7xl pb-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Portfolio
              </p>
              <h2 className="mt-4 break-words font-fantasy text-2xl uppercase tracking-[0.08em] sm:text-3xl">
                Our portfolio.
              </h2>
            </div>
            <Button href="/portfolio" variant="ghost">
              View portfolio
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolioProjects.map((reference) => (
              <Card
                key={reference.title}
                {...reference}
                cta="Case study"
                href={reference.href}
                media={
                  <ResponsiveImage
                    src={reference.image.url}
                    alt={reference.image.alt}
                    aspectRatio="aspect-[16/10]"
                    className="group-hover:scale-[1.03]"
                  />
                }
              />
            ))}
          </div>
        </section>
      </FadeInSection>
    </main>
    </>
  );
}
