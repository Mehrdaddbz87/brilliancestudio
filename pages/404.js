import Head from "next/head";

import { Button } from "@/components/button";
import { FadeInSection } from "@/components/fade-in-section";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Brilliance Studio</title>
        <meta name="description" content="The page you requested could not be found. Return to the Brilliance Studio homepage or contact us about your renovation project." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="overflow-x-clip px-4 py-16 sm:px-6 lg:px-8">
        <FadeInSection>
          <section className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center shadow-[0_0_80px_rgba(185,154,69,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                404
              </p>
              <h1 className="mt-5 font-fantasy text-3xl uppercase tracking-[0.08em] text-text sm:text-4xl">
                Page not found
              </h1>
              <p className="mt-6 text-lg leading-8 text-text/75">
                The requested page could not be found. Return to the homepage or
                continue to the contact page.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/">Back to Home</Button>
                <Button href="/contact" variant="ghost">
                  Contact Us
                </Button>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>
    </>
  );
}
