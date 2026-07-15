"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { landingSlides } from "@/constants/landingSlides";

export default function LandingSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === landingSlides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = landingSlides[current];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0B132B]">

      <AnimatePresence mode="wait">

        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* Background Image Motion */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >

            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />

          </motion.div>


          {/* Dark Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#0B132B]/85
              via-[#0B132B]/55
              to-[#0B132B]/25
            "
          />


          {/* Holographic Glow */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.15),transparent_65%)]
            "
          />


          {/* Content Wrapper */}
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              px-6
              text-center
            "
          >

            <motion.div
              key={slide.id}
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="
                relative
                max-w-4xl
                text-white
              "
            >

              {/* Text Glow */}
              <div
                className="
                  absolute
                  inset-0
                  bg-[#00D2FF]/10
                  blur-[100px]
                  rounded-full
                "
              />


              <div className="relative z-10">


                {/* Title */}
                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  className="
                    text-3xl
                    md:text-5xl
                    lg:text-6xl
                    font-bold
                    leading-[1.05]
                    tracking-tight
                  "
                >

                  {slide.title}

                  <br />

                  <span
                    className="
                      bg-gradient-to-r
                      from-[#00D2FF]
                      via-[#0284C7]
                      to-[#FF6B00]
                      bg-clip-text
                      text-transparent
                    "
                  >
                    {slide.highlight}
                  </span>

                </motion.h1>



                {/* Description */}
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: "blur(5px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.45,
                  }}
                  className="
                    mt-3
                    md:mt-4
                    max-w-2xl
                    mx-auto
                    text-sm
                    md:text-lg
                    lg:text-xl
                    leading-relaxed
                    text-white/75
                  "
                >

                  {slide.description}

                </motion.p>



                {/* Actions */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                  }}
                  className="
                    mt-5
                    flex
                    justify-center
                    gap-3
                    flex-wrap
                  "
                >

                  <button
                    className="
                      rounded-full
                      px-7
                      py-2.5
                      text-sm
                      md:text-base
                      font-semibold
                      text-white
                      bg-gradient-to-r
                      from-[#FF6B00]
                      to-[#FF9D00]
                      shadow-[0_0_30px_rgba(255,107,0,0.45)]
                      hover:scale-105
                      transition
                    "
                  >
                    Get Started
                  </button>


                  <button
                    className="
                      rounded-full
                      px-7
                      py-2.5
                      text-sm
                      md:text-base
                      font-semibold
                      text-white
                      border
                      border-[#00D2FF]/40
                      bg-white/5
                      backdrop-blur-md
                      hover:bg-[#00D2FF]/10
                      transition
                    "
                  >
                    Explore Platform
                  </button>

                </motion.div>


              </div>

            </motion.div>

          </div>


        </motion.div>

      </AnimatePresence>

    </main>
  );
}