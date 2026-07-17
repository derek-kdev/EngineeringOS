"use client";


import React from "react";


import {
  Box,
  RotateCcw,
  Maximize2,
  Grid3X3,
} from "lucide-react";


import { motion } from "framer-motion";



interface PrototypeViewportProps {


  running:boolean;


  wireframe:boolean;


  onToggleWireframe:()=>void;


}





export default function PrototypeViewport({

  running,

  wireframe,

  onToggleWireframe,


}:PrototypeViewportProps){



  return (

    <div

      className="
      h-full
      rounded-lg
      border
      border-dashed
      border-white/10
      bg-[#101d3a]
      relative
      overflow-hidden
      "

    >






      {/* ENGINE OBJECT */}


      <div

        className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        "

      >


        <motion.div


          animate={{

            rotate:
            running
            ?
            360
            :
            0

          }}


          transition={{

            duration:5,


            repeat:
            running
            ?
            Infinity
            :
            0,


            ease:"linear"


          }}



          className={`

          w-48

          h-48

          rounded-xl

          flex

          items-center

          justify-center


          border


          ${
            wireframe
            ?
            "border-orange-400/60 bg-transparent"
            :
            "border-cyan-400/40 bg-gradient-to-br from-cyan-500/30 to-orange-500/30"
          }


          `}


        >



          <Box

            size={80}

            className="
            text-cyan-400
            "

          />



        </motion.div>




      </div>








      {/* INSTRUCTIONS */}


      <div

        className="
        absolute
        top-4
        left-5
        text-xs
        text-slate-500
        "

      >

        Drag to rotate • Scroll to zoom • Right drag to pan


      </div>








      {/* VIEW CONTROLS */}


      <div

        className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
        flex
        gap-2
        bg-[#0c1f36]
        p-2
        rounded-lg
        "

      >




        <button

          className="
          tool
          flex
          items-center
          gap-2
          "

        >

          <RotateCcw size={15}/>

          Reset


        </button>







        <button

          className="
          tool
          flex
          items-center
          gap-2
          "

        >

          <Maximize2 size={15}/>

          Explode


        </button>







        <button


          onClick={onToggleWireframe}


          className="
          tool
          flex
          items-center
          gap-2
          "

        >


          <Grid3X3 size={15}/>


          {
            wireframe
            ?
            "Solid"
            :
            "Wire"
          }



        </button>




      </div>









      {/* STATUS INDICATOR */}


      <div

        className="
        absolute
        top-4
        right-5
        flex
        items-center
        gap-2
        text-xs
        "

      >


        <span

          className={`
          w-2
          h-2
          rounded-full

          ${
            running
            ?
            "bg-green-400"
            :
            "bg-slate-500"
          }

          `}

        />



        {
          running
          ?
          "Simulation Running"
          :
          "Viewport Ready"
        }



      </div>






    </div>


  );


}