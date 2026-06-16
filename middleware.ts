import { type NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, verifySession } from "@/lib/adminAuth"

// Protect every /admin route except the login page itself.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/admin/login") return NextResponse.next()

  const token = request.cookies.get(ADMIN_COOKIE)?.value
  const valid = await verifySession(token)

  if (!valid) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
