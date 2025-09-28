"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { IoIosArrowDown } from "react-icons/io"
import { services } from "@/app/data/services"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { useMediaQuery } from "../hooks/use-media-query"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const pathname = usePathname()

  const handleLinkClick = () => {
    setIsOpen(false)
    setIsServicesOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navHeight = navRef.current.offsetHeight
        setIsSticky(window.scrollY > navHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  }

  const linkVariants = {
    hover: { scale: 1.05, color: "#EF4444" },
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Services", path: "/service", isDropdown: true },

    { name: "Contact us", path: "/contact" },
  ]

  return (
    <>
      <div ref={navRef} className="h-[100px]">
        <nav
          className={`bg-white shadow-md mx-auto w-[90%] rounded-lg transition-all duration-300 ease-in-out ${
            isSticky ? "fixed top-0 left-0 right-0 z-50 mt-1" : ""
          }`}
        >
          <div className="px-4 md:px-10 flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" height={120} width={120} priority  />
              </Link>
            </div>

            <div className="hidden lg:flex lg:space-x-8">
              {navItems.map((item) => (
                <motion.div key={item.name} whileHover="hover" variants={linkVariants}>
                  {item.isDropdown ? (
                    <div className="relative group">
                      <Link
                        href={item.path}
                        className={`text-black hover:text-red-500 flex items-center gap-x-1 cursor-pointer ${
                          isActive(item.path) ? "text-red-500 " : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          window.location.href = item.path
                        }}
                        aria-current={isActive(item.path) ? "page" : undefined}
                      >
                        {item.name} <IoIosArrowDown className="transition-transform group-hover:rotate-180" />
                      </Link>
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <div className="py-1">
                          {services.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.slug}`}
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 ${
                                isActive(`/services/${service.slug}`) ? "text-red-500" : ""
                              }`}
                              aria-current={isActive(`/services/${service.slug}`) ? "page" : undefined}
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`text-black hover:text-red-500   focus:ring-opacity-50 ${
                        isActive(item.path) ? "text-red-500 " : ""
                      }`}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="hidden lg:block space-x-2">
              <Link
                href="/calendly"
                className="bg-transparent border-2 border-red-500 text-black hover:text-white py-2 px-6 rounded-full hover:bg-red-500 transition-all duration-300"
              >
                Calendly
              </Link>
         
<Link
  href="tel:+441274054457"
  className="bg-red-500 text-white py-2 px-7 rounded-full hover:bg-red-600 transition-all duration-300"
>
  Call us
</Link>


            </div>

            <button
              className="lg:hidden text-3xl text-red-500 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? "×" : "☰"}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && isTablet && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white shadow-lg px-6 py-4 text-center fixed left-0 right-0 w-[90%] mx-auto"
                style={{ zIndex: 1000 }}
              >
                {navItems.map((item) => (
                  <motion.div key={item.name} whileHover="hover" variants={linkVariants}>
                    {item.isDropdown ? (
                      <div className="mb-2">
                        <button
                          className={`text-black hover:text-red-500 flex items-center justify-center gap-x-1 w-full py-2 ${
                            isActive(item.path) ? "text-red-500" : ""
                          }`}
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                          {item.name}{" "}
                          <IoIosArrowDown
                            className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 space-y-2 text-center"
                            >
                              {services.map((service) => (
                                <motion.div key={service.id} whileHover="hover" variants={linkVariants}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className={`block text-black hover:text-red-500 py-2   ${
                                      isActive(`/services/${service.slug}`) ? "text-red-500 " : ""
                                    }`}
                                    onClick={handleLinkClick}
                                    aria-current={isActive(`/services/${service.slug}`) ? "page" : undefined}
                                  >
                                    {service.title}
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        className={`block text-black hover:text-red-500 py-2 focus:outline-none focus:ring-2  focus:ring-opacity-50 ${
                          isActive(item.path) ? "text-red-500" : ""
                        }`}
                        onClick={handleLinkClick}
                        aria-current={isActive(item.path) ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <div className="mt-4 space-y-2">
                  <Link
                    href="/contact"
                    className="block bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    Call us
                  </Link>
                  <Link
                    href="/calendly"
                    className="block bg-transparent border-2 border-red-500 text-black hover:text-white py-2 px-4 rounded-full hover:bg-red-500 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    Calendly
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </>
  )
}

export default Navbar

