import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/neon"
import { guardAdmin } from "@/lib/requireAdmin"

export const dynamic = "force-dynamic"

const patchSchema = z.object({
  status: z.enum(["published", "pending"]),
})

type Params = { params: { id: string } }

// PATCH /api/admin/reviews/[id] — approve (publish) or unpublish a review.
export async function PATCH(request: NextRequest, { params }: Params) {
  const denied = await guardAdmin()
  if (denied) return denied

  try {
    const parsed = patchSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const rows = await sql`
      UPDATE reviews SET status = ${parsed.data.status}
      WHERE id = ${params.id}
      RETURNING id, name, role, rating, message, status, created_at
    `
    if (rows.length === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }
    return NextResponse.json({ review: rows[0] })
  } catch (error) {
    console.error("❌ Failed to update review:", error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}

// DELETE /api/admin/reviews/[id] — remove a review.
export async function DELETE(_request: NextRequest, { params }: Params) {
  const denied = await guardAdmin()
  if (denied) return denied

  try {
    const rows = await sql`DELETE FROM reviews WHERE id = ${params.id} RETURNING id`
    if (rows.length === 0) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Failed to delete review:", error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}
