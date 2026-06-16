"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, PenLine, Loader2, MessageSquareText, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Toaster, toast } from "react-hot-toast"
import { formatDistanceToNow } from "date-fns"

/* ----------------------------- Types & schema ----------------------------- */

interface Review {
  id: string | number
  name: string
  role?: string
  rating: number
  message: string
  createdAt: Date | null
}

// Raw shape returned by the /api/reviews route (snake_case from Postgres).
interface ReviewRow {
  id: string | number
  name: string
  role?: string | null
  rating: number
  message: string
  created_at: string | null
}

const mapRow = (row: ReviewRow): Review => ({
  id: row.id,
  name: row.name ?? "Anonymous",
  role: row.role ?? "",
  rating: typeof row.rating === "number" ? row.rating : Number(row.rating) || 5,
  message: row.message ?? "",
  createdAt: row.created_at ? new Date(row.created_at) : null,
})

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60, "Name is too long"),
  role: z.string().trim().max(80, "This is too long").optional().or(z.literal("")),
  rating: z
    .number({ invalid_type_error: "Please select a rating" })
    .min(1, "Please select a rating")
    .max(5),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters")
    .max(800, "Please keep it under 800 characters"),
})

type ReviewFormData = z.infer<typeof reviewSchema>

/* --------------------------------- Helpers -------------------------------- */

const AVATAR_GRADIENTS = [
  "from-[#981127] to-[#652046]",
  "from-[#652046] to-[#24346D]",
  "from-[#24346D] to-[#981127]",
  "from-[#981127] to-[#24346D]",
]

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

const avatarGradient = (name: string) => {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length]
}

/* ---------------------------- Star rating views --------------------------- */

const StarRating = ({ value, size = 16 }: { value: number; size?: number }) => (
  <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        style={{ width: size, height: size }}
        className={star <= value ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
      />
    ))}
  </div>
)

