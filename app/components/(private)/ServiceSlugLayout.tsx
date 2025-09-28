"use client"

import { useEffect, useState } from "react"
import Wrapper from "../shared/Wrapper"
import Link from "next/link"
import Navbar from "../widgets/Navbar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Service } from "@/app/data/services"

interface ServiceLayoutProps {
  service: Service
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ service }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9)),url("/mainbg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-[50vh] md:min-h-[30vh] lg:min-h-[50vh]">
        <div className="pt-6">
          <Navbar />
        </div>
        <Wrapper>
          <section className="flex flex-col gap-y-5 justify-center items-center md:mt-16 mt-10 ">
            <h1 className="md:text-4xl text-3xl lg:text-6xl text-center font-semibold bg-gradient-to-r from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent">
              {service.title}
            </h1>
            <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{service.title}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

          </section>
        </Wrapper>
      </div>
    </div>
  )
}

export default ServiceLayout
