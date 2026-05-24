import Head from "next/head";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { authOptions } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const callbackUrl =
      typeof router.query.callbackUrl === "string"
        ? router.query.callbackUrl
        : "/admin";

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (result?.error) {
      setError("Invalid admin credentials.");
      setIsSubmitting(false);
      return;
    }

    await router.push(result?.url || callbackUrl);
  }

  return (
    <>
      <Head>
        <title>Admin Login | Brilliance Studio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)] sm:p-10">

          {/* Brand */}
          <div className="mb-8 text-center">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-accent">
              Brilliance Studio
            </p>
            <div className="mx-auto mt-3 h-px w-12 bg-accent/50" />
            <h1 className="mt-5 text-2xl font-semibold text-text">
              Admin Login
            </h1>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-text/50">
                Admin Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/25 focus:border-accent/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30"
                placeholder="Enter your admin email"
                autoComplete="username"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-text/50">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text outline-none transition placeholder:text-text/25 focus:border-accent/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-accent/30"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-text/40 transition hover:text-accent"
              >
                Forgot password?
              </Link>
            </div>

            {error ? (
              <p className="text-sm text-red-300" role="alert">{error}</p>
            ) : null}

            {/* Primary action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full border border-accent bg-accent py-3 text-sm font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_0_24px_rgba(185,154,69,0.2)] transition duration-300 hover:bg-transparent hover:text-accent disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            {/* Secondary link */}
            <div className="pt-1 text-center">
              <Link
                href="/"
                className="text-xs text-text/35 transition hover:text-accent"
              >
                &larr; Back to site
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.role === "admin") {
    return {
      redirect: { destination: "/admin", permanent: false },
    };
  }

  return { props: {} };
}
