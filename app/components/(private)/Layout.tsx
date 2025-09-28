"use client"
import type React from "react"
import Navbar from "../widgets/Navbar"
import Hero from "../widgets/Hero"
import "../../globals.css"

// Define an interface for the props
interface LayoutProps {
  isAboutOnly?: boolean
  isPricingOnly?: boolean
  isReducedHeight?: boolean
}

const Layout: React.FC<LayoutProps> = ({ isAboutOnly, isPricingOnly, isReducedHeight }) => {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)),url("/mainbg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={`min-h-[50vh] md:min-h-[30vh] ${isReducedHeight ? "lg:min-h-[50vh]" : "lg:min-h-screen"}`}>
        <div className="pt-6">
          <Navbar />
        </div >
        <Hero isAboutOnly={isAboutOnly} isPricingOnly={isPricingOnly} />
      </div>
    </div>
  )
}

export default Layout

