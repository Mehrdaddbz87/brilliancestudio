import Head from "next/head";

import { FadeInSection } from "@/components/fade-in-section";
import { LegalContent } from "@/components/legal-content";
import { PageIntro } from "@/components/page-intro";
import { getPageContent } from "@/lib/content";

export default function ImprintPage({ content }) {
  return (
    <>
      <Head>
        <title>{content.seoTitle || "Imprint | Brilliance Studio"}</title>
        <meta
          name="description"
          content={
            content.seoDescription ||
            "Legal company details and required publisher information."
          }
        />
      </Head>
      <main className="pb-20">
        <PageIntro
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <FadeInSection delay={0.08}>
          <section aria-label="Legal company and compliance information">
            <LegalContent sections={content.sections} />
          </section>
        </FadeInSection>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const content = await getPageContent("impressum");

  return {
    props: {
      content,
    },
  };
}
