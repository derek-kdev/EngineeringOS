"use client";


import React from "react";

import {
  Play,
  Pause,
  Square,
  Save,
  Upload,
  Download,
} from "lucide-react";



interface PrototypeToolbarProps {

  running:boolean;

  onRun:()=>void;

  onStop:()=>void;

}



export default function PrototypeToolbar({

  running,

  onRun,

  onStop,

}:PrototypeToolbarProps){



  return (

    <div

      className="
      h-11
      flex
      items-center
      gap-2
      px-4
      bg-[#101d3a]
      border-b
      border-white/10
      "

    >





      {/* RUN */}

      <button

        onClick={onRun}

        disabled={running}

        className="
        flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded
        bg-orange-500
        text-black
        font-semibold
        text-xs
        hover:scale-105
        transition
        disabled:opacity-50
        "

      >

        <Play size={15}/>

        Run


      </button>







      {/* PAUSE */}


      <button

        className="
        flex
        items-center
        justify-center
        w-8
        h-8
        rounded
        bg-white/5
        text-white/70
        hover:bg-white/10
        transition
        "

      >

        <Pause size={15}/>


      </button>







      {/* STOP */}


      <button

        onClick={onStop}

        className="
        flex
        items-center
        justify-center
        w-8
        h-8
        rounded
        bg-white/5
        text-white/70
        hover:bg-white/10
        transition
        "

      >

        <Square size={15}/>


      </button>







      {/* DIVIDER */}


      <div

        className="
        h-6
        w-px
        bg-white/10
        mx-2
        "

      />







      {/* FILE ACTIONS */}


      <button className="tool">

        <Save size={15}/>

      </button>



      <button className="tool">

        <Upload size={15}/>

      </button>



      <button className="tool">

        <Download size={15}/>

      </button>








      {/* STATUS */}


      <div

        className="
        ml-auto
        flex
        items-center
        gap-4
        "

      >




        <span

          className="
          text-green-400
          text-xs
          "

        >

          Real-time 120ms


        </span>






        <span

          className={`
          
          px-3
          
          py-1
          
          rounded-full
          
          text-xs
          
          font-semibold
          
          ${
            running
            ?
            "bg-green-500 text-black"
            :
            "bg-white/10 text-white/60"
          }

          `}

        >

          {
            running
            ?
            "SOLVER ACTIVE"
            :
            "SOLVER IDLE"
          }


        </span>





      </div>






    </div>


  );


}