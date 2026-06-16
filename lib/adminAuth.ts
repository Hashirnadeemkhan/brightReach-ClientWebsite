// HMAC-signed admin session token. Pure Web Crypto so it works in both
// edge middleware and Node route handlers. No next/headers import here —
// callers read the cookie themselves and pass the token in.

export const ADMIN_COOKIE = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

const SECRET = process.env.ADMIN_SESSION_SECRET || "insecure-dev-secret-change-me"
const encoder = new TextEncoder()

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message))
  return bufToHex(sig)
}

// Build a token of the form `<value>.<signature>`.
export async function signSession(value = "admin"): Promise<string> {
  const sig = await hmac(value)
  return `${value}.${sig}`
}

// Constant-time-ish comparison of two equal-length hex strings.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifySession(token?: string | null): Promise<boolean> {
  if (!token) return false
  const dot = token.indexOf(".")
  if (dot < 0) return false
  const value = token.slice(0, dot)
  const expected = await signSession(value)
  return safeEqual(token, expected)
}
