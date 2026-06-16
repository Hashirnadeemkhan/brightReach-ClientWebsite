import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { sql } from "@/neon"
import { uniqueSlug } from "@/lib/slugify"
import { guardAdmin } from "@/lib/requireAdmin"

export const dynamic = "force-dynamic"

const updateSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200),
  content: z.string().trim().min(10, "Content is too short"),
  imageUrl: z.string().url().nullable().optional(),
})

type Params = { params: { slug: string } }

// GET /api/blog/[slug] — read one post.
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const rows = await sql`
      SELECT id, title, slug, content, image_url, created_at, updated_at
      FROM blogs WHERE slug = ${params.slug} LIMIT 1
    `
    if (rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("❌ Failed to fetch blog:", error)
    return NextResponse.json({ error: "Failed to load blog" }, { status: 500 })
  }
}

// PUT /api/blog/[slug] — update a post (admin only).
export async function PUT(request: NextRequest, { params }: Params) {
  const denied = await guardAdmin()
  if (denied) return denied

  try {
    const parsed = updateSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      )
    }

    const existing = await sql`SELECT id FROM blogs WHERE slug = ${params.slug} LIMIT 1`
    if (existing.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const { title, content, imageUrl } = parsed.data
    const newSlug = await uniqueSlug(title, existing[0].id)

    const rows = await sql`
      UPDATE blogs
      SET title = ${title},
          slug = ${newSlug},
          content = ${content},
          image_url = ${imageUrl ?? null},
          updated_at = now()
      WHERE id = ${existing[0].id}
      RETURNING id, title, slug, content, image_url, created_at, updated_at
    `
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("❌ Failed to update blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

// DELETE /api/blog/[slug] — remove a post (admin only).
export async function DELETE(_request: NextRequest, { params }: Params) {
  const denied = await guardAdmin()
  if (denied) return denied

  try {
    const rows = await sql`DELETE FROM blogs WHERE slug = ${params.slug} RETURNING id`
    if (rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ Failed to delete blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
