import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/neon"
import { uniqueSlug } from "@/lib/slugify"
import { guardAdmin } from "@/lib/requireAdmin"

export const dynamic = "force-dynamic"

const blogSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200),
  content: z.string().trim().min(10, "Content is too short"),
  imageUrl: z.string().url().nullable().optional(),
})

// GET /api/blog — list all posts, newest first.
export async function GET() {
  try {
    const rows = await sql`
      SELECT id, title, slug, content, image_url, created_at, updated_at
      FROM blogs
      ORDER BY created_at DESC
    `
    return NextResponse.json(rows)
  } catch (error) {
    console.error("❌ Failed to list blogs:", error)
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 })
  }
}

// POST /api/blog — create a post (admin only).
export async function POST(request: NextRequest) {
  const denied = await guardAdmin()
  if (denied) return denied

  try {
    const parsed = blogSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const { title, content, imageUrl } = parsed.data
    const slug = await uniqueSlug(title)

    const rows = await sql`
      INSERT INTO blogs (title, slug, content, image_url)
      VALUES (${title}, ${slug}, ${content}, ${imageUrl ?? null})
      RETURNING id, title, slug, content, image_url, created_at, updated_at
    `
    return NextResponse.json(rows[0], { status: 201 })
  } catch (error) {
    console.error("❌ Failed to create blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
