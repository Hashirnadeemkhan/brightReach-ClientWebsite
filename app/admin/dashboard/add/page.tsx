"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Load Quill only on client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Zod validation schema
const schema = z.object({
  title: z.string().min(3, "Title is required"),
});

// Form data type
interface FormData {
  title: string;
}

export default function AddBlogPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (uploading) return alert("⏳ Please wait for image upload.");
    if (content.trim().length < 10) return alert("✍️ Please add more content.");

    try {
      setLoading(true);
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          content,
          imageUrl,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      alert("✅ Blog published successfully!");
      reset();
      setContent("");
      setImageUrl(null);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Error publishing blog:", err);
      alert("❌ Failed to publish blog. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Blog
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            {...register("title")}
            placeholder="Blog title"
            className="w-full border p-3 rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Rich Text Editor */}
        <div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your blog content here..."
            className="bg-white rounded-md"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "blockquote", "code-block"],
                ["clean"],
              ],
            }}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload Blog Image
          </label>
          <UploadButton
            endpoint="blogImage"
            onUploadBegin={() => setUploading(true)}
            onClientUploadComplete={(res: { url: string }[]) => {
              setImageUrl(res[0].url);
              setUploading(false);
            }}
            onUploadError={(error: Error) => {
              setUploading(false);
              alert(`Upload error: ${error.message}`);
            }}
          />
          {imageUrl && (
            <Image
              src={imageUrl}
              height={120}
              width={160}
              alt="preview"
              className="mt-3 rounded-md border object-cover"
            />
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 text-white"
          disabled={uploading || loading}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </Button>
      </form>
    </div>
  );
}