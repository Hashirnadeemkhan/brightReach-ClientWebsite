import { sql } from "@/neon"

// Title -> URL slug. Lowercases, spaces -> dashes, strips non-word chars.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Guarantee uniqueness against existing rows (optionally ignoring one id,
// used when editing so a post keeps its own slug).
export async function uniqueSlug(title: string, ignoreId?: number | string): Promise<string> {
  const base = slugify(title) || "post"
  let slug = base
  let n = 1
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows = ignoreId
      ? await sql`SELECT id FROM blogs WHERE slug = ${slug} AND id <> ${ignoreId} LIMIT 1`
      : await sql`SELECT id FROM blogs WHERE slug = ${slug} LIMIT 1`
    if (rows.length === 0) return slug
    slug = `${base}-${n++}`
  }
}
