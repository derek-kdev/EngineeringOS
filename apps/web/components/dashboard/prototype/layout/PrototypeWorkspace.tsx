"use client";

import React from "react";

import PrototypeHeader from "./PrototypeHeader";
import PrototypeToolbar from "./PrototypeToolbar";
import PrototypeViewport from "./PrototypeViewport";
import PrototypeProperties from "./PrototypeProperties";
import PrototypeConsole from "./PrototypeConsole";

import usePrototypeEngine from "@/hooks/usePrototypeEngine";



export default function PrototypeWorkspace() {


  const {
    leftExpanded,

    running,

    wireframe,


    toggleLeftPanel,

    startSimulation,

    stopSimulation,

    toggleWireframe,


  } = usePrototypeEngine();





  return (

    <div
      className="
      fixed
      inset-0
      flex
      flex-col
      bg-[#050b18]
      text-slate-200
      overflow-hidden
      "
    >



      {/* =====================================================
          APPLICATION HEADER
      ====================================================== */}

      <PrototypeHeader />







      {/* =====================================================
          SIMULATION TOOLBAR
      ====================================================== */}

      <PrototypeToolbar

        running={running}

        onRun={startSimulation}

        onStop={stopSimulation}

      />









      {/* =====================================================
          ENGINE WORKSPACE
      ====================================================== */}


      <div

        className="
        flex
        flex-1
        overflow-hidden
        "

      >





        {/* =====================================================
            COMPONENT LIBRARY
        ====================================================== */}


        <aside

          className={`
          
          ${
            leftExpanded
            ?
            "w-60"
            :
            "w-16"
          }


          bg-[#0c1f36]

          border-r

          border-white/10

          transition-all

          duration-300

          p-3

          `}

        >


          <button

            onClick={toggleLeftPanel}

            className="
            mb-4
            text-slate-400
            hover:text-white
            transition
            "

          >

            ☰

          </button>



          <ComponentButton
            icon="⚙️"
            label="Mechanical"
            expanded={leftExpanded}
          />



          <ComponentButton
            icon="⚡"
            label="Electrical"
            expanded={leftExpanded}
          />



          <ComponentButton
            icon="💧"
            label="Fluid Systems"
            expanded={leftExpanded}
          />



          <ComponentButton
            icon="📡"
            label="Controls"
            expanded={leftExpanded}
          />



        </aside>









        {/* =====================================================
            ENGINE VIEWPORT
        ====================================================== */}


        <main

          className="
          flex-1
          relative
          bg-[#101d3a]
          p-4
          "

        >


          <PrototypeViewport

            running={running}

            wireframe={wireframe}

            onToggleWireframe={
              toggleWireframe
            }

          />


        </main>








        {/* =====================================================
            PROPERTY INSPECTOR
        ====================================================== */}


        <PrototypeProperties />



      </div>








      {/* =====================================================
          SYSTEM CONSOLE
      ====================================================== */}


      <PrototypeConsole />



    </div>


  );

}








function ComponentButton({

  icon,

  label,

  expanded,


}:{

  icon:string;

  label:string;

  expanded:boolean;


}){


  return (

    <div

      className="
      relative
      flex
      items-center
      gap-3
      bg-[#14233f]
      rounded
      p-2
      mb-2
      cursor-pointer
      hover:bg-[#1a2d52]
      transition
      "

    >


      <span>

        {icon}

      </span>




      {
        expanded && (

          <span className="text-sm">

            {label}

          </span>

        )
      }



    </div>

  );


}