import Head from "next/head";

import { LegalContent } from "@/components/legal-content";
import { PageIntro } from "@/components/page-intro";
import { getPageContent } from "@/lib/content";

export default function TermsPage({ content }) {
  return (
    <>
      <Head>
        <title>{content.seoTitle || "Terms | Brilliance Studio"}</title>
        <meta
          name="description"
          content={
            content.seoDescription ||
            "Terms and conditions for Brilliance Studio services and projects."
          }
        />
      </Head>
      <main className="overflow-x-clip pb-20">
        <PageIntro
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <section aria-label="Terms and privacy content">
          <LegalContent sections={content.sections} />
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const content = await getPageContent("terms");

  return {
    props: {
      content,
    },
  };
}
