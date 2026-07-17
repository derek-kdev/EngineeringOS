"use client";


import React from "react";

import {
  Terminal,
  AlertTriangle,
  Activity,
} from "lucide-react";



export default function PrototypeConsole(){



  return (

    <footer

      className="
      h-32
      bg-[#080f20]
      border-t
      border-white/10
      px-5
      py-3
      text-slate-300
      "

    >




      {/* CONSOLE TABS */}

      <div

        className="
        flex
        items-center
        gap-6
        text-xs
        mb-3
        "

      >


        <div

          className="
          flex
          items-center
          gap-2
          text-cyan-400
          "

        >

          <Terminal size={14}/>

          Console

        </div>





        <div

          className="
          flex
          items-center
          gap-2
          text-slate-400
          "

        >

          <Activity size={14}/>

          Output

        </div>






        <div

          className="
          flex
          items-center
          gap-2
          text-yellow-400
          "

        >

          <AlertTriangle size={14}/>

          Warnings (2)

        </div>



      </div>







      {/* LOG OUTPUT */}


      <div

        className="
        font-mono
        text-xs
        space-y-1
        text-green-400
        "

      >


        <p>

          [INFO] Simulation engine initialized

        </p>



        <p>

          [INFO] Prototype viewport ready

        </p>



        <p>

          [INFO] EngineeringOS solver online

        </p>



      </div>






    </footer>


  );


}