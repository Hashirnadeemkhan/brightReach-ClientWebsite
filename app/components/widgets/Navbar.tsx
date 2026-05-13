"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { IoIosArrowDown } from "react-icons/io"
import { services } from "@/app/data/services"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { useMediaQuery } from "../hooks/use-media-query"

const callOptions = [
  { flag: "🇺🇸", region: "United States", number: "(916) 916-7722", tel: "tel:+19169167722" },
  { flag: "🇬🇧", region: "United Kingdom", number: "+44 7848 177145", tel: "tel:+447848177145" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [isCallOpen, setIsCallOpen] = useState(false)
  const callRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (callRef.current && !callRef.current.contains(e.target as Node)) {
        setIsCallOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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
    { name: "Projects", path: "/project" },
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

            <div className="hidden lg:block relative" ref={callRef}>
              <button
                onClick={() => setIsCallOpen(!isCallOpen)}
                className="bg-red-500 text-white py-2 px-7 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center gap-2"
              >
                Call us
                <IoIosArrowDown className={`transition-transform duration-200 ${isCallOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isCallOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                  >
                    <p className="text-xs text-gray-400 px-4 pt-3 pb-1 uppercase tracking-wide font-semibold">Select a region</p>
                    {callOptions.map((opt) => (
                      <button
                        key={opt.tel}
                        onClick={() => {
                          setIsCallOpen(false)
                          window.location.href = opt.tel
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                      >
                        <span className="text-2xl">{opt.flag}</span>
                        <span>
                          <span className="block text-xs text-gray-400 group-hover:text-red-400">{opt.region}</span>
                          <span className="block text-sm font-semibold text-gray-800 group-hover:text-red-600">{opt.number}</span>
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
                  {/* Mobile Call us — expandable */}
                  <button
                    onClick={() => setIsCallOpen(!isCallOpen)}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Call us
                    <IoIosArrowDown className={`transition-transform duration-200 ${isCallOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isCallOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden rounded-xl border border-gray-100 shadow-sm"
                      >
                        {callOptions.map((opt) => (
                          <button
                            key={opt.tel}
                            onClick={() => {
                              setIsCallOpen(false)
                              handleLinkClick()
                              window.location.href = opt.tel
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-red-50 transition-colors group"
                          >
                            <span className="text-2xl">{opt.flag}</span>
                            <span className="text-left">
                              <span className="block text-xs text-gray-400 group-hover:text-red-400">{opt.region}</span>
                              <span className="block text-sm font-semibold text-gray-800 group-hover:text-red-600">{opt.number}</span>
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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

