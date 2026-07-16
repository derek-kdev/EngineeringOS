"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  Send,
} from "lucide-react";

import {
  forgotPassword,
} from "@/lib/api/auth";



export default function ForgotPasswordPage() {


  const [email, setEmail] =
    useState("");



  const [loading, setLoading] =
    useState(false);



  const [error, setError] =
    useState("");



  const [success, setSuccess] =
    useState("");





  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    setError("");

    setSuccess("");

    setLoading(true);



    try {


      await forgotPassword(email);



      setSuccess(
        "If an account exists with this email, a password reset link has been sent."
      );



      setEmail("");



    } catch(error:any) {


      console.error(
        "Forgot password error:",
        error
      );


      setError(

        error?.response?.data?.message ||

        "Unable to process password reset request."

      );


    }
    finally {


      setLoading(false);


    }


  }






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
          bg-white/[0.04]
          backdrop-blur-xl
          shadow-2xl
          p-8
        "
      >



        {/* BACK */}

        <Link

          href="/signin"

          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-white/50
            hover:text-[#00D2FF]
            transition
          "

        >

          <ArrowLeft size={16}/>

          Back to Sign In

        </Link>






        {/* HEADER */}

        <div
          className="
            mt-8
            mb-6
          "
        >


          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-[#00D2FF]/20
              flex
              items-center
              justify-center
              mb-5
            "
          >

            <Mail
              className="text-[#00D2FF]"
              size={26}
            />

          </div>




          <h1
            className="
              text-3xl
              font-bold
            "
          >

            Forgot Password

          </h1>



          <p
            className="
              mt-2
              text-sm
              text-white/50
            "
          >

            Enter your email address and we will send
            you a password reset link.

          </p>


        </div>






        {/* MESSAGES */}

        {
          error && (

            <div
              className="
                mb-4
                rounded-xl
                border
                border-red-400/20
                bg-red-400/10
                px-4
                py-3
                text-sm
                text-red-300
              "
            >

              {error}

            </div>

          )
        }





        {
          success && (

            <div
              className="
                mb-4
                rounded-xl
                border
                border-green-400/20
                bg-green-400/10
                px-4
                py-3
                text-sm
                text-green-300
              "
            >

              {success}

            </div>

          )
        }








        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            space-y-5
          "
        >



          <div>


            <label
              className="
                text-xs
                text-white/40
                block
                mb-2
              "
            >

              Email Address

            </label>




            <div
              className="
                relative
              "
            >


              <Mail

                size={18}

                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#00D2FF]
                "

              />



              <input

                type="email"

                required

                value={email}

                onChange={(event)=>
                  setEmail(event.target.value)
                }

                placeholder="engineer@example.com"

                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  text-white
                  placeholder:text-white/30
                  outline-none
                  focus:border-[#00D2FF]/50
                "

              />


            </div>


          </div>







          <button

            type="submit"

            disabled={loading}

            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#00D2FF]
              to-[#0284C7]
              py-3
              text-sm
              font-semibold
              text-black
              transition
              disabled:opacity-50
            "

          >


            <Send size={17}/>


            {
              loading
              ?
              "Sending..."
              :
              "Send Reset Link"
            }


          </button>



        </form>




      </div>


    </main>

  );

}