// src/lib/prisma.ts
// Singleton PrismaClient — prevents new connections on every hot-reload in dev.
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // trim to ["error"] in production if noisy
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
