import React from "react"
import ServiceLayout from "./ServiceLayout"

// Define the BreadcrumbItem type
type BreadcrumbItem = 
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined }

interface AdminLayoutProps {
  title: string
  breadcrumb: BreadcrumbItem[]
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, breadcrumb }) => {
  return <ServiceLayout title={title} breadcrumb={breadcrumb} />
}

export default AdminLayout
