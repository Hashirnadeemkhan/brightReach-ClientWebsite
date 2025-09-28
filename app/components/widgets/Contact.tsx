"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { FaChevronDown } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Toaster, toast } from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Service is required"), // Changed this line
  message: z.string().min(1, "Message is required"),
})

type FormData = z.infer<typeof formSchema>

const Contact = () => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceType: "", // Ensure default empty string
      message: "",
    },
  })

  const serviceType = watch("serviceType")

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start("visible").then(() => {
            setHasAnimated(true)
          })
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [controls, hasAnimated])

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success("Thank you for your submission!", {
          style: {
            border: "1px solid #4ade80",
            padding: "16px",
            color: "#4ade80",
          },
        })

        // Reset the form fields after successful submission
        reset()
      } else {
        toast.error("Sorry, something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast.error("Sorry, something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center bg-white mt-10 mb-10" ref={ref}>
      <motion.form
        className="w-full max-w-3xl p-8"
        initial="hidden"
        animate={controls}
        variants={formVariants}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="lg:text-6xl text-4xl font-semibold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-900">
          Get in Touch
        </h2>

        <div className="flex flex-wrap items-center mb-4 w-full">
          <motion.div className="w-full md:w-1/2 px-3 mb-4 md:mb-0" variants={formVariants}>
            <input
              className="w-full px-4 py-3 border rounded-full border-red-800 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              type="text"
              placeholder="Your Name"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </motion.div>
          <motion.div className="w-full md:w-1/2 px-3" variants={formVariants}>
  <input
    className="w-full px-4 py-3 border rounded-full border-red-800 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
    type="email"
    placeholder="Email Address"
    {...register("email")}
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">
      {errors.email.message}
    </p>
  )}
</motion.div>
        </div>

        <div className="flex flex-wrap mb-4">
          <motion.div className="w-full md:w-1/2 px-3 mb-4 md:mb-0" variants={formVariants}>
            <input
              className="w-full px-4 py-3 border rounded-full border-red-800 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              type="text"
              placeholder="Phone No"
              {...register("phone")}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </motion.div>

          <motion.div className="w-full md:w-1/2 px-3" variants={formVariants}>
            <input
              className="w-full px-4 py-3 border rounded-full border-red-800 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              type="text"
              placeholder="Company"
              {...register("company")}
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
          </motion.div>
        </div>

        <motion.div className="relative mb-4 px-3" variants={formVariants}>
  <button
    type="button"
    className="w-full px-4 py-3 border rounded-full border-red-800 outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {serviceType || "Type Service"}
    <FaChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
  </button>
  {dropdownOpen && (
    <motion.ul
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 w-full mt-2 bg-white border border-red-800 rounded-lg shadow-lg z-10"
    >
      {[
        "Web Design & Development",
        "Mobile App Development",
        "Animation",
        "Logo & Illustration",
        "Social Media Marketing",
        "Branding & Graphic Design",
        "SEO & Content Writing",
        "SaaS",
      ].map((service) => (
        <li
          key={service}
          className="px-4 py-2 hover:bg-red-700 hover:text-white cursor-pointer"
          onClick={() => {
            setDropdownOpen(false)
            setValue("serviceType", service)
          }}
        >
          {service}
        </li>
      ))}
    </motion.ul>
  )}
  {errors.serviceType && (
    <p className="text-red-500 text-sm mt-1">
      {errors.serviceType.message}
    </p>
  )}
</motion.div>

        <motion.div className="mb-4 px-3" variants={formVariants}>
          <textarea
            className="w-full px-4 py-3 border rounded-3xl border-red-800 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            placeholder="Type Message"
            {...register("message")}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </motion.div>

        <motion.div className="px-3" variants={formVariants}>
          <button
            className="w-full py-3 text-white rounded-full bg-gradient-to-r from-red-700 to-blue-900 hover:from-red-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500"
            type="submit"
          >
            Submit
          </button>
        </motion.div>
      </motion.form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default Contact