"use client";
import React from "react";
import { motion } from "framer-motion";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 }, // Start state (invisible + shifted down)
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, // End state
};

const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" },
};

const CoreValue = () => {
  return (
    <div className="bg-gray-50 pt-1 pb-14">
      <Wrapper>
        <div className="md:space-y-6 space-y-2 md:mt-10 lg:mt-20">
          {/* Title Section */}
          <motion.h3
            className="text-red-600 font-semibold tracking-wider text-lg mt-10 md:text-center text-start md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Our Mission
          </motion.h3>
          <motion.h2
            className="text-black md:text-5xl text-2xl md:text-center text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Building a{" "}
            <span className="bg-gradient-to-r from-[#981127] via-[#652046] to-[#24346D] bg-clip-text text-transparent">
              Foundation
            </span>{" "}
            <br />
            for Enduring Success
          </motion.h2>

          {/* Values Section */}
          <div className="flex flex-col md:flex-row text-white gap-x-8 gap-y-8">
            {/* Box 1 */}
            <motion.div
              className="bg-white shadow-md hover:shadow-md p-8 rounded-lg w-full md:w-1/3 flex flex-col items-center justify-center "
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={hoverScale}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image src="/assets/integration.gif" alt="Integration" height={100} width={100} />
              </motion.div>
              <h4 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-custom-red via-custom-purple to-custom-blue bg-clip-text text-transparent">
                Integrity
              </h4>
              <p className="text-black text-sm lg:text-lg md:text-start text-center">
                We believe in building trust through transparent and ethical business practices.
              </p>
            </motion.div>

            {/* Box 2 */}
            <motion.div
              className="shadow-md hover:shadow-md p-8 rounded-lg w-full md:w-1/3 flex flex-col items-center justify-center "
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(127, 29, 29, 0.8), rgba(107, 33, 168, 0.8), rgba(30, 58, 138, 0.8))",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={hoverScale}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image src="/assets/innovation.gif" alt="Innovation" height={100} width={100} />
              </motion.div>
              <h4 className="text-2xl font-semibold mb-3 text-white">Innovation</h4>
              <p className="text-gray-100 text-sm lg:text-lg md:text-start text-center">
                Constantly evolving, we bring fresh ideas and advanced technology to the table.
              </p>
            </motion.div>

            {/* Box 3 */}
            <motion.div
              className="bg-white shadow-md hover:shadow-md p-8 rounded-lg w-full md:w-1/3 flex flex-col items-center justify-center "
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={hoverScale}
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image src="/assets/excellence.gif" alt="Excellence" height={100} width={100} />
              </motion.div>
              <h4 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-custom-red via-custom-purple to-custom-blue bg-clip-text text-transparent">
                Excellence
              </h4>
              <p className="text-black text-sm lg:text-lg text-start md:text-center">
                We take pride in delivering high-quality solutions that exceed expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default CoreValue;