import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { slugify } from "@/utils/slugify"

export async function POST(req: Request) {
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
