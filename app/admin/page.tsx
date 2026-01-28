"use client"

import { useState, useEffect } from "react"
import AdminDashboard from "../components/AdminDashboard"
import Login from "../components/Login"
import { usePersistedAuth } from "../components/hooks/useAuth"
import AdminLayout from "../components/(private)/AdminLoginLayout"

type BreadcrumbItem = 
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined }

export default function AdminPage() {
  const { isLoggedIn, login, logout } = usePersistedAuth()
  const [loading, setLoading] = useState(true)

  // Breadcrumbs for different states
  const loginBreadcrumb: BreadcrumbItem[] = [
    { type: "link", label: "Home", href: "/" },
    { type: "page", label: "Admin Login" },
  ]

  const dashboardBreadcrumb: BreadcrumbItem[] = [
    { type: "link", label: "Home", href: "/" },
    { type: "page", label: "Admin Dashboard" },
  ]

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return (
      <div>
        <AdminLayout title="Admin Login" breadcrumb={loginBreadcrumb} />
        <Login onLogin={login} />
      </div>
    )
  }

  return (
    <div className=" mb-10">
      <AdminLayout title="Admin Dashboard" breadcrumb={dashboardBreadcrumb} />
      <section className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>
          <AdminDashboard onLogout={logout} />
        </div>
      </section>
    </div>
  )
}
