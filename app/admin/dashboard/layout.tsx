"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, PlusCircle, ExternalLink, LogOut } from "lucide-react"
import { Toaster } from "react-hot-toast"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" />
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-slate-900">Admin</span>
            <nav className="hidden sm:flex items-center gap-1">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link
                href="/admin/dashboard/add"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition"
              >
                <PlusCircle className="w-4 h-4" /> Add Blog
              </Link>
              <Link
                href="/blog"
                target="_blank"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition"
              >
                <ExternalLink className="w-4 h-4" /> View site
              </Link>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[#981127] hover:bg-[#981127]/5 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
