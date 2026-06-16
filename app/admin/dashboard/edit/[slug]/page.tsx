"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { ArrowLeft, Loader2, ImagePlus } from "lucide-react"
import { UploadButton } from "@/lib/uploadthing"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
})
type FormData = z.infer<typeof schema>

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "blockquote", "code-block"],
    ["clean"],
  ],
}

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/blog/${params.slug}`, { cache: "no-store" })
        if (!res.ok) {
          setNotFound(true)
          return
        }
        const data = await res.json()
        setValue("title", data.title)
        setContent(data.content)
        setImageUrl(data.image_url)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [params.slug, setValue])

  const onSubmit = async (data: FormData) => {
    if (uploading) return toast.error("Please wait for the image to finish uploading.")
    if (content.replace(/<[^>]*>/g, "").trim().length < 10)
      return toast.error("Please write some content (at least 10 characters).")

    setSaving(true)
    try {
      const res = await fetch(`/api/blog/${params.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.title, content, imageUrl }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Failed to update")
      }
      toast.success("Blog updated!")
      router.push("/admin/dashboard")
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || "Failed to update blog")
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    )

  if (notFound)
    return (
      <div className="text-center py-24">
        <p className="text-slate-600 mb-4">Blog not found.</p>
        <Link href="/admin/dashboard" className="text-[#981127] hover:underline">
          Back to dashboard
        </Link>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Blog</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
            <input
              {...register("title")}
              placeholder="Blog title"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#981127] focus:ring-2 focus:ring-[#981127]/20 transition"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1.5">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Edit your blog content..."
              className="bg-white rounded-md"
              modules={quillModules}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
            {imageUrl ? (
              <div className="flex items-center gap-4">
                <Image
                  src={imageUrl}
                  height={90}
                  width={140}
                  alt="preview"
                  className="rounded-lg border object-cover h-[90px] w-[140px]"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl(null)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <ImagePlus className="w-5 h-5 text-slate-400" />
                <UploadButton
                  endpoint="blogImage"
                  onUploadBegin={() => setUploading(true)}
                  onClientUploadComplete={(res: any) => {
                    setImageUrl(res?.[0]?.ufsUrl || res?.[0]?.url || null)
                    setUploading(false)
                    toast.success("Image uploaded")
                  }}
                  onUploadError={(error: Error) => {
                    setUploading(false)
                    toast.error(`Upload failed: ${error.message}`)
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading || saving}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#981127] to-[#24346D] text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Saving…
              </>
            ) : (
              "Update Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
