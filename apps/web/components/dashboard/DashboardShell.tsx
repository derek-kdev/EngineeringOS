"use client";

import { useState } from "react";

import DashboardTopbar from "./DashboardTopbar";
import DashboardFooter from "./DashboardFooter";
import UserPanel from "./panels/UserPanel";


type UserPanelType =
  | "profile"
  | "preferences"
  | "security"
  | "workspace"
  | null;



export default function DashboardShell({

  children,

}: {

  children: React.ReactNode;

}) {


  const [
    activePanel,
    setActivePanel
  ] = useState<UserPanelType>(null);



  return (

    <div

      className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      "

    >



      {/* BACKGROUND */}

      <div

        className="
          absolute
          inset-0
          bg-[url('/img/jjjjk.jpg')]
          bg-cover
          bg-center
          blur-[2px]
          scale-105
        "

      />





      {/* DARK OVERLAY */}

      <div

        className="
          absolute
          inset-0
          bg-black/40
        "

      />







      <div

        className="
          relative
          z-10
          min-h-screen
        "

      >




        {/* VS CODE STYLE TOP NAVIGATION */}

        <DashboardTopbar

          onOpenPanel={
            setActivePanel
          }

        />







        {/* USER OVERLAY PANEL */}

        {
          activePanel && (

            <UserPanel

              panel={activePanel}

              onClose={() =>
                setActivePanel(null)
              }

            />

          )
        }








        {/* FULL WIDTH WORKSPACE */}

        <main

          className="
            min-h-screen
            w-full
            px-6
            pt-12
            pb-20
          "

        >

          {children}

        </main>








        <DashboardFooter />



      </div>



    </div>

  );

}