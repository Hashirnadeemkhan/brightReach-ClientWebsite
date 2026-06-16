// src/utils/slugify.ts
// Title -> URL slug. Lowercases, spaces -> dashes, strips non-word chars.
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
}

// Optional: guarantee uniqueness against existing slugs (avoids the
// unique-constraint error when two posts share a title).
//
// import prisma from "@/lib/prisma"
// export async function uniqueSlug(title: string) {
//   const base = slugify(title)
//   let slug = base
//   let n = 1
//   while (await prisma.blog.findUnique({ where: { slug } })) {
//     slug = `${base}-${n++}`
//   }
//   return slug
// }
