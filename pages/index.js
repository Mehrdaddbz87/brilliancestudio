import Head from "next/head";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { FadeInSection } from "@/components/fade-in-section";
import { Hero } from "@/components/hero";
import { ScrollIndicator } from "@/components/scroll-indicator";

const services = [
  {
    eyebrow: "Services",
    title: "Custom Home Design & Build",
    description:
      "Residences shaped with intention — from earliest concept through final execution, coordinated for a cohesive and elevated result.",
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
      "A complete design-build project coordinated from structural planning through final finishes — refined materials, elevated atmosphere, and precise execution throughout.",
  },
  {
    eyebrow: "Kitchen Renovation",
    title: "Kitchen & Open-Concept Transformation",
    description:
      "Load-bearing wall removal, custom cabinetry, and a seamless open layout that connects kitchen, dining, and living spaces with a calm, modern visual clarity.",
  },
  {
    eyebrow: "Basement Finishing",
    title: "Lower Level Living Suite",
    description:
      "An underused basement transformed into a polished living environment — thoughtful lighting, premium finishes, and seamless integration with the rest of the home.",
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Brilliance Studio | Premium Home Renovation & Design in Canada</title>
        <meta name="description" content="Brilliance Studio is a premium renovation and design studio crafting elevated living spaces across Canada — custom homes, kitchen remodels, bathroom renovations, home additions, basement finishing, and structural transformations." />
        <meta property="og:title" content="Brilliance Studio | Premium Home Renovation & Design in Canada" key="og:title" />
        <meta property="og:description" content="Premium renovation and design studio in Canada. Custom homes, kitchen & bathroom remodels, additions, structural work, and basement finishing — crafted with precision and refined materials." key="og:description" />
      </Head>
    <main className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <Hero />
      <ScrollIndicator />

      <FadeInSection delay={0.05}>
        <section className="mx-auto mt-14 w-full max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Services
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.1em] sm:text-4xl">
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
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.1em] sm:text-4xl">
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
                href="/portfolio"
              >
                <div className="h-44 rounded-[1.25rem] border border-accent/20 bg-gradient-to-br from-accent/20 via-transparent to-white/5" />
              </Card>
            ))}
          </div>
        </section>
      </FadeInSection>
    </main>
    </>
  );
}
