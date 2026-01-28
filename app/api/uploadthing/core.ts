// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  blogImage: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file.url)
      return { url: file.url } // ✅ Important! must return something
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
