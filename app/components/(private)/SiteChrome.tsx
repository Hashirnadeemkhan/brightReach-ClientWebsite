"use client"

import { usePathname } from "next/navigation"
import Footer from "../widgets/Footer"
import WhatsAppButton from "../widgets/WhatsAppButton"

// Marketing chrome (footer + WhatsApp button) — hidden on the admin panel.
export default function SiteChrome() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  return (
    <>
      <WhatsAppButton />
      <Footer />
    </>
  )
}
