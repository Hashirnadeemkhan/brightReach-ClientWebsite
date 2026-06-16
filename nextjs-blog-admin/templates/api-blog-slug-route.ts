// src/app/api/blog/[slug]/route.ts
// GET    -> read one post by slug
// PUT    -> update title / content / image
// DELETE -> remove the post
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } })
  return NextResponse.json(blog)
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  // ⚠️ Protect this: writes must require auth.
  const { title, content, imageUrl } = await req.json()
  const blog = await prisma.blog.update({
    where: { slug: params.slug },
    data: { title, content, imageUrl },
    // Note: this does NOT regenerate the slug when the title changes, so URLs
    // stay stable. Add `slug: slugify(title)` to data if you want them to track.
  })
  return NextResponse.json(blog)
}

export async function DELETE(_req: Request, { params }: { params: { slug: string } }) {
  // ⚠️ Protect this: deletes must require auth.
  await prisma.blog.delete({ where: { slug: params.slug } })
  return NextResponse.json({ message: "Deleted successfully" })
}
