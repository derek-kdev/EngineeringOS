"use client";


import {
  useState,
} from "react";


import Link from "next/link";


import {
  useRouter,
} from "next/navigation";


import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";


import api from "@/lib/api";


import {
  useAuth,
} from "@/hooks/useAuth";





export default function SignInPage(){


  const router =
  useRouter();



  const {
    login,
  } =
  useAuth();





  const [
    email,
    setEmail,
  ] =
  useState("");



  const [
    password,
    setPassword,
  ] =
  useState("");



  const [
    showPassword,
    setShowPassword,
  ] =
  useState(false);



  const [
    loading,
    setLoading,
  ] =
  useState(false);



  const [
    error,
    setError,
  ] =
  useState("");








  async function handleSubmit(
    e:React.FormEvent<HTMLFormElement>
  ){


    e.preventDefault();



    setError("");

    setLoading(true);




    try{


      const response =
      await api.post(

        "/auth/login",

        {

          email,

          password,

        }

      );






      const user =
      response.data.user;



      const accessToken =
      response.data.tokens.accessToken;



      const refreshToken =
      response.data.tokens.refreshToken;







      if(
        !user ||
        !accessToken ||
        !refreshToken
      ){

        throw new Error(
          "Invalid login response"
        );

      }







      login(

        user,

        accessToken,

        refreshToken,

      );






      router.replace(
        "/dashboard"
      );




    }

    catch(error:any){



      console.error(
        "Login error:",
        error
      );




      setError(

        error?.response?.data?.message ||

        "Invalid email or password"

      );



    }



    finally{


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
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-8
          shadow-xl
        "

      >





        <Link

          href="/"

          className="
            flex
            items-center
            gap-2
            text-sm
            text-white/60
            hover:text-white
            mb-8
          "

        >

          <ArrowLeft size={16}/>

          Back

        </Link>








        <h1

          className="
            text-3xl
            font-bold
          "

        >

          Welcome Back

        </h1>





        <p

          className="
            mt-2
            mb-8
            text-white/60
          "

        >

          Sign in to your EngineeringOS workspace.

        </p>










        {
          error && (

            <div

              className="
                mb-5
                rounded-lg
                border
                border-red-500/30
                bg-red-500/10
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









        <form

          onSubmit={handleSubmit}

          className="
            space-y-5
          "

        >







          <div>


            <label

              className="
                block
                mb-2
                text-sm
                text-white/70
              "

            >

              Email

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


                value={email}


                onChange={
                  (e)=>
                  setEmail(e.target.value)
                }


                required


                placeholder="you@example.com"



                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  py-3
                  pl-10
                  pr-4
                  outline-none
                  focus:border-[#00D2FF]
                "


              />



            </div>


          </div>









          <div>


            <div

              className="
                flex
                items-center
                justify-between
                mb-2
              "

            >


              <label

                className="
                  text-sm
                  text-white/70
                "

              >

                Password

              </label>





              <Link

                href="/forgot-password"

                className="
                  text-xs
                  text-[#00D2FF]
                  hover:underline
                "

              >

                Forgot password?

              </Link>



            </div>







            <div

              className="
                relative
              "

            >





              <Lock

                size={18}

                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#FF6B00]
                "

              />







              <input


                type={
                  showPassword
                  ?
                  "text"
                  :
                  "password"
                }



                value={password}



                onChange={
                  (e)=>
                  setPassword(e.target.value)
                }



                required



                placeholder="Enter your password"




                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  py-3
                  pl-10
                  pr-12
                  outline-none
                  focus:border-[#FF6B00]
                "



              />









              <button

                type="button"

                onClick={
                  ()=>setShowPassword(
                    !showPassword
                  )
                }


                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-white/60
                "

              >



                {
                  showPassword
                  ?
                  <EyeOff size={18}/>
                  :
                  <Eye size={18}/>
                }



              </button>




            </div>


          </div>









          <button


            type="submit"


            disabled={loading}



            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-[#00D2FF]
              to-[#FF6B00]
              py-3
              font-semibold
              text-black
              disabled:opacity-50
            "


          >



            {
              loading
              ?
              "Signing in..."
              :
              "Sign In"
            }




          </button>





        </form>









        <p

          className="
            mt-6
            text-center
            text-sm
            text-white/60
          "

        >

          Don't have an account?


          <Link

            href="/register"

            className="
              ml-2
              text-[#00D2FF]
              hover:underline
            "

          >

            Create one

          </Link>


        </p>





      </div>



    </main>

  );


}