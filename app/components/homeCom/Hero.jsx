"use client";
import Link from "next/link";
import { Cover } from "../ui/cover";
import { FlipWords } from "../ui/flip-words";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Card from "./Cube";
import Card2 from './Cube2'

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const words = ["React JS", "Next JS", "3D UI"];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (

    <div className="flex justify-around md:flex-row flex-col lg:flex-row  lg:w-full max-w-screen min-w-screen text-blue-950  ">

    <div className="relative max-w-screen min-h-screen lg:mt-10 md:mt-10 flex flex-col lg:flex-col -mt-56 items-center justify-center text-center gap-10  mx-6 lg:px-20 text-blue-950 overflow-hidden">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className=" flex justify-center items-center perspective-1000"
        >
        <img
          src="/images/bg-removed.png"
          alt="Hero Visual"
          className="w-full rounded-full object-top  contrast-125 brightness-110 transition-all duration-500 transform hover:scale-110 hover:rotate-1 -rotate-3  cursor-pointer"
          />
      </motion.div>

      {/* Content Section */}
      {showContent && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center  space-y-6 max-w-xl"
        >
          <h1 className="lg:text-5xl text-3xl md:text-4xl font-extrabold tracking-wide dark:text-neutral-200">
            Hi, I'm Adarsh
          </h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-row md:flex-row items-center justify-center text-2xl md:text-3xl lg:text-4xl font-semibold gap-2 dark:text-neutral-200 "
          >
            I Develop
            <span className=" flex font-bold flex-row lg:text-4xl md:text-4xl    text-3xl">
              <FlipWords words={words} />
            </span>
            <span className="dark:text-neutral-300">Websites...</span>
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg lg:text-2xl md:text-xl dark:text-cyan-300 italic"
            >
            <Cover>
              Build amazing websites  at warp speed
            </Cover>
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/samples">
                <button className="px-6 cursor-pointer py-3 dark:bg-cyan-500 text-black font-bold rounded-full shadow-sm shadow-cyan-500 hover:bg-cyan-400 transition-all text-lg">
                  View Projects
                </button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <button
                  className="px-6 py-3 border cursor-pointer border-gray-600 rounded-full dark:text-black font-bold 
                      invert text-white dark:bg-slate-50 hover:contrast-125 text-lg transition-all"
                >
                  Contact Me
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-10 mt-2">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://github.com/Stack-Sage"
              target="_blank"
              >
              <FaGithub size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://linkedin.com/in/adarsh-pathania177/"
              target="_blank"
              >
              <FaLinkedin size={28} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://twitter.com/yourusername"
              target="_blank"
              >
              <FaTwitter size={28} />
            </motion.a>
          </div>
        </motion.div>
      )}



    </div>
        {/* Card Section */}
      <div className="flex items-center justify-center mt-32 lg:mt-0 md:mt-0 lg:scale-105 flex-col lg:gap-28 gap-36 md:scale-90 scale-[0.8] fade-up">
        <Card />
        <Card2 />
      </div>
      </div>
  );
};

export default Hero;
