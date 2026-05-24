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
      <main className="min-h-screen bg-black px-4 py-10 sm:px-6 lg:px-8">

        {/* Top bar */}
        <div className="mx-auto flex max-w-6xl items-center justify-between pb-8">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-accent">
            Brilliance Studio
          </p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-text/40 transition hover:text-accent"
          >
            Sign out
          </button>
        </div>

        <section className="mx-auto max-w-6xl">
          {/* Header */}
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-text sm:text-4xl">
            Dashboard.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-text/50">
            Manage your services and portfolio content.
          </p>

          {/* Gold divider */}
          <div className="mb-10 mt-8 h-px w-full bg-accent/20" />

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_0_60px_rgba(185,154,69,0.05)] transition hover:border-accent/25 hover:shadow-[0_0_60px_rgba(185,154,69,0.1)]">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent/80">
                Services
              </p>
              <h2 className="mt-4 text-xl font-semibold text-text">
                Manage Services
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text/50">
                Update service titles, descriptions, and images shown across the site.
              </p>
              <div className="mt-7">
                <Button href="/admin/services">Open Services</Button>
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-8 shadow-[0_0_60px_rgba(185,154,69,0.05)] transition hover:border-accent/25 hover:shadow-[0_0_60px_rgba(185,154,69,0.1)]">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent/80">
                Portfolio
              </p>
              <h2 className="mt-4 text-xl font-semibold text-text">
                Manage Portfolio
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text/50">
                Add, edit, or remove portfolio projects and their images.
              </p>
              <div className="mt-7">
                <Button href="/admin/portfolio" variant="ghost">
                  Open Portfolio
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

  return { props: {} };
}
