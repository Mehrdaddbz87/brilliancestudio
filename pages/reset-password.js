import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";

const RULES = [
  { id: "length",  label: "At least 12 characters",           test: (p) => p.length >= 12 },
  { id: "letter",  label: "Contains a letter (a-z or A-Z)",   test: (p) => /[a-zA-Z]/.test(p) },
  { id: "number",  label: "Contains a number (0-9)",          test: (p) => /[0-9]/.test(p) },
  { id: "special", label: "Contains a special character",     test: (p) => /[^a-zA-Z0-9]/.test(p) },
];

function RuleItem({ label, passed }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${passed ? "bg-emerald-500/20" : "bg-white/[0.06]"}`}>
        {passed ? (
          <svg className="h-2.5 w-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="h-1 w-1 rounded-full bg-white/20" />
        )}
      </span>
      <span className={passed ? "text-emerald-400" : "text-text/50"}>{label}</span>
    </li>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const rules = RULES.map((r) => ({ ...r, passed: r.test(password) }));
  const allRulesPassed = rules.every((r) => r.passed);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const mismatch = confirmPassword && password !== confirmPassword;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!allRulesPassed) return;
    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Failed to reset password." });
      } else {
        setStatus({ type: "success", message: "Password updated successfully." });
        setTimeout(() => router.push("/login"), 2500);
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Set New Password | Brilliance Studio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[70vh] max-w-4xl place-items-center">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(185,154,69,0.06)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Admin Access</p>
            <h1 className="mt-5 font-fantasy text-3xl uppercase tracking-[0.08em] text-text">
              Set New Password
            </h1>

            {status.type === "success" ? (
              <div className="mt-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
                  <svg className="h-7 w-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-5 text-lg text-text/75">{status.message}</p>
                <p className="mt-2 text-sm text-text/45">Redirecting to login…</p>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>

                {/* New Password */}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    New Password
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 12 characters"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:border-accent focus:bg-white/[0.06]"
                    autoComplete="new-password"
                  />
                </label>

                {/* Password rules — real-time */}
                {password.length > 0 && (
                  <ul className="space-y-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
                    {rules.map((r) => <RuleItem key={r.id} label={r.label} passed={r.passed} />)}
                  </ul>
                )}

                {/* Confirm Password */}
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-text/65">
                    Confirm Password
                  </span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-base text-text outline-none transition focus:bg-white/[0.06] ${
                      mismatch ? "border-red-300/70 focus:border-red-300/70" : passwordsMatch ? "border-emerald-400/50 focus:border-emerald-400/50" : "border-white/10 focus:border-accent"
                    }`}
                    autoComplete="new-password"
                  />
                  {mismatch && (
                    <p className="mt-2 text-sm text-red-300">Passwords do not match.</p>
                  )}
                  {passwordsMatch && (
                    <p className="mt-2 text-sm text-emerald-400">Passwords match.</p>
                  )}
                </label>

                {status.type === "error" && (
                  <p className="text-sm text-red-300" role="alert">{status.message}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !allRulesPassed || !passwordsMatch}
                >
                  {isSubmitting ? "Saving..." : "Set new password"}
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
