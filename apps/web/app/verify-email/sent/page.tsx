"use client";


import {
  useSearchParams,
} from "next/navigation";

import Link from "next/link";

import {
  Mail,
  ArrowLeft,
} from "lucide-react";




export default function VerifyEmailSentPage(){


  const searchParams =
    useSearchParams();


  const email =
    searchParams.get("email");





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
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-10
          text-center
        "

      >





        <div

          className="
            flex
            justify-center
            mb-6
          "

        >


          <div

            className="
              rounded-full
              bg-[#00D2FF]/10
              p-5
            "

          >


            <Mail

              size={40}

              className="
                text-[#00D2FF]
              "

            />


          </div>


        </div>







        <h1

          className="
            text-3xl
            font-bold
          "

        >

          Check your email

        </h1>







        <p

          className="
            mt-4
            text-white/70
            leading-relaxed
          "

        >

          We have sent a verification link to:

        </p>





        {
          email && (

            <p

              className="
                mt-3
                font-semibold
                text-[#00D2FF]
                break-all
              "

            >

              {email}

            </p>

          )
        }







        <p

          className="
            mt-5
            text-sm
            text-white/60
          "

        >

          Open the email and click the verification link
          to activate your EngineeringOS account.

        </p>







        <Link

          href="/verify-email"

          className="
            mt-8
            inline-flex
            items-center
            justify-center
            gap-2
            w-full
            rounded-xl
            bg-gradient-to-r
            from-[#FF6B00]
            to-[#FF9D00]
            py-3
            font-semibold
            text-black
          "

        >


          <ArrowLeft size={18}/>

          Verify another email


        </Link>







        <p

          className="
            mt-6
            text-sm
            text-white/50
          "

        >

          Already verified?

          <Link

            href="/signin"

            className="
              ml-2
              text-[#00D2FF]
              hover:underline
            "

          >

            Sign in

          </Link>


        </p>





      </div>


    </main>


  );


}