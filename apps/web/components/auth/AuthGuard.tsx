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

}: {

  children: React.ReactNode;

}) {


  const router =
    useRouter();



  const user =
    useAuthStore(
      (state) => state.user
    );


  const accessToken =
    useAuthStore(
      (state) => state.accessToken
    );


  const hydrated =
    useAuthStore(
      (state) => state.hydrated
    );


  const setUser =
    useAuthStore(
      (state) => state.setUser
    );


  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth
    );


  const setLoading =
    useAuthStore(
      (state) => state.setLoading
    );



  const setHydrated =
    useAuthStore(
      (state) => state.setHydrated
    );



  const [checking,setChecking] =
    useState(true);







  /*
  |--------------------------------------------------------------------------
  | Ensure Zustand hydration
  |--------------------------------------------------------------------------
  */


  useEffect(()=>{


    if(
      typeof window !== "undefined"
    ){

      setHydrated(true);

    }


  },[setHydrated]);








  /*
  |--------------------------------------------------------------------------
  | Validate Authentication
  |--------------------------------------------------------------------------
  */


  useEffect(()=>{


    async function validateSession(){


      if(!hydrated){

        return;

      }





      /*
      |--------------------------------------------------------------------------
      | No access token
      |--------------------------------------------------------------------------
      */


      if(!accessToken){


        clearAuth();


        router.replace(
          "/signin"
        );


        return;


      }







      try{


        setLoading(true);



        const currentUser =
          await authService.getMe();




        setUser(
          currentUser
        );



      }

      catch(error){


        console.error(
          "Authentication validation failed:",
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




    validateSession();



  },[

    hydrated,

    accessToken,

    router,

    clearAuth,

    setUser,

    setLoading,

  ]);









  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */


  if(
    !hydrated ||
    checking
  ){


    return (

      <div

        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#050816]
          text-white
        "

      >

        <div className="text-center">


          <h2
            className="
              mb-4
              text-2xl
              font-semibold
            "
          >

            EngineeringOS

          </h2>



          <p
            className="
              text-white/60
            "
          >

            Loading workspace...

          </p>



        </div>


      </div>

    );


  }





  return (

    <>

      {children}

    </>

  );


}