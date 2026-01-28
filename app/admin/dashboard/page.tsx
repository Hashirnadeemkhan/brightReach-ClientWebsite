"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Blog {
  id: string;
  slug: string;
  title: string;
  imageUrl?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog")
        if (res.ok) {
          const data = await res.json()
          setBlogs(data)
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" })
      if (res.ok) {
        alert("🗑️ Blog deleted successfully!")
        setBlogs(blogs.filter((b) => b.slug !== slug))
      } else {
        alert("Failed to delete blog.")
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mt-52">📝 Manage Blogs</h1>
        <Link href="/admin/dashboard/add">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            ➕ Add New Blog
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600 text-center">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-600 text-center">No blogs found.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={blog.imageUrl || "/placeholder.svg"}
                  alt={blog.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover border"
                />
                <div>
                  <h2 className="font-semibold text-lg">{blog.title}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href={`/admin/dashboard/edit/${blog.slug}`}>
                  <Button variant="outline" className="border-blue-600 text-blue-600">
                    ✏️ Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(blog.slug)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  🗑️ Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
