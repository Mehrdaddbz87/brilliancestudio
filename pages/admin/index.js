import Head from "next/head";
import { signOut } from "next-auth/react";

import { Button } from "@/components/button";
import { requireAdminPageSession } from "@/lib/admin-auth";

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Admin | Brilliance Studio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Local CMS
          </p>
          <h1 className="mt-4 font-fantasy text-4xl uppercase tracking-[0.08em] text-text">
            Admin Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-text/75">
            Manage locally stored content in PostgreSQL through Prisma. Services and
            portfolio entries are now edited directly inside this project without
            any Sanity dependency.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/admin/services">Manage services</Button>
            <Button href="/admin/portfolio" variant="ghost">
              Manage portfolio
            </Button>
            <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/login" })}>
              Sign out
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Services
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-text">
                Service cards and landing content
              </h2>
              <p className="mt-4 text-base leading-7 text-text/72">
                Create, update, and delete the entries that populate the services
                overview page.
              </p>
              <div className="mt-6">
                <Button href="/admin/services">Open services admin</Button>
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Portfolio
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-text">
                Portfolio items and showcase content
              </h2>
              <p className="mt-4 text-base leading-7 text-text/72">
                Manage the project cards shown on the portfolio page with local
                PostgreSQL-backed storage.
              </p>
              <div className="mt-6">
                <Button href="/admin/portfolio" variant="ghost">
                  Open portfolio admin
                </Button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const authResult = await requireAdminPageSession(context);

  if ("redirect" in authResult) {
    return authResult;
  }

  return {
    props: {},
  };
}
