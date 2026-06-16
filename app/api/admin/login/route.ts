import { type NextRequest, NextResponse } from "next/server"
import { ADMIN_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/adminAuth"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const expected = process.env.ADMIN_PASSWORD

    if (!expected) {
      console.error("ADMIN_PASSWORD is not set")
      return NextResponse.json({ error: "Server not configured" }, { status: 500 })
    }

    if (typeof password !== "string" || password !== expected) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 })
    }

    const token = await signSession("admin")
    const res = NextResponse.json({ success: true })
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    })
    return res
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
