import React from "react"
import ServiceLayout from "./ServiceLayout"

// Define the BreadcrumbItem type
type BreadcrumbItem = 
  | { type: "link"; label: string; href: string }
  | { type: "page"; label: string; href?: undefined }

interface TermLayoutProps {
  title: string
  breadcrumb: BreadcrumbItem[]
}

const TermLayout: React.FC<TermLayoutProps> = ({ title, breadcrumb }) => {
  return <ServiceLayout title={title} breadcrumb={breadcrumb} />
}

export default TermLayout
