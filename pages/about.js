import Head from "next/head";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";

const values = [
  {
    title: "Precision",
    description:
      "We plan carefully, detail thoroughly, and execute with clarity so every renovation decision supports the final atmosphere.",
  },
  {
    title: "Craftsmanship",
    description:
      "Premium spaces are built through disciplined materials, considered layouts, and finishes that feel timeless rather than temporary.",
  },
  {
    title: "Efficiency",
    description:
      "We value clean coordination, realistic planning, and focused delivery to keep ambitious transformations moving with confidence.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Brilliance Studio | Luxury Home Renovation & Design in Canada</title>
        <meta name="description" content="Brilliance Studio is a Canada-based premium renovation and design studio pairing refined interiors with disciplined construction planning. Precision, craftsmanship, and calm coordination in every project." />
        <meta property="og:title" content="About Brilliance Studio | Luxury Home Renovation & Design in Canada" key="og:title" />
        <meta property="og:description" content="Premium renovation and design studio in Canada. Precision, craftsmanship, and calm coordination from concept to completion." key="og:description" />
      </Head>
      <main className="overflow-x-clip bg-black pb-24 text-white">

        {/* ── Page Header ── */}
        <FadeInSection>
          <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              About Us
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              We design. We build. We transform.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              A Canadian renovation and design studio built on precision,
              craftsmanship, and a quiet commitment to quality.
            </p>
            <div className="mt-8">
              <Button href="/contact">Start Your Project</Button>
            </div>
          </section>
        </FadeInSection>

        {/* ── Gold Divider ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-accent/20" />
        </div>

        {/* ── Our Story — Two-column editorial ── */}
        <FadeInSection delay={0.06}>
          <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Our Story
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                Brilliance Studio creates spaces that feel elevated, efficient,
                and built to last.
              </h2>
            </div>
            <div className="space-y-5 pt-1">
              <p className="text-base leading-relaxed text-white/60">
                Brilliance Studio creates modern renovation and design
                experiences for clients who want spaces to feel elevated,
                efficient, and built with long-term value in mind. We combine
                design sensitivity with practical execution so the finished
                result looks refined and works beautifully in everyday life.
              </p>
              <p className="text-base leading-relaxed text-white/60">
                From planning and visual direction to material-led decision
                making, we shape interiors and renovations with a restrained
                luxury mindset suited to contemporary Canadian living.
              </p>
            </div>
          </section>
        </FadeInSection>

        {/* ── Subtle divider ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-white/[0.07]" />
        </div>

        {/* ── Brand Statement — Pull Quote ── */}
        <FadeInSection delay={0.08}>
          <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <span
              aria-hidden="true"
              className="text-5xl font-serif leading-none text-accent/40 select-none"
            >
              &ldquo;
            </span>
            <blockquote className="mt-2 text-xl font-medium leading-relaxed text-white/85 sm:text-2xl">
              We believe transformation is not about excess. It is about
              thoughtful design, disciplined building, and details that raise
              the quality of daily living.
            </blockquote>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              &mdash; Brilliance Studio
            </p>
          </section>
        </FadeInSection>

        {/* ── Subtle divider ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-white/[0.07]" />
        </div>

        {/* ── Core Values — Open editorial ── */}
        <FadeInSection delay={0.1}>
          <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Core Values
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug text-white sm:text-3xl">
                Built on clear standards.
              </h2>
            </div>
            <ul className="divide-y divide-white/[0.07]">
              {values.map((value) => (
                <li key={value.title} className="flex items-start gap-5 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-base font-semibold leading-none text-accent select-none"
                  >
                    &mdash;
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.25em] text-accent">
                      {value.title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-white/60">
                      {value.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </FadeInSection>

      </main>
    </>
  );
}
