import Head from "next/head";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";

const principles = [
  "Minimalism with visible confidence",
  "Luxury through spacing, typography, and pace",
  "Technology that stays elegant behind the scenes",
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Brilliance Studio</title>
      </Head>
      <main className="pb-20">
        <PageIntro
          eyebrow="About"
          title="A digital studio for premium presentation."
          description="Brilliance Studio focuses on websites that feel deliberate, polished, and commercially aligned for ambitious brands."
          actions={<Button href="/contact">Start project</Button>}
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                Our Approach
              </h2>
              <p className="mt-5 text-lg leading-8 text-text/75">
                We combine brand sensitivity, editorial restraint, and modern
                implementation to create websites that look premium and perform
                with clarity. Every decision is made to support perception,
                trust, and conversion.
              </p>
            </div>

            <div className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8">
              <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                Principles
              </h2>
              <ul className="mt-5 space-y-4">
                {principles.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-base text-text/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
