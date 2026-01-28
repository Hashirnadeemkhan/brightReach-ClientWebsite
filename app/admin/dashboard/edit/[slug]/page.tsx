"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Load ReactQuill only on client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
});

// Form data type
interface FormData {
  title: string;
}

export default function EditBlogPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${params.slug}`);
        const data = await res.json();
        setValue("title", data.title);
        setContent(data.content);
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.slug, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`/api/blog/${params.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          content,
          imageUrl,
        }),
      });

      if (res.ok) {
        alert("✅ Blog updated successfully!");
        router.push("/admin/dashboard");
      } else {
        alert("❌ Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (loading) return <p className="text-center mt-16">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Blog</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Blog title"
          className="w-full border p-3 rounded-md"
        />

        {/* Quill Editor for content */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Edit your blog content..."
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

        {/* Image Upload */}
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
            className="mt-3 rounded-md border"
          />
        )}

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update Blog"}
        </Button>
      </form>
    </div>
  );
}