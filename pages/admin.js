import dynamic from "next/dynamic";
import Head from "next/head";

import { Button } from "@/components/button";
import studioConfig from "@/sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((module) => module.NextStudio),
  { ssr: false },
);

const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
const hasStudioConfig = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export default function AdminPage() {
  if (!hasStudioConfig) {
    return (
      <>
        <Head>
          <title>Admin | Brilliance Studio</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>

        <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-8 sm:px-6 lg:px-8">
          <section className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Admin setup
              </p>
              <h1 className="mt-5 font-fantasy text-4xl uppercase tracking-[0.08em] text-text">
                Sanity Studio variables missing
              </h1>
              <p className="mt-6 text-lg leading-8 text-text/75">
                Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and
                `NEXT_PUBLIC_SANITY_DATASET` for the embedded Studio at
                `/admin`.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {studioUrl ? (
                  <Button href={studioUrl} variant="ghost">
                    Open standalone studio
                  </Button>
                ) : null}
                <Button href="/services">View services page</Button>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin | Brilliance Studio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <NextStudio config={studioConfig} />
    </>
  );
}
