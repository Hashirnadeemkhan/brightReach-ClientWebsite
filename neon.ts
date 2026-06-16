import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  // Surfaced early in server logs if the env var is missing.
  console.warn("DATABASE_URL is not set — Neon queries will fail.");
}

// Tagged-template `sql` — all interpolations are parameterized (SQL-injection safe).
export const sql = neon(process.env.DATABASE_URL ?? "");
