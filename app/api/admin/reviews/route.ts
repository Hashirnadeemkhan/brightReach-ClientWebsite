import { NextResponse } from "next/server"
import { sql } from "@/neon"
import { guardAdmin } from "@/lib/requireAdmin"

export const dynamic = "force-dynamic"

// GET /api/admin/reviews — list ALL reviews (any status) for moderation.
export async function GET() {
  const denied = await guardAdmin()
  if (denied) return denied

  try {
    const rows = await sql`
      SELECT id, name, role, rating, message, status, created_at
      FROM reviews
      ORDER BY
        CASE WHEN status = 'pending' THEN 0 ELSE 1 END,
        created_at DESC
    `
    return NextResponse.json({ reviews: rows })
  } catch (error) {
    console.error("❌ Failed to list reviews:", error)
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 })
  }
}
