"use client";


import React from "react";

import {
  Settings,
  Cpu,
  Gauge,
  Layers,
} from "lucide-react";



export default function PrototypeProperties(){



  return (

    <aside

      className="
      w-72
      bg-[#0c1f36]
      border-l
      border-white/10
      p-4
      text-slate-200
      "

    >



      {/* HEADER */}

      <h2

        className="
        flex
        items-center
        gap-2
        font-semibold
        mb-6
        "

      >

        <Settings size={18}/>

        Properties


      </h2>







      {/* COMPONENT INFO */}


      <div

        className="
        bg-[#14233f]
        rounded-lg
        p-4
        mb-4
        border
        border-white/5
        "

      >


        <div

          className="
          flex
          items-center
          gap-2
          text-xs
          text-slate-400
          mb-2
          "

        >

          <Cpu size={14}/>

          Component


        </div>



        <p className="text-sm font-medium">

          Engine Block

        </p>



      </div>









      {/* SOLVER SETTINGS */}


      <div

        className="
        bg-[#14233f]
        rounded-lg
        p-4
        mb-4
        border
        border-white/5
        "

      >


        <div

          className="
          flex
          items-center
          gap-2
          mb-3
          "

        >

          <Gauge size={16}/>

          <p className="text-sm font-semibold">

            Solver Settings

          </p>


        </div>




        <div className="space-y-2 text-sm">


          <p>

            <span className="text-slate-400">

              Method:

            </span>


            <span className="text-cyan-400 ml-2">

              Runge-Kutta

            </span>


          </p>





          <p>

            <span className="text-slate-400">

              Step:

            </span>


            <span className="ml-2">

              0.001s

            </span>


          </p>





          <p>

            <span className="text-slate-400">

              Solver:

            </span>


            <span className="text-green-400 ml-2">

              Active

            </span>


          </p>



        </div>


      </div>









      {/* MODEL TREE */}


      <div

        className="
        bg-[#14233f]
        rounded-lg
        p-4
        border
        border-white/5
        "

      >


        <div

          className="
          flex
          items-center
          gap-2
          mb-3
          "

        >

          <Layers size={16}/>


          <p className="text-sm font-semibold">

            Model Tree

          </p>


        </div>





        <div

          className="
          text-xs
          text-slate-400
          space-y-2
          "

        >

          <p>
            └── Engine Assembly
          </p>

          <p className="ml-3">
            ├── Cylinder Block
          </p>

          <p className="ml-3">
            ├── Shaft System
          </p>

          <p className="ml-3">
            └── Control Unit
          </p>


        </div>


      </div>





    </aside>


  );


}