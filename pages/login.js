import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import Link from "next/link";
import { Button } from "@/components/button";
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
      <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Restricted Access
            </p>
            <h1 className="mt-5 font-fantasy text-4xl uppercase tracking-[0.08em] text-text">
              Admin Login
            </h1>


            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                  Admin Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                  placeholder="admin@example.com"
                  autoComplete="username"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                  placeholder="Your password"
                  autoComplete="current-password"
                  required
                />
              </label>

              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-text/45 transition hover:text-accent">
                  Forgot password?
                </Link>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  type="submit"
                  className={isSubmitting ? "opacity-70" : ""}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
                <Button href="/" variant="ghost">
                  Back to site
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.role === "admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

