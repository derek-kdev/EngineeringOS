"use client";


import { usePathname } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";

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
  |
  | The prototype workspace uses the full viewport and does not render
  | the standard dashboard shell.
  |
  |--------------------------------------------------------------------------
  */


  const isPrototypeRoute =
    pathname.startsWith(
      "/dashboard/prototype"
    );




  return (

    <AuthGuard>


      {isPrototypeRoute ? (


        <>

          {children}

        </>


      ) : (


        <DashboardShell>

          {children}

        </DashboardShell>


      )}


    </AuthGuard>

  );


}