const StarInput = ({
  value,
  onChange,
}: {
  value: number
  onChange: (rating: number) => void
}) => {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hover || value)
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
            className="transition-transform duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#981127]/40 rounded"
          >
            <Star
              className={`w-8 h-8 transition-colors duration-150 ${
                active ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}

/* -------------------------------- Component -------------------------------- */

const ReviewsClient = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", role: "", rating: 0, message: "" },
  })

  const rating = watch("rating")
  const message = watch("message") ?? ""

  /* ---- Load reviews from the API ---- */
  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" })
        if (!res.ok) throw new Error("Request failed")
        const data = await res.json()
        if (active) setReviews((data.reviews as ReviewRow[]).map(mapRow))
      } catch (error) {
        console.error("Failed to load reviews:", error)
        if (active) toast.error("Couldn't load reviews. Please refresh the page.")
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  /* ---- Aggregate stats ---- */
  const { average, total, distribution } = useMemo(() => {
    const total = reviews.length
    if (total === 0) return { average: 0, total: 0, distribution: [0, 0, 0, 0, 0] }
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    const distribution = [5, 4, 3, 2, 1].map(
      (star) => reviews.filter((r) => Math.round(r.rating) === star).length
    )
    return { average: sum / total, total, distribution }
  }, [reviews])

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          role: data.role?.trim() || "",
          rating: data.rating,
          message: data.message.trim(),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Request failed")
      }

      // Reviews are moderated — they appear only after an admin approves them.
      toast.success("Thank you! Your review was submitted and will appear once approved.", {
        duration: 5000,
        style: { border: "1px solid #981127", padding: "14px", color: "#981127" },
      })
      reset()
      setFormOpen(false)
    } catch (error) {
      console.error("Failed to submit review:", error)
      toast.error("Sorry, something went wrong. Please try again.")
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/60 to-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ------------------------------- Hero ------------------------------- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#981127] via-[#652046] to-[#24346D]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 lg:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white/90 text-sm font-medium tracking-wide"
          >
            <MessageSquareText className="w-4 h-4" />
            Customer Reviews
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            What our clients say
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Real feedback from the businesses we&apos;ve helped grow. Share your own experience and
            help others choose with confidence.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() => setFormOpen(true)}
            className="mt-9 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#981127] font-semibold shadow-xl shadow-black/10 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
          >
            <PenLine className="w-5 h-5" />
            Write a review
          </motion.button>
        </div>
      </div>

      {/* ------------------------------ Stats bar --------------------------- */}
      {total > 0 && (
        <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-8"
          >
            {/* Average */}
            <div className="flex flex-col items-center justify-center md:pr-8 md:border-r border-slate-100">
              <span className="text-5xl font-bold text-slate-900">{average.toFixed(1)}</span>
              <div className="mt-2">
                <StarRating value={Math.round(average)} size={18} />
              </div>
              <span className="mt-2 text-sm text-slate-500">
                Based on {total} review{total > 1 ? "s" : ""}
              </span>
            </div>

            {/* Distribution */}
            <div className="flex flex-col justify-center gap-2">
              {distribution.map((count, idx) => {
                const star = 5 - idx
                const pct = total ? (count / total) * 100 : 0
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-10 text-sm text-slate-500 flex items-center gap-1">
                      {star} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#981127] to-[#24346D]"
                      />
                    </div>
                    <span className="w-8 text-right text-sm text-slate-400">{count}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* ------------------------------ Review list ------------------------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-2xl border border-slate-100 bg-white p-6 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                    <div className="h-2.5 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-5/6 bg-slate-100 rounded" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#981127]/10 to-[#24346D]/10 mb-5">
              <MessageSquareText className="w-7 h-7 text-[#981127]" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No reviews yet</h3>
            <p className="mt-2 text-slate-500">Be the first to share your experience with us.</p>
            <button
              onClick={() => setFormOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#981127] to-[#24346D] text-white font-semibold shadow-lg shadow-[#981127]/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <PenLine className="w-4 h-4" />
              Write the first review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.article
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
                  className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 group-hover:text-[#981127]/15 transition-colors" />

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradient(
                        review.name
                      )} text-white font-semibold text-sm shadow-md`}
                    >
                      {initials(review.name) || "?"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 leading-tight">{review.name}</h4>
                      {review.role ? (
                        <p className="text-sm text-slate-500">{review.role}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4">
                    <StarRating value={review.rating} size={16} />
                  </div>

                  <p className="mt-4 text-slate-600 leading-relaxed flex-1 whitespace-pre-line">
                    {review.message}
                  </p>

                  {review.createdAt ? (
                    <p className="mt-5 text-xs text-slate-400">
                      {formatDistanceToNow(review.createdAt, { addSuffix: true })}
                    </p>
                  ) : null}
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ------------------------------ Form modal -------------------------- */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setFormOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#981127] to-[#24346D] px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Share your experience</h3>
                  <p className="text-sm text-white/70">Your feedback helps others decide.</p>
                </div>
                <button
                  type="button"
                  onClick={() => !isSubmitting && setFormOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your rating
                  </label>
                  <StarInput value={rating} onChange={(r) => setValue("rating", r, { shouldValidate: true })} />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.rating.message}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="rv-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Name
                  </label>
                  <input
                    id="rv-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#981127] focus:ring-2 focus:ring-[#981127]/20 transition"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>
                  )}
                </div>

                {/* Role / company */}
                <div>
                  <label htmlFor="rv-role" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Company / Role <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    id="rv-role"
                    type="text"
                    placeholder="e.g. Founder at Fence Master"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#981127] focus:ring-2 focus:ring-[#981127]/20 transition"
                    {...register("role")}
                  />
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1.5">{errors.role.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="rv-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Your review
                  </label>
                  <textarea
                    id="rv-message"
                    rows={4}
                    placeholder="Tell us about your experience working with us…"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#981127] focus:ring-2 focus:ring-[#981127]/20 transition resize-none"
                    {...register("message")}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    {errors.message ? (
                      <p className="text-red-500 text-sm">{errors.message.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-slate-400">{message.length}/800</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#981127] to-[#24346D] text-white font-semibold shadow-lg shadow-[#981127]/20 hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Posting…
                    </>
                  ) : (
                    "Submit review"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ReviewsClient
