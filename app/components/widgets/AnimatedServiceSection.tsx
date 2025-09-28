"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const imageAnimation = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

const textAnimation = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export interface Service {
  title: string
  description: string
  information: string
  image?: string
}

const AnimatedServiceSection = ({ service }: { service: Service }) => {
  const imageControls = useAnimation()
  const textControls = useAnimation()
  const ref = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          Promise.all([imageControls.start("visible"), textControls.start("visible")]).then(() => {
            setHasAnimated(true)
          })
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [imageControls, textControls, hasAnimated])

  return (
    <section ref={ref} className="bg-gray-50 text-black py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div className="max-w-2xl space-y-5" initial="hidden" variants={textAnimation} animate={textControls}>
          <p className="text-red-500 text-sm uppercase tracking-widest font-semibold">{service.title}</p>
          <h1 className="lg:text-5xl md:text-3xl text-2xl mt-2 w-full">
            Cutting-Edge{" "}
            <span className="bg-gradient-to-r font-bold from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent">
              {service.description}
            </span>{" "}
            for Digital Success
          </h1>
          <p className="mt-4 text-black md:text-lg text-sm">{service.information}</p>
        </motion.div>
        <motion.div className="flex-shrink-0" initial="hidden" variants={imageAnimation} animate={imageControls}>
          {service.image && (
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              height={500}
              width={500}
              className="lg:w-[600px] md:w-[350px]"
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedServiceSection

