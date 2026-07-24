"use client";

import {
  motion,
} from "framer-motion";

import Filament from "./Filament";



export default function EngineeringLoader() {


  return (

    <main

      className="
        fixed
        inset-0
        z-[999]
        flex
        flex-col
        items-center
        justify-center
        bg-black
        overflow-hidden
      "

    >


      <div

        className="
          relative
          h-80
          w-80
          flex
          items-center
          justify-center
        "

      >


        <Filament />



      </div>





      <motion.h1

        className="
          mt-10
          text-lg
          font-semibold
          tracking-[0.45em]
          text-white
        "

        animate={{

          opacity:[
            0.4,
            1,
            0.4
          ]

        }}

        transition={{

          duration:2.5,

          repeat:Infinity

        }}

      >

        ENGINEERINGOS

      </motion.h1>





      <motion.p

        className="
          mt-3
          text-xs
          tracking-wide
          text-white/40
        "

        animate={{

          opacity:[
            0.3,
            0.8,
            0.3
          ]

        }}

        transition={{

          duration:3,

          repeat:Infinity

        }}

      >

        Building engineering intelligence...

      </motion.p>



    </main>

  );

}