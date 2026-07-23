"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  authService,
} from "@/services/auth.service";



export default function VerifyEmailPage() {


  const router = useRouter();

  const searchParams = useSearchParams();



  const [message, setMessage] =
    useState(
      "Verifying your email..."
    );


  const [processing, setProcessing] =
    useState(false);





  useEffect(() => {


    async function verifyEmail() {


      if (processing) {

        return;

      }




      const token =
        searchParams.get("token");





      if (!token) {


        setMessage(
          "Invalid verification link."
        );


        return;


      }




      setProcessing(true);





      try {


        await authService.verifyEmail({

          token,

        });





        setMessage(

          "Email verified successfully. Redirecting to sign in..."

        );





        setTimeout(() => {


          router.replace(
            "/signin"
          );


        }, 2000);






      } catch (error) {


        console.error(

          "Email verification failed:",

          error

        );




        setMessage(

          "Verification link is invalid or expired."

        );



      }


    }





    verifyEmail();




  }, [

    searchParams,

    router,

    processing,

  ]);







  return (

    <main

      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#0B132B]
        text-white
        px-6
      "

    >



      <div

        className="
          rounded-3xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          p-10
          text-center
          max-w-md
          w-full
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