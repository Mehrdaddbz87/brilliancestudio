import Head from "next/head";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";
import { PageIntro } from "@/components/page-intro";

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
      <main className="bg-black pb-20 text-white">
        <PageIntro
          eyebrow="About Us"
          title="About Us"
          description="We design. We build. We transform."
          actions={<Button href="/contact">Start project</Button>}
        />

        <FadeInSection delay={0.08}>
          <section className="mx-auto mt-12 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
              <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                Company Introduction
              </h2>
              <p className="mt-5 text-lg leading-8 text-text/75">
                Brilliance Studio creates modern renovation and design experiences
                for clients who want spaces to feel elevated, efficient, and built
                with long-term value in mind. We combine design sensitivity with
                practical execution so the finished result looks refined and works
                beautifully in everyday life.
              </p>
              <p className="mt-5 text-lg leading-8 text-text/75">
                From planning and visual direction to material-led decision making,
                we shape interiors and renovations with a restrained luxury mindset
                suited to contemporary Canadian living.
              </p>
            </div>

            <div className="rounded-[2rem] border border-accent/20 bg-accent/[0.06] p-8">
              <h2 className="font-fantasy text-2xl uppercase tracking-[0.08em] text-text">
                Brand Statement
              </h2>
              <p className="mt-5 text-lg leading-8 text-text/80">
                We believe transformation is not about excess. It is about
                thoughtful design, disciplined building, and details that raise the
                quality of daily living.
              </p>
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  Brilliance Studio
                </p>
                <p className="mt-3 text-base leading-7 text-text/75">
                  A high-end renovation and design partner focused on precision,
                  craftsmanship, and calm, modern transformation.
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.12}>
          <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.05)]">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  Core Values
                </p>
                <h2 className="mt-4 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
                  Built on clear standards.
                </h2>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {values.map((value) => (
                  <article
                    key={value.title}
                    className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5"
                  >
                    <h3 className="font-fantasy text-xl uppercase tracking-[0.08em] text-accent">
                      {value.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-text/72">
                      {value.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
