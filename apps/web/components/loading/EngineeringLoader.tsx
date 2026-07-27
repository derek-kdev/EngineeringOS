"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  motion,
} from "framer-motion";


import {
  loaderImages,
  loaderAnimations,
  randomItem,
} from "./loader.config";


import LoaderAnimation from "./LoaderAnimation";



export default function EngineeringLoader(){


  const [image,setImage] =
    useState<string | null>(null);



  const [animation,setAnimation] =
    useState<
      typeof loaderAnimations[number] | null
    >(null);



  useEffect(()=>{


    setImage(
      randomItem(loaderImages)
    );


    setAnimation(
      randomItem(loaderAnimations)
    );


  },[]);




  if(
    !image ||
    !animation
  ){

    return (

      <main
        className="
          fixed
          inset-0
          z-[999]
          flex
          items-center
          justify-center
          bg-black
        "
      />

    );

  }




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
          grid
          h-80
          w-80
          place-items-center
        "

      >



        <div
          className="
            grid
            place-items-center
            [grid-area:1/1]
          "
        >

          <LoaderAnimation
            type={animation}
          />

        </div>




        <motion.img

          src={image}

          alt="EngineeringOS Loading"


          className="
            [grid-area:1/1]
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
