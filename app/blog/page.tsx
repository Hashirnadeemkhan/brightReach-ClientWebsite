import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Navbar from "@/app/components/widgets/Navbar"
import { sql } from "@/neon"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog | Bright Reach Solutions",
  description:
    "Insights, tips and guides on web development, branding, SEO and digital growth from the Bright Reach Solutions team.",
}

interface BlogRow {
  id: number
  title: string
  slug: string
  content: string
  image_url: string | null
  created_at: string
}

const excerpt = (html: string, len = 140) => {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  return text.length > len ? text.slice(0, len).trimEnd() + "…" : text
}

export default async function BlogListPage() {
  let blogs: BlogRow[] = []
  try {
    blogs = (await sql`
      SELECT id, title, slug, content, image_url, created_at
      FROM blogs ORDER BY created_at DESC
    `) as BlogRow[]
  } catch (error) {
    console.error("Failed to load blogs:", error)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6">
        <Navbar />
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-[#981127] via-[#652046] to-[#24346D] py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">Our Blog</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Tips, trends and guides on web development, branding, and digital growth.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14 lg:py-20">
        {blogs.length === 0 ? (
          <p className="text-center text-slate-500 text-lg py-16">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  {blog.image_url ? (
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#981127]/10 to-[#24346D]/10" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-slate-400 mb-2">
                    {new Date(blog.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-xl font-semibold text-slate-900 leading-snug group-hover:text-[#981127] transition-colors">
                    {blog.title}
                  </h2>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed flex-1">
                    {excerpt(blog.content)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#981127]">
                    Read more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
