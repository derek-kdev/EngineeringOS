"use client";


import { usePathname } from "next/navigation";

import DashboardShell from "@/components/dashboard/DashboardShell";


export default function DashboardLayout({

  children,

}:{

  children: React.ReactNode;

}) {


  const pathname = usePathname();



  /*
  |--------------------------------------------------------------------------
  | Prototype Engine Fullscreen Mode
  |--------------------------------------------------------------------------
  */

  if (
    pathname.startsWith("/dashboard/prototype")
  ) {

    return (

      <>

        {children}

      </>

    );

  }



  /*
  |--------------------------------------------------------------------------
  | Normal Dashboard Mode
  |--------------------------------------------------------------------------
  */


  return (

    <DashboardShell>

      {children}

    </DashboardShell>

  );


}