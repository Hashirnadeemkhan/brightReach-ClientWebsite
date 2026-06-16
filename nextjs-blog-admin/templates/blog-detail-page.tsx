// src/app/blog/[slug]/page.tsx
// Public single-post page. SERVER COMPONENT — reads Prisma directly for SEO + speed.
// (The list page fetches the API client-side; the detail page does NOT.)
import prisma from "@/lib/prisma"
import Image from "next/image"

export default async function BlogDetails({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } })

  if (!blog) {
    return (
      <div className="text-center text-red-500 mt-32 text-2xl font-semibold">
        Blog not found!
      </div>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full h-[400px] relative">
          <Image
            src={blog.imageUrl || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center leading-tight">
            {blog.title}
          </h1>

          <p className="text-center text-gray-500 mb-10">
            Published on{" "}
            <span className="font-medium text-gray-700">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </p>

          {/* Quill HTML. Sanitize with isomorphic-dompurify if content can come
              from untrusted sources. */}
          <article
            className="prose max-w-none prose-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    </section>
  )
}

// Optional: pre-render + dynamic SEO metadata
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const blog = await prisma.blog.findUnique({ where: { slug: params.slug } })
//   return { title: blog?.title ?? "Blog", description: blog?.title }
// }
