// utils/slugify.ts
export function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove all non-word characters (e.g., special symbols)
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
      .trim(); // Remove leading and trailing spaces
  }