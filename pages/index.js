import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { FadeInSection } from "@/components/fade-in-section";
import { Hero } from "@/components/hero";

const services = [
  {
    eyebrow: "Services",
    title: "Brand Websites",
    description:
      "Editorial, conversion-aware websites with an elevated visual language and a clear premium positioning.",
  },
  {
    eyebrow: "Services",
    title: "Creative Direction",
    description:
      "Luxury-first visual systems, content hierarchy, and interface refinement for high-value brand perception.",
  },
  {
    eyebrow: "Services",
    title: "Launch Support",
    description:
      "Technical implementation, performance tuning, and structured delivery for confident go-live moments.",
  },
];

const references = [
  {
    eyebrow: "References",
    title: "Maison Aurelia",
    description:
      "An immersive launch presence for a premium lifestyle label with cinematic pacing and a tailored story flow.",
  },
  {
    eyebrow: "References",
    title: "Velour Residence",
    description:
      "A luxury property presentation focused on atmosphere, trust, and elegant conversion paths for inquiries.",
  },
  {
    eyebrow: "References",
    title: "Noir Atelier",
    description:
      "A restrained portfolio experience crafted for a high-end creative practice and selective client acquisition.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <Hero />

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
                References
              </p>
              <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.1em] sm:text-4xl">
                Selected visual directions.
              </h2>
            </div>
            <Button href="/references" variant="ghost">
              View gallery
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {references.map((reference) => (
              <Card
                key={reference.title}
                {...reference}
                cta="Case study"
                href="/references"
              >
                <div className="h-44 rounded-[1.25rem] border border-accent/20 bg-gradient-to-br from-accent/20 via-transparent to-white/5" />
              </Card>
            ))}
          </div>
        </section>
      </FadeInSection>
    </main>
  );
}
