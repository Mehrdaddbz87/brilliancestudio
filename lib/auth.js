import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/prisma";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email.toLowerCase().trim() !== adminEmail) return null;

        try {
          const adminCredential = await prisma.adminCredential.findUnique({
            where: { email: adminEmail },
          });

          if (adminCredential) {
            const valid = await bcrypt.compare(
              credentials.password,
              adminCredential.passwordHash
            );
            if (!valid) return null;
            return { id: "admin", email: adminEmail, name: "Admin", role: "admin" };
          }
        } catch (error) {
          console.error("Auth DB error:", error);
          // Fail closed — do not fall through to plaintext on DB error
          return null;
        }

        // Bootstrap only: allow env password if NO AdminCredential exists yet.
        // Once a password is set via reset-password, this path is never reached.
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) return null;

        const valid = await bcrypt.compare(credentials.password, adminPassword)
          .catch(() => credentials.password === adminPassword);
        if (!valid) return null;

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
