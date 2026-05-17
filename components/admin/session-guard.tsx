"use client";

import { signOut } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

const TIMEOUT_MS = 10 * 60 * 1000;  // 10 minutes total
const WARNING_MS = 60 * 1000;        // show warning at 1 minute remaining

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "click",
] as const;

function logout() {
  signOut({ callbackUrl: "/login" });
}

/**
 * Enforces an inactivity-based session timeout for admin routes.
 * - Signs out after 10 min of inactivity
 * - Shows a warning modal at 1 min remaining with a countdown bar
 * - Signs out immediately when the browser tab is hidden
 */
export function AdminSessionGuard() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  }, []);

  const startCountdown = useCallback(() => {
    setSecondsLeft(60);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimers();
    setShowWarning(false);

    warnTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      startCountdown();
    }, TIMEOUT_MS - WARNING_MS);

    timerRef.current = setTimeout(() => {
      logout();
    }, TIMEOUT_MS);
  }, [clearTimers, startCountdown]);

  const stayLoggedIn = useCallback(() => {
    setShowWarning(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });
    return () => {
      clearTimers();
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer, clearTimers]);


  if (!showWarning) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="session-warning-title"
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="relative w-full max-w-md rounded-[2rem] border border-accent/25 bg-[#0d0d0d] p-8 shadow-[0_0_100px_rgba(185,154,69,0.14)]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
          <svg
            aria-hidden="true"
            className="h-7 w-7 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>

        <h2
          id="session-warning-title"
          className="mt-5 font-fantasy text-2xl uppercase tracking-[0.08em] text-text"
        >
          Session expiring
        </h2>

        <p className="mt-3 text-base leading-7 text-text/70">
          You have been inactive. You will be signed out automatically in{" "}
          <span className="font-semibold text-accent">{secondsLeft}s</span>.
        </p>

        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-linear"
            style={{ width: `${(secondsLeft / 60) * 100}%` }}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={stayLoggedIn}
            className="inline-flex items-center rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent/90"
          >
            Stay logged in
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center rounded-2xl border border-white/10 px-6 py-3 text-sm font-semibold text-text/70 transition hover:border-white/20 hover:text-text"
          >
            Sign out now
          </button>
        </div>
      </div>
    </div>
  );
}
