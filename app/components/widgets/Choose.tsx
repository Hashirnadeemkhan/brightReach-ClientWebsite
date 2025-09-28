"use client";
import React, { useEffect, useRef } from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const imageAnimation = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const textAnimation = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Choose = () => {
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          imageControls.start("visible");
          textControls.start("visible");
        } else {
          imageControls.start("hidden");
          textControls.start("hidden");
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [imageControls, textControls]);

  return (
    <div>
      <Wrapper>
        <div
          className="flex flex-col-reverse md:flex-row items-center justify-center p-10 md:gap-x-10 bg-white overflow-hidden"
          ref={ref}
        >
          <motion.div
            className="mt-8 md:mt-0 flex-1"
            initial="hidden"
            animate={textControls}
            variants={textAnimation}
          >
            <h3 className="md:text-xl text-lg font-semibold text-gray-700 mb-2">
              Why Choose Us
            </h3>
            <h2 className="md:text-5xl text-3xl font-bold leading-tight">
              Why{" "}
              <span className="bg-gradient-to-r from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent">
                Bright Reach Solution
              </span>{" "}
              Stands Apart
            </h2>
            <p className="mt-4 text-gray-600 lg:text-lg text-sm mb-5">
              At <span className="font-semibold">Bright Reach Solution</span>, we go 
              beyond delivering services — we build long-term partnerships. 
              Our approach blends innovation, technical expertise, and 
              a deep understanding of your industry to create solutions 
              that truly add value. By focusing on reliability, 
              transparency, and measurable results, we ensure your business 
              is always one step ahead in today’s fast-paced digital world.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={imageControls}
            variants={imageAnimation}
          >
            <Image
              src="/assets/about3.png"
              alt="about"
              height={500}
              width={500}
              className="lg:w-[600px] md:w-[300px]"
            />
          </motion.div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Choose;
