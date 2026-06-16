import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ADMIN_COOKIE, verifySession } from "./adminAuth"

// True if the current request carries a valid admin session cookie.
export async function isAdmin(): Promise<boolean> {
  const token = cookies().get(ADMIN_COOKIE)?.value
  return verifySession(token)
}

// Use at the top of mutating API handlers. Returns a 401 response to return
// early, or null if the caller is authenticated.
export async function guardAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
