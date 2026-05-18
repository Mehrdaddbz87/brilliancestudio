import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== adminEmail) return null;

        // Check DB hash first (set via reset-password flow)
        try {
          const adminCredential = await prisma.adminCredential.findUnique({
            where: { email: credentials.email },
          });
          if (adminCredential) {
            const valid = await bcrypt.compare(credentials.password, adminCredential.passwordHash);
            if (!valid) return null;
            return { id: "admin", email: adminEmail, name: "Admin", role: "admin" };
          }
        } catch {}

        // Fallback: plain env var password
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) return null;
        if (credentials.password !== adminPassword) return null;

        return { id: "admin", email: adminEmail, name: "Admin", role: "admin" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role || "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
};
