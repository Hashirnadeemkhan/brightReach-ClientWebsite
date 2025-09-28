"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    id: "faq1",
    question: "How long does a typical project take at Bright Reach Solution?",
    answer:
      "Project timelines depend on complexity and requirements. For instance, a standard business website usually takes 3–5 weeks, while more advanced projects such as mobile apps or enterprise solutions may take 8–12 weeks. During our consultation, we share a clear roadmap tailored to your goals.",
  },
  {
    id: "faq2",
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes! At Bright Reach Solution, we don’t just deliver and disappear. We provide maintenance, updates, and post-launch support packages to ensure your website, app, or platform runs smoothly and continues to meet your business needs.",
  },
  {
    id: "faq3",
    question: "How much will my project cost?",
    answer:
      "Every project is unique, so pricing depends on factors like scope, features, design complexity, and deadlines. We always provide a transparent, customized quote upfront with no hidden costs, so you know exactly what to expect.",
  },
  {
    id: "faq4",
    question: "Can Bright Reach Solution handle large-scale projects?",
    answer:
      "Absolutely! We specialize in projects of all sizes, from startups to enterprises. Whether it’s a SaaS platform, an eCommerce solution, or a complete digital transformation, our team has the expertise and resources to deliver high-quality, scalable solutions.",
  },
]


const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  // Split FAQs into two arrays for two columns
  const leftColumnFaqs = faqs.filter((_, index) => index % 2 === 0)
  const rightColumnFaqs = faqs.filter((_, index) => index % 2 === 1)

  return (
    <div
      className="bg-gradient-to-r from-red-900 via-purple-800 to-blue-900 py-20 px-10 text-white"
      style={{
        backgroundImage: 'linear-gradient(to right, #7f1d1d, #6b21a8, #1e3a8a), url("/assets/bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="md:text-3xl text-lg font-medium mb-4 text-start">Frequently Asked Questions</h2>
        <h3 className="md:text-5xl text-xl font-medium text-start">Your Questions, Answered</h3>
        <p className="mt-5 text-gray-300 text-start">
          At <span className="font-bold text-white"> Bright Reach Solution</span>, we believe in transparency and clarity. Our
          FAQ section is designed to address your most common queries about our services, empowering you to make
          informed decisions for your business. Explore our expertise, and let us help you find the right solutions to
          drive your business forward efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="space-y-6">
          {leftColumnFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              layout
              className="border-b border-gray-400 pb-4 cursor-pointer hover:text-gray-300 transition duration-300"
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex justify-between items-center">
                <h4 className="lg:text-xl md:text-sm">{faq.question}</h4>
                <span className="text-xl font-bold">{openFAQ === faq.id ? "-" : "+"}</span>
              </div>

              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <p className="text-sm transition duration-300 whitespace-pre-line">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {rightColumnFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              layout
              className="border-b border-gray-400 pb-4 cursor-pointer hover:text-gray-300 transition duration-300"
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex justify-between items-center">
                <h4 className="lg:text-xl md:text-sm">{faq.question}</h4>
                <span className="text-xl font-bold">{openFAQ === faq.id ? "-" : "+"}</span>
              </div>

              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <p className="text-sm transition duration-300 whitespace-pre-line">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQSection

