import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/app/components/widgets/Navbar"
import { sql } from "@/neon"

export const dynamic = "force-dynamic"

interface BlogRow {
  id: number
  title: string
  slug: string
  content: string
  image_url: string | null
  created_at: string
}

async function getBlog(slug: string): Promise<BlogRow | null> {
  try {
    const rows = (await sql`
      SELECT id, title, slug, content, image_url, created_at
      FROM blogs WHERE slug = ${slug} LIMIT 1
    `) as BlogRow[]
    return rows[0] ?? null
  } catch (error) {
    console.error("Failed to load blog:", error)
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = await getBlog(params.slug)
  if (!blog) return { title: "Blog not found | Bright Reach Solutions" }

  const description = blog.content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160)

  return {
    title: `${blog.title} | Bright Reach Solutions`,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: blog.image_url ? [{ url: blog.image_url }] : undefined,
      type: "article",
    },
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug)
  if (!blog) notFound()

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        <Navbar />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12 lg:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#981127] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>

        <p className="text-sm text-slate-400 mb-3">
          {new Date(blog.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          {blog.title}
        </h1>

        {blog.image_url && (
          <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden mt-8 shadow-lg">
            <Image src={blog.image_url} alt={blog.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Quill HTML output. Content is authored by the trusted admin only. */}
        <div
          className="prose prose-slate prose-lg max-w-none mt-10
            prose-headings:font-bold prose-headings:text-slate-900
            prose-a:text-[#981127] prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  )
}
