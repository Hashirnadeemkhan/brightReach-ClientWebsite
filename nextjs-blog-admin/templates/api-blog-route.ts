// src/app/api/blog/route.ts
// POST  -> create a blog post (slug auto-generated from title)
// GET   -> list all posts, newest first
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { slugify } from "@/utils/slugify"

export async function POST(req: Request) {
  // ⚠️ Protect this: check auth before allowing writes (middleware on /admin
  // does NOT cover API routes called directly by the client).
  //
  // Optional server-side validation with Zod:
  //   const schema = z.object({ title: z.string().min(3), content: z.string().min(1), imageUrl: z.string().url().nullable() })
  //   const parsed = schema.safeParse(await req.json())
  //   if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 })

  const { title, content, imageUrl } = await req.json()

  const slug = slugify(title)
  const blog = await prisma.blog.create({
    data: { title, slug, content, imageUrl },
  })

  return NextResponse.json(blog)
}

export async function GET() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(blogs)
}
