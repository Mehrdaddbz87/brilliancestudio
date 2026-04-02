import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

/**
 * Guards an API route so only the configured admin session can mutate content.
 */
export async function requireAdminApiSession(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user?.role === "admin") {
    return session;
  }

  res.status(401).json({ error: "Unauthorized." });
  return null;
}

/**
 * Redirects unauthenticated users to the login page before rendering admin pages.
 */
export async function requireAdminPageSession(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user?.role === "admin") {
    return { session };
  }

  const callbackUrl = encodeURIComponent(context.resolvedUrl || "/admin");

  return {
    redirect: {
      destination: `/login?callbackUrl=${callbackUrl}`,
      permanent: false,
    },
  };
}
