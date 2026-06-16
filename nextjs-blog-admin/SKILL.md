---
name: nextjs-blog-admin
description: Scaffold a blog + admin CMS in a Next.js 14 App Router project — Prisma/Postgres data layer, CRUD API routes, an admin dashboard (list/add/edit/delete) with a React Quill rich-text editor, UploadThing image uploads, and public blog list/detail pages. Use when the user wants to add a blog, a CMS, an admin panel for posts, or "the blog thing like my fencing project" to a Next.js app.
---

# Next.js Blog + Admin CMS

This skill scaffolds a complete blog system with an admin dashboard into a Next.js 14 (App Router) + TypeScript project. It mirrors a battle-tested pattern: Prisma + PostgreSQL for data, REST-style API routes for CRUD, React Quill for rich content, and UploadThing for image hosting.

## Architecture at a glance

```
Public:  /blog            → list all posts (cards)
         /blog/[slug]      → single post (server component, reads DB directly)

Admin:   /admin/dashboard            → list + delete posts
         /admin/dashboard/add        → create (Quill editor + image upload)
         /admin/dashboard/edit/[slug]→ edit existing

API:     POST   /api/blog            → create
         GET    /api/blog            → list (newest first)
         GET    /api/blog/[slug]     → read one
         PUT    /api/blog/[slug]     → update
         DELETE /api/blog/[slug]     → delete
         GET/POST /api/uploadthing   → image upload handler

Data:    Prisma `Blog` model (Postgres) — id, title, slug, content(HTML), imageUrl, timestamps
Media:   UploadThing CDN (utfs.io) — URL stored in Blog.imageUrl
```

**Data flow:** Admin writes title + Quill HTML + uploads an image → POST `/api/blog` → slug auto-generated from title → Prisma row created. Public pages fetch and render `content` via `dangerouslySetInnerHTML` with Tailwind `prose` classes. The single-post page (`/blog/[slug]`) is a server component that hits Prisma directly (faster, SEO-friendly); list pages fetch the API client-side.

## When to use

Use this when the user asks to add a blog, news section, articles, CMS, or admin panel for managing posts to a Next.js project. Adapt freely — the `Blog` model is generic enough to become "Projects", "Services", "Case Studies", etc. by renaming.

## Prerequisites — check before scaffolding

1. **Is it Next.js 14+ App Router?** Confirm `next` in package.json and a `src/app/` or `app/` directory. If Pages Router, the API/page conventions differ — adapt accordingly.
2. **TypeScript path alias.** This pattern uses `@/*` → `./src/*` (in tsconfig.json). If the project root is `app/` not `src/app/`, adjust import paths.
3. **A Postgres database.** Needs a `DATABASE_URL`. Neon (serverless Postgres) works well and is what the reference project used. Any Postgres works.
4. **An UploadThing account** (uploadthing.com) for image hosting — provides `UPLOADTHING_TOKEN`. (Can swap for Cloudinary/S3/local if preferred — see Variations.)

## Step-by-step

### 1. Install dependencies

```bash
npm install @prisma/client react-hook-form @hookform/resolvers zod react-quill uploadthing @uploadthing/react
npm install -D prisma
```

Versions known to work together (from the reference project): `@prisma/client@^5.22`, `react-quill@^2.0`, `uploadthing@^7.7`, `@uploadthing/react@^7.3`, `zod@^4`, `react-hook-form@^7.64`, `next@14.2`. React Quill 2.x requires React 18 (not 19).

### 2. Set up Prisma

Create/extend `prisma/schema.prisma` with the `Blog` model (see `templates/schema.prisma`). Then:

```bash
npx prisma migrate dev --name add_blog
npx prisma generate
```

Create the Prisma singleton at `src/lib/prisma.ts` (see `templates/lib-prisma.ts`) — this prevents connection-pool exhaustion during Next.js hot reload. Add `"postinstall": "prisma generate"` to package.json scripts so deploys regenerate the client.

### 3. Environment variables

Add to `.env`:
```
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
```
Add to `.env.local` (gitignored):
```
UPLOADTHING_TOKEN='your_uploadthing_token'
```

### 4. Configure image domains

In `next.config.mjs`, allow the UploadThing CDN so `next/image` can optimize uploaded images (see `templates/next.config.mjs`):
```js
images: { domains: ['utfs.io'] }
```
On Next 15+, prefer `remotePatterns` over the deprecated `domains`.

### 5. Copy the files

Copy each template to its destination (paths assume `src/app/`):

