"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A] flex items-center justify-center">

      {/* Animated orange atmosphere */}
      <motion.div
        className="
          absolute
          h-[550px]
          w-[550px]
          rounded-full
          bg-[#f07b16]/20
          blur-[160px]
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* Secondary glow */}
      <motion.div
        className="
          absolute
          bottom-0
          h-[300px]
          w-full
          bg-gradient-to-t
          from-[#f07b16]/10
          to-transparent
        "
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />


      {/* Hero content */}
      <div className="relative z-10 max-w-5xl px-6 text-center">


        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-5xl
            md:text-7xl
            font-bold
            tracking-tight
            text-white
          "
        >
          Engineering intelligence.
          <br />
          Built into one platform.
        </motion.h1>


        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-lg
            text-zinc-400
          "
        >
          EngineeringOS connects design, simulation,
          calculation, AI assistance and collaboration
          into one intelligent engineering ecosystem.
        </motion.p>


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
            delay: 0.4,
            duration: 0.8,
          }}
          className="mt-10 flex justify-center gap-4"
        >

          <Link
            href="/signup"
            className="
              rounded-lg
              bg-[#f07b16]
              px-8
              py-4
              font-semibold
              text-white
              shadow-[0_0_40px_rgba(240,123,22,0.35)]
              transition
              hover:scale-105
            "
          >
            Get Started
          </Link>


          <button
            className="
              rounded-lg
              border
              border-zinc-700
              bg-zinc-900/50
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:border-[#f07b16]
            "
          >
            Explore Platform
          </button>

        </motion.div>

      </div>


      {/* Subtle bottom fade */}
      <div
        className="
          absolute
          bottom-0
          h-32
          w-full
          bg-gradient-to-t
          from-[#0A0A0A]
          to-transparent
        "
      />

    </section>
  );
}