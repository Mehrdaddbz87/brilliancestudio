import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (_) {}
    setStatus("success");
    setIsSubmitting(false);
  }

  return (
    <>
      <Head>
        <title>Forgot Password | Brilliance Studio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Admin Access</p>
            <h1 className="mt-5 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">Reset Password</h1>
            {status === "success" ? (
              <div className="mt-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                  <svg className="h-7 w-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="mt-5 text-lg leading-8 text-text/75">If an account with that email exists, a reset link has been sent. Check your inbox.</p>
                <p className="mt-2 text-sm text-text/50">The link expires in 1 hour.</p>
                <div className="mt-8"><Button href="/login" variant="ghost">Back to login</Button></div>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">Admin Email</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your admin email" className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]" required autoComplete="email" />
                </label>
                <div className="flex flex-wrap gap-4">
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send reset link"}</Button>
                  <Link href="/login" className="inline-flex items-center text-sm text-text/50 transition hover:text-accent">Back to login</Link>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
