"use client";
import Image from "next/image";
import Button from "../shared/Button";
import Wrapper from "../shared/Wrapper";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


// Define the type for the component props
interface HeroProps {
  isAboutOnly?: boolean
  isPricingOnly?: boolean
}

const Hero: React.FC<HeroProps> = ({ isAboutOnly, isPricingOnly }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (isAboutOnly || isPricingOnly) {
    // Render only the About or Pricing heading when the prop is passed
    const title = isAboutOnly ? "About Us" : "Pricing"
    const breadcrumbPage = isAboutOnly ? "About" : "Pricing"

    return (
      <Wrapper>
        <section className="flex flex-col gap-y-5 justify-center items-center mt-14 ">
          <h1 className="text-5xl md:text-6xl  font-semibold bg-gradient-to-r from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent ">
            {title}
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <section className="flex flex-col lg:flex-row items-center  ">
        <div className="container px-6 mt-14">
          <div
            className={`max-w-xl transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
           <h4 className="font-normal text-black">Welcome to Bright Reach Solution</h4>
<h1 className="text-4xl md:text-6xl font-semibold text-gray-800 leading-tight">
  Driving Growth Through Innovation & Technology
</h1>
<p className="mt-6 text-lg text-black">
  At <span className="font-bold">Bright Reach Solution</span>, we go beyond traditional IT services. 
  Our team crafts powerful digital solutions — from modern websites and intuitive mobile apps 
  to result-driven branding strategies. We focus on empowering businesses to scale, 
  adapt, and succeed in today’s fast-paced digital landscape.
</p>
<div className="mt-5 transition-opacity duration-1000 delay-500 mb-10">
  <Link href={"/contact"}>
    <Button text="Let’s Build Your Future" />
  </Link>
</div>

          </div>
        </div>
        <div className="px-20 hidden md:block ">
          <Image
            src={"/assets/Hero5.png"}
            alt="hero"
            height={400}
            width={750}
            className={`transition-all duration-1000 ease-in-out transform ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          />
       
        </div>
      </section>
    </Wrapper>
  );
};

export default Hero;