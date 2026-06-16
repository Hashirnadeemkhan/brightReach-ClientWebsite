// src/middleware.ts  — OPTIONAL but STRONGLY recommended.
// The reference project shipped admin routes with NO protection. This is the
// simplest fix: a cookie-gated /admin/* and protection for write API methods.
//
// For a single-admin marketing site this is enough. For multi-user, use
// NextAuth (Auth.js) Credentials provider with the AdminUser model + bcrypt.

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Set ADMIN_SECRET in .env.local. A real login page would set this cookie
// after verifying a password; here it's a shared secret for simplicity.
const ADMIN_COOKIE = "admin_session"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session = req.cookies.get(ADMIN_COOKIE)?.value
  const authed = session === process.env.ADMIN_SECRET

  // Gate the admin UI
  if (pathname.startsWith("/admin")) {
    if (!authed) {
      const url = req.nextUrl.clone()
      url.pathname = "/admin/login" // build a small login page that sets the cookie
      return NextResponse.redirect(url)
    }
  }

  // Gate write methods on the blog API (the client calls these directly,
  // so middleware on /admin alone does NOT protect them).
  if (pathname.startsWith("/api/blog") && req.method !== "GET") {
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/blog/:path*"],
}
