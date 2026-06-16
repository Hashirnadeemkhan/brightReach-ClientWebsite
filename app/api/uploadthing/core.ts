import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { isAdmin } from "@/lib/requireAdmin"

const f = createUploadthing()

export const ourFileRouter = {
  blogImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Only authenticated admins may upload.
    .middleware(async () => {
      if (!(await isAdmin())) throw new UploadThingError("Unauthorized")
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
