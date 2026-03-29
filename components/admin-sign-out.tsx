"use client";

import { signOut } from "next-auth/react";

/**
 * Signs the current admin user out and returns them to the login screen.
 */
export function AdminSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-text transition duration-300 hover:border-accent hover:text-accent"
    >
      Sign out
    </button>
  );
}
