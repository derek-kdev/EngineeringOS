"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import DashboardTopbar from "./DashboardTopbar";
import DashboardFooter from "./DashboardFooter";
import UserPanel from "./panels/UserPanel";
import BackButton from "./ui/BackButton";


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


const pathname = usePathname();

// Every dashboard page gets a Back button except the dashboard home
// itself — there's nowhere more "back" than that to go to.
const showBackButton = pathname !== "/dashboard";



return (

<div

className="
        relative
        min-h-screen
        overflow-hidden
        text-white
      "

>





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

{showBackButton && <BackButton />}

{children}

</main>








<DashboardFooter />



</div>



</div>

  );

}
