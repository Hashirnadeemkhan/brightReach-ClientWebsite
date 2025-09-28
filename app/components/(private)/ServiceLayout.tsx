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
import React from "react"

// Define the type for a breadcrumb item
interface BreadcrumbItem {
  type: "link" | "page";
  label: string;
  href?: string; // href is optional because it's only needed for links
}

// Define the props for the ServiceLayout component
interface ServiceLayoutProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ title, breadcrumb }) => {
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      setIsLoaded(true);
    }, []);
  
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
            <section className="flex flex-col gap-y-5 justify-center items-center md:mt-14 lg:mt-20 mt-10">
              <h1 className="text-4xl md:text-6xl text-center font-semibold bg-gradient-to-r from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent">
                {title}
              </h1>
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {item.type === "link" ? (
                          <BreadcrumbLink asChild>
                            <Link href={item.href!}>{item.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </section>
          </Wrapper>
        </div>
      </div>
    );
  };
  
  export default ServiceLayout;