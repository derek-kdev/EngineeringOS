"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Filament from "./Filament";


const loadingImages = [
  "/img/loading1.jpg",
  "/img/loading2.jpg",
  "/img/loading3.jpg",
  "/img/loading4.jpg",
  "/img/loading5.jpg",
  "/img/loading6.jpg",
  "/img/loading7.png",
];


export default function EngineeringLoader() {

  const [image, setImage] = useState(
    loadingImages[0]
  );


  useEffect(() => {

    const key = "engineeringos_loader_index";

    const current =
      Number(
        localStorage.getItem(key) || "0"
      );


    const next =
      current % loadingImages.length;


    setImage(
      loadingImages[next]
    );


    localStorage.setItem(
      key,
      String(
        (next + 1) % loadingImages.length
      )
    );


  }, []);



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


        <motion.img

          src={image}

          alt="EngineeringOS Loading"

          className="
            relative
            z-10
            h-44
            w-44
            rounded-full
            object-cover
            border
            border-white/20
            shadow-2xl
          "


          animate={{

            rotate:[
              0,
              360
            ]

          }}


          transition={{

            duration:12,

            repeat:Infinity,

            ease:"linear"

          }}

        />


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
