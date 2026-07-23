"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";


import {
  useAuthStore,
} from "@/stores/auth.store";


import {
  authService,
} from "@/services/auth.service";




export default function AuthGuard({

  children,

}:{

  children:React.ReactNode;

}){


  const router =
    useRouter();



  const user =
    useAuthStore(
      state=>state.user
    );



  const accessToken =
    useAuthStore(
      state=>state.accessToken
    );



  const hydrated =
    useAuthStore(
      state=>state.hydrated
    );



  const setUser =
    useAuthStore(
      state=>state.setUser
    );



  const clearAuth =
    useAuthStore(
      state=>state.clearAuth
    );



  const setLoading =
    useAuthStore(
      state=>state.setLoading
    );



  const [checking,setChecking] =
    useState(true);








  useEffect(()=>{


    async function validate(){



      if(!hydrated){

        return;

      }






      if(!accessToken){


        clearAuth();


        router.replace(
          "/signin"
        );


        return;

      }







      try{


        setLoading(true);




        const profile =
          await authService.getMe();





        setUser(
          profile
        );




      }

      catch(error){



        console.error(

          "Session expired:",

          error

        );



        clearAuth();



        router.replace(
          "/signin"
        );



      }

      finally{


        setLoading(false);


        setChecking(false);


      }



    }



    validate();



  },[

    hydrated,

    accessToken,

    router,

    clearAuth,

    setUser,

    setLoading,

  ]);









  if(
    !hydrated ||
    checking
  ){


    return (

      <main

        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#050816]
          text-white
        "

      >

        <div className="text-center">


          <h1
            className="
              text-2xl
              font-bold
            "
          >

            EngineeringOS

          </h1>


          <p
            className="
              mt-3
              text-white/60
            "
          >

            Loading workspace...

          </p>


        </div>


      </main>

    );


  }







  return children;


}