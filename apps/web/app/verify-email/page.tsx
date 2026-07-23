"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";


import {
  authService,
} from "@/services/auth.service";



export default function VerifyEmailPage(){


  const router =
    useRouter();



  const searchParams =
    useSearchParams();



  const [
    message,
    setMessage
  ] =
  useState(
    "Verifying your email..."
  );




  useEffect(()=>{


    async function verify(){


      const token =
        searchParams.get("token");



      if(!token){


        setMessage(
          "Invalid verification link."
        );


        return;


      }





      try{


        await authService.verifyEmail({

          token,

        });




        setMessage(
          "Email verified successfully. Redirecting..."
        );




        setTimeout(()=>{


          router.replace(
            "/signin"
          );


        },2000);




      }
      catch(error){


        console.error(
          "Verification failed:",
          error
        );



        setMessage(
          "Verification link is invalid or expired."
        );


      }


    }




    verify();



  },[router,searchParams]);







  return (

    <main

      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#0B132B]
        px-6
        text-white
      "

    >


      <div

        className="
          max-w-md
          w-full
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-10
          text-center
        "

      >


        <h1

          className="
            text-3xl
            font-bold
          "

        >

          EngineeringOS

        </h1>



        <p

          className="
            mt-5
            text-white/70
          "

        >

          {message}

        </p>


      </div>


    </main>

  );

}