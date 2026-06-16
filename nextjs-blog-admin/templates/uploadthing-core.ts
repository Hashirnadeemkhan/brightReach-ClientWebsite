// src/app/api/uploadthing/core.ts
// Defines upload endpoints. `blogImage` accepts one image up to 4MB.
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  blogImage: f({ image: { maxFileSize: "4MB" } })
    // Add a `.middleware(() => {...})` here to authorize uploads once you
    // wire up auth — throw inside it to reject unauthenticated uploads.
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file.url)
      return { url: file.url } // must return something serializable
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
