import BlogPostForm from "@/app/components/BlogPostForm"
import type { Metadata } from "next"
import AdminLayout from "@/app/components/(private)/AdminLoginLayout"

export const metadata: Metadata = {
  title: "Create Blog Post",
  description: "Create a new blog post",
}

type BreadcrumbItem = 
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined }

// Breadcrumb array
const breadcrumbItems: BreadcrumbItem[] = [
  { type: "link", label: "Home", href: "/" },
  { type: "link", label: "Dashboard", href: "/admin" },
  { type: "page", label: "Create Blog" },
]

export default function CreatePostPage() {
  return (
    <div className="">
      <AdminLayout title="Create Blog Post" breadcrumb={breadcrumbItems} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center mt-5">Create Blog Post</h1>
        <BlogPostForm />
      </div>
    </div>
  )
}
