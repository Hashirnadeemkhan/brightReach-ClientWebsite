"use client"

import React from "react"
import { motion } from "framer-motion"
import { Play, Quote, Star } from "lucide-react"
import Link from "next/link"

const reviewsData = [
  {
    video: "/assets/WhatsApp Video 2026-01-25 at 6.56.53 PM.mp4",
    title: "Fence Master",
    description: "See how we helped Fence Master establish a strong digital presence and grow their business online.",
    rating: 5
  },
  {
    video: "/assets/WhatsApp Video 2026-01-25 at 6.56.57 PM.mp4",
    title: "V-Class Chauffeur",
    description: "Discover how V-Class Chauffeur transformed their online visibility and attracted more premium clients.",
    rating: 5
  }
]

const Reviews = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-[#981127] mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Client Success Stories
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-gradient-to-r from-[#981127] to-[#652046] rounded-full" />
            <div className="h-1 w-3 bg-[#24346D] rounded-full" />
          </div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hear directly from our clients about their experience working with us
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="space-y-16 lg:space-y-24">
          {reviewsData.map((review, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-10 lg:gap-16`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Video Section */}
              <div className="lg:w-3/5 w-full">
                <div className="relative group">
                  {/* Decorative background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#981127]/10 via-[#652046]/10 to-[#24346D]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Video container */}
                  <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10">
                    <video
                      src={review.video}
                      controls
                      className="w-full h-auto"
                      style={{ aspectRatio: "16/9" }}
                      poster=""
                    >
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Play overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Corner accent */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#981127] to-[#24346D] rounded-xl opacity-20 blur-sm" />
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/5 w-full">
                <div className={`${index % 2 === 0 ? "lg:pl-4" : "lg:pr-4"}`}>
                  {/* Quote icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#981127]/10 to-[#24346D]/10">
                      <Quote className="w-5 h-5 text-[#981127]" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent">
                      {review.title}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-6">
                    {review.description}
                  </p>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#981127] to-[#24346D] text-white text-sm font-medium shadow-lg shadow-[#981127]/20">
                    <Play className="w-4 h-4" />
                    Client Success Story
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200">
            <p className="text-slate-700 font-medium">
              Ready to become our next success story?
            </p>
            <Link href="https://wa.me/+447718923178"
  target="_blank"
  rel="noopener noreferrer"><button className="px-6 py-3 rounded-full bg-gradient-to-r from-[#981127] to-[#24346D] text-white font-semibold text-sm shadow-lg shadow-[#981127]/25 hover:shadow-xl hover:shadow-[#981127]/30 transition-all duration-300 hover:-translate-y-0.5">
              Get Started Today
            </button></Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
