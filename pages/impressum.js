import Head from "next/head";

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
      <main className="overflow-x-clip pb-20">
        <PageIntro
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <section aria-label="Legal company and compliance information">
          <LegalContent sections={content.sections} />
        </section>
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
