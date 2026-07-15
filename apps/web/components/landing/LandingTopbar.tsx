"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingTopbar() {
  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        pointer-events-none
        px-6
        py-5
      "
    >
      <div
        className="
          pointer-events-auto
          mx-auto
          max-w-7xl
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(0,0,0,0.25)]
          px-6
          py-3
        "
      >

        {/* Logo */}
        <Link
          href="/"
          className="
            flex
            items-center
            gap-3
            group
          "
        >

          <motion.div
            whileHover={{
              rotate: 20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-[#FF6B00]
              to-[#FFB300]
              shadow-[0_0_25px_rgba(255,107,0,0.45)]
            "
          >
            <Settings
              size={22}
              className="text-white"
            />
          </motion.div>


          <span
            className="
              text-xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Engineering
            <span
              className="
                text-[#FF6B00]
              "
            >
              OS
            </span>
          </span>

        </Link>



        {/* Middle Navigation */}
        <nav
          className="
            hidden
            sm:flex
            items-center
            gap-4
          "
        >

          <Link
            href="/contact"
            className="
              rounded-full
              border
              border-[#00D2FF]/30
              bg-[#00D2FF]/5
              px-5
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#00D2FF]/15
              hover:border-[#00D2FF]/60
            "
          >
            Contact
          </Link>


          <Link
            href="/pricing"
            className="
              rounded-full
              border
              border-[#00D2FF]/30
              bg-[#00D2FF]/5
              px-5
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#00D2FF]/15
              hover:border-[#00D2FF]/60
            "
          >
            Pricing
          </Link>

        </nav>



        {/* Authentication */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* Correct Sign In Route */}
          <Link
            href="/signin"
            className="
              rounded-full
              border
              border-[#00D2FF]/40
              bg-white/5
              px-5
              py-2
              text-sm
              font-medium
              text-white
              backdrop-blur-md
              transition
              hover:bg-[#00D2FF]/10
              hover:border-[#00D2FF]
            "
          >
            Sign In
          </Link>



          {/* Register Route */}
          <Link
            href="/register"
            className="
              rounded-full
              bg-gradient-to-r
              from-[#FF6B00]
              to-[#FF9D00]
              px-6
              py-2
              text-sm
              font-semibold
              text-white
              shadow-[0_0_30px_rgba(255,107,0,0.45)]
              transition
              hover:scale-105
            "
          >
            Get Started
          </Link>

        </div>


      </div>

    </header>
  );
}