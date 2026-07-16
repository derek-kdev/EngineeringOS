"use client";

import { useState } from "react";


import DashboardSidebar from "./DashboardSidebar";
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



  const [expanded, setExpanded] =
    useState(false);



  const [activePanel, setActivePanel] =
    useState<UserPanelType>(null);





  return (

    <div

      className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      "

    >



      {/* BACKGROUND IMAGE */}

      <div

        className="
          absolute
          inset-0
          bg-[url('/img/thebackgd.jpg')]
          bg-cover
          bg-center
          bg-no-repeat
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






      {/* DASHBOARD APPLICATION */}

      <div

        className="
          relative
          z-10
          min-h-screen
        "

      >





        {/* SIDEBAR */}

        <DashboardSidebar

          expanded={expanded}

          setExpanded={setExpanded}

        />







        {/* TOPBAR */}

        <DashboardTopbar

          expanded={expanded}

          onOpenPanel={
            setActivePanel
          }

        />








        {/* USER PANEL OVERLAY */}

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









        {/* PAGE CONTENT */}

        <main

          className={`
            
            min-h-screen
            
            pt-28
            
            pb-28
            
            px-6


            transition-all

            duration-300


            ${
              expanded

              ? "ml-[270px]"

              : "ml-[78px]"
            }


          `}

        >

          {children}


        </main>








        {/* FOOTER */}

        <DashboardFooter />



      </div>



    </div>

  );

}