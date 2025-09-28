// app/about.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "@/app/components/shared/Wrapper";
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

const About = () => {
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
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
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      imageControls.start("visible");
      textControls.start("visible");
    } else {
      imageControls.start("hidden");
      textControls.start("hidden");
    }
  }, [isIntersecting, imageControls, textControls]);

  return (
    <div>
      <Wrapper>
        <div
          className="flex flex-col-reverse md:flex-row items-center md:gap-x-10  justify-center mt-10 bg-white overflow-hidden"
          ref={ref}
        >
      

          <motion.div
            className="mt-8 md:mt-0 flex-1"
            initial="hidden"
            animate={textControls}
            variants={textAnimation}
          >
            <motion.h4 className="md:text-xl text-lg font-semibold text-red-600 mb-2">
             Our Journey
            </motion.h4>

            <motion.h2 className="md:text-4xl lg:text-5xl text-3xl  leading-tight">
              Empowering your <br />
              Business Through <br />
              Innovation
            </motion.h2>

            <motion.p className="mt-4 text-gray-600 lg:text-lg text-sm mb-5">
            At Bright Reach Solution, we are committed to transforming businesses through innovative IT solutions. With a deep understanding of the technology landscape and an unwavering focus on customer success, we specialize in offering custom software development, IT consultancy, and digital transformation solutions. Whether you are a startup looking to build a scalable product or an established business aiming to modernize your digital infrastructure, we are here to support your journey.
            </motion.p>
          </motion.div>

          <motion.div
           
           initial="hidden"
           animate={imageControls}
           variants={imageAnimation}
         >
           <Image
             src="/assets/about4.png"
             alt="about"
             height={500}
             width={500}
          className="lg:w-[600px]  md:w-[300px]"
           />
         </motion.div>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;
