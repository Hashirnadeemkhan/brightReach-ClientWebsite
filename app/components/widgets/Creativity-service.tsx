"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Creativity = () => {
  return (
    <motion.div 
      className="relative px-4 mt-28 mb-20"
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div 
        className="relative w-full rounded-xl max-w-7xl mx-auto" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(127, 29, 29, 0.8), rgba(107, 33, 168, 0.8), rgba(30, 58, 138, 0.8))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="px-4 pt-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Content */}
            <motion.div 
              className="relative z-10 md:pl-10 flex-1"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 ">
                Craft creativity with our <span className="italic">Digital Experts.</span>
              </h1>
              <Link href={"/contact"}><motion.button 
                className="text-lg px-8 py-3 rounded-xl bg-white text-black hover:bg-red-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get started free
              </motion.button></Link>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              className="relative flex-1 w-full"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Main Image */}
              <div className="relative w-full h-[350px] md:h-[280px] lg:h-[300px] lg:-mt-20 lg:-mb-12 md:-mb-20 md:-mt-28 rounded-xl z-20 overflow-hidden">
                <Image
                  src="/assets/creativity-img.png"
                  alt="Digital Expert at Work"
                  fill
                  className="object-contain absolute rounded-xl z-10 lg:pl-52 mt-8 md:mt-0"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Creativity;
