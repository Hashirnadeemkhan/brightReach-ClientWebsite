"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"
import {
  Pencil,
  Trash2,
  PlusCircle,
  Star,
  Check,
  EyeOff,
  Loader2,
  FileText,
  MessageSquareText,
} from "lucide-react"

/* --------------------------------- Types --------------------------------- */

interface Blog {
  id: number | string
  title: string
  slug: string
  image_url: string | null
  created_at: string
}

interface AdminReview {
  id: number | string
  name: string
  role: string | null
  rating: number
  message: string
  status: "pending" | "published"
  created_at: string
}

type Tab = "blogs" | "reviews"

/* ------------------------------- Component -------------------------------- */

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("blogs")

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)

  const [reviews, setReviews] = useState<AdminReview[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | number | null>(null)

  const loadBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blog", { cache: "no-store" })
      if (res.ok) setBlogs(await res.json())
    } catch {
      toast.error("Failed to load blogs")
    } finally {
      setBlogsLoading(false)
    }
  }, [])

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/reviews", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setReviews(data.reviews)
      }
    } catch {
      toast.error("Failed to load reviews")
    } finally {
      setReviewsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBlogs()
    loadReviews()
  }, [loadBlogs, loadReviews])

  const pendingCount = reviews.filter((r) => r.status === "pending").length

  /* ------------------------------ Blog actions ----------------------------- */
  const deleteBlog = async (slug: string) => {
    if (!confirm("Delete this blog permanently?")) return
    const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" })
    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b.slug !== slug))
      toast.success("Blog deleted")
    } else {
      toast.error("Failed to delete blog")
    }
  }

  /* ----------------------------- Review actions ---------------------------- */
  const setReviewStatus = async (id: string | number, status: "published" | "pending") => {
    setBusyId(id)
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setBusyId(null)
    if (res.ok) {
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
      toast.success(status === "published" ? "Review approved & published" : "Review unpublished")
    } else {
      toast.error("Action failed")
    }
  }

  const deleteReview = async (id: string | number) => {
    if (!confirm("Delete this review permanently?")) return
    setBusyId(id)
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" })
    setBusyId(null)
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id))
      toast.success("Review deleted")
    } else {
      toast.error("Failed to delete review")
    }
  }

  /* --------------------------------- View ---------------------------------- */
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-slate-200">
        <TabButton active={tab === "blogs"} onClick={() => setTab("blogs")} icon={<FileText className="w-4 h-4" />}>
          Blogs
          <span className="ml-1.5 text-xs text-slate-400">{blogs.length}</span>
        </TabButton>
        <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")} icon={<MessageSquareText className="w-4 h-4" />}>
          Reviews
          {pendingCount > 0 && (
            <span className="ml-1.5 text-xs font-semibold text-white bg-[#981127] rounded-full px-2 py-0.5">
              {pendingCount} new
            </span>
          )}
        </TabButton>
      </div>

      {/* ------------------------------- Blogs -------------------------------- */}
      {tab === "blogs" && (
        <div>
          <div className="flex justify-end mb-4">
            <Link
              href="/admin/dashboard/add"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#981127] to-[#24346D] text-white text-sm font-semibold shadow hover:shadow-lg transition"
            >
              <PlusCircle className="w-4 h-4" /> Add New Blog
            </Link>
          </div>

          {blogsLoading ? (
            <Centered>
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </Centered>
          ) : blogs.length === 0 ? (
            <Centered>
              <p className="text-slate-500">No blogs yet. Create your first post.</p>
            </Centered>
          ) : (
            <div className="space-y-3">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      {blog.image_url ? (
                        <Image src={blog.image_url} alt={blog.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{blog.title}</h3>
                      <p className="text-sm text-slate-400">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/dashboard/edit/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.slug)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------ Reviews ------------------------------- */}
      {tab === "reviews" && (
        <div>
          {reviewsLoading ? (
            <Centered>
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </Centered>
          ) : reviews.length === 0 ? (
            <Centered>
              <p className="text-slate-500">No reviews submitted yet.</p>
            </Centered>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`bg-white border rounded-xl p-5 ${
                    review.status === "pending" ? "border-amber-300 bg-amber-50/40" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900">{review.name}</h3>
                        {review.role && <span className="text-sm text-slate-500">· {review.role}</span>}
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            review.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {review.status === "pending" ? "Pending" : "Published"}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-1.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-slate-200 text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                        {review.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      {review.status === "pending" ? (
                        <button
                          onClick={() => setReviewStatus(review.id, "published")}
                          disabled={busyId === review.id}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => setReviewStatus(review.id, "pending")}
                          disabled={busyId === review.id}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                        >
                          <EyeOff className="w-4 h-4" /> Unpublish
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        disabled={busyId === review.id}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-sm text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------- Small bits ------------------------------- */

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition ${
        active
          ? "border-[#981127] text-[#981127]"
          : "border-transparent text-slate-500 hover:text-slate-800"
      }`}
    >
      {icon}
      {children}
    </button>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center py-20">{children}</div>
}
