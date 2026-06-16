import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/neon"

// Always run fresh — reviews change over time.
export const dynamic = "force-dynamic"

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60),
  role: z.string().trim().max(80).optional().or(z.literal("")),
  rating: z.number().int().min(1, "Please select a rating").max(5),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(800),
})

// GET /api/reviews — list published reviews, newest first.
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, role, rating, message, created_at
      FROM reviews
      WHERE status = 'published'
      ORDER BY created_at DESC
      LIMIT 200
    `
    return NextResponse.json({ reviews: rows })
  } catch (error: any) {
    console.error("❌ Failed to fetch reviews:", error)
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 })
  }
}

// POST /api/reviews — create a new review.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = reviewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const { name, role, rating, message } = parsed.data

    // New reviews start as 'pending' — an admin must approve them before they
    // appear on the public page.
    await sql`
      INSERT INTO reviews (name, role, rating, message, status)
      VALUES (${name}, ${role || ""}, ${rating}, ${message}, 'pending')
    `

    return NextResponse.json({ success: true, pending: true }, { status: 201 })
  } catch (error: any) {
    console.error("❌ Failed to create review:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