| Template | Destination |
|---|---|
| `templates/schema.prisma` (Blog model) | `prisma/schema.prisma` |
| `templates/lib-prisma.ts` | `src/lib/prisma.ts` |
| `templates/lib-uploadthing.ts` | `src/lib/uploadthing.ts` |
| `templates/slugify.ts` | `src/utils/slugify.ts` |
| `templates/uploadthing-core.ts` | `src/app/api/uploadthing/core.ts` |
| `templates/uploadthing-route.ts` | `src/app/api/uploadthing/route.ts` |
| `templates/api-blog-route.ts` | `src/app/api/blog/route.ts` |
| `templates/api-blog-slug-route.ts` | `src/app/api/blog/[slug]/route.ts` |
| `templates/admin-dashboard-page.tsx` | `src/app/admin/dashboard/page.tsx` |
| `templates/admin-add-page.tsx` | `src/app/admin/dashboard/add/page.tsx` |
| `templates/admin-edit-page.tsx` | `src/app/admin/dashboard/edit/[slug]/page.tsx` |
| `templates/blog-list-page.tsx` | `src/app/blog/page.tsx` |
| `templates/blog-detail-page.tsx` | `src/app/blog/[slug]/page.tsx` |

The admin/blog pages use a shadcn `<Button>` from `@/components/ui/button`. If the project doesn't have shadcn/ui, either run `npx shadcn@latest add button` or replace `<Button>` with a plain styled `<button>`.

### 6. Verify

```bash
npm run dev
```
- Visit `/admin/dashboard/add`, create a post (title + content + image), publish.
- Confirm it appears at `/admin/dashboard` and `/blog`, and the detail page renders at `/blog/[slug]`.
- Test edit and delete.

## ⚠️ Critical: admin routes have NO auth by default

The reference pattern ships the admin dashboard **completely unprotected** — anyone who knows the URL can create/edit/delete posts. This is the single most important thing to fix before any real deployment. **Always raise this with the user** and offer to add protection. Options, simplest first:

- **Middleware + simple password / token** (`src/middleware.ts` matching `/admin/:path*`) — fast, good enough for a single-admin marketing site. A ready-to-adapt version is in `templates/middleware-auth-example.ts` (also gates write methods on `/api/blog`).
- **NextAuth (Auth.js) Credentials provider** — proper sessions; hash the admin password with `bcryptjs`, store in the `AdminUser` model.
- **A hosted auth (Clerk, Auth0)** — least code, external dependency.

The API routes (`/api/blog/*`) also need protection for write methods (POST/PUT/DELETE) — middleware on `/admin` does NOT cover them, since the client calls the API directly. Guard the mutating handlers too.

## Other hardening to mention

- **XSS:** `content` is rendered with `dangerouslySetInnerHTML`. React Quill's output is generally safe, but if any non-trusted input reaches it, sanitize with `isomorphic-dompurify` before rendering.
- **API validation:** the POST/PUT handlers trust the request body. Add Zod parsing server-side (the templates include a commented example).
- **Slug collisions:** `slugify` doesn't guarantee uniqueness; two posts titled the same will violate the unique constraint. The template includes an optional de-dupe helper.

## Variations

- **Excerpt / categories / author / published flag:** add fields to the `Blog` model + migrate, then thread through the form and API.
- **Different media host:** swap UploadThing for Cloudinary or an S3 presigned-URL flow — only `lib/uploadthing.ts`, `api/uploadthing/*`, and the `<UploadButton>` usages change.
- **Markdown instead of HTML:** replace React Quill with a markdown editor (e.g. `@uiw/react-md-editor`) and render with `react-markdown` instead of `dangerouslySetInnerHTML`.
- **Rename the resource:** `Blog` → `Project`/`Service`/etc. Rename the model, routes folder, and Prisma calls (`prisma.blog` → `prisma.project`).

## Notes / gotchas

- React Quill **must** be loaded with `dynamic(() => import("react-quill"), { ssr: false })` — it touches `document` and breaks SSR otherwise. Import `react-quill/dist/quill.snow.css` for the toolbar styling.
- The `prose` classes (Tailwind Typography plugin, `@tailwindcss/typography`) make Quill HTML look right. Install it if missing: `npm i -D @tailwindcss/typography` and add to `tailwind.config`.
- UploadThing's `onClientUploadComplete` returns an array; the URL is `res[0].url`.
- The list/detail split is intentional: detail is a server component (reads Prisma directly for SEO + speed), list pages fetch the API client-side. Keep that split.

The template files under `templates/` are the exact, working source from the reference project — copy them verbatim and adjust import paths/model names as needed.
