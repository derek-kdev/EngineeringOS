"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  LayoutDashboard,
  LogOut,
} from "lucide-react";


export default function PrototypeHeader() {


  const router = useRouter();



  return (

    <header
      className="
      h-12
      flex
      items-center
      px-4
      bg-[#101d3a]
      border-b
      border-white/10
      flex-shrink-0
      "
    >



      {/* BRAND */}

      <div
        className="
        flex
        items-center
        gap-3
        "
      >


        <div
          className="
          w-8
          h-8
          rounded-md
          bg-gradient-to-br
          from-cyan-400
          to-orange-500
          flex
          items-center
          justify-center
          font-bold
          text-[#07111f]
          "
        >

          E

        </div>




        <div>


          <div
            className="
            font-semibold
            text-lg
            "
          >

            EngineeringOS

          </div>




          <div
            className="
            text-xs
            text-cyan-300
            "
          >

            Prototype Engineering Engine

          </div>



        </div>


      </div>






      {/* APPLICATION MENU */}


      <nav
        className="
        flex
        gap-8
        ml-12
        text-sm
        text-slate-400
        "
      >


        <span
          className="
          text-cyan-400
          cursor-pointer
          "
        >

          File

        </span>



        <span className="cursor-pointer">

          Model

        </span>



        <span className="cursor-pointer">

          Simulation

        </span>



        <span className="cursor-pointer">

          Analysis

        </span>



        <span className="cursor-pointer">

          Tools

        </span>



      </nav>







      {/* RIGHT STATUS AREA */}


      <div
        className="
        ml-auto
        flex
        items-center
        gap-3
        "
      >




        {/* DASHBOARD RETURN */}


        <button

          onClick={() =>
            router.push("/dashboard")
          }


          className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          border-white/10
          bg-white/5
          px-3
          py-1.5
          text-xs
          text-white/80
          hover:bg-white/10
          transition
          "

        >

          <LayoutDashboard size={15}/>

          Dashboard


        </button>








        {/* EXIT WORKSPACE */}


        <button

          onClick={() =>
            router.push("/dashboard")
          }


          className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-gradient-to-r
          from-cyan-400
          to-orange-500
          px-3
          py-1.5
          text-xs
          font-semibold
          text-black
          hover:scale-105
          transition
          "

        >

          <LogOut size={15}/>

          Exit Workspace


        </button>








        {/* CONNECTION STATUS */}


        <div
          className="
          flex
          items-center
          gap-2
          bg-[#14233f]
          px-3
          py-1
          rounded-full
          text-xs
          "
        >

          <span
            className="
            w-2
            h-2
            rounded-full
            bg-green-400
            "
          />

          Connected


        </div>








        {/* USER AVATAR */}


        <div
          className="
          w-8
          h-8
          rounded-full
          bg-slate-700
          "
        />



      </div>



    </header>


  );


}