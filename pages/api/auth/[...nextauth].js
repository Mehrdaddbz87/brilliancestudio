import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

/**
 * Wires the NextAuth catch-all route to the shared admin auth configuration.
 */
export default NextAuth(authOptions);
