import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

/**
 * Reuses a single Prisma client in development to avoid hot-reload connection churn.
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
