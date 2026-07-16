"use client";


import {
  useState,
} from "react";


import Link from "next/link";


import {
  useSearchParams,
  useRouter,
} from "next/navigation";


import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
} from "lucide-react";


import {
  resetPassword,
} from "@/lib/api/auth";





export default function ResetPasswordPage(){


  const router =
  useRouter();



  const searchParams =
  useSearchParams();



  const token =
  searchParams.get("token");





  const [
    password,
    setPassword,
  ] =
  useState("");



  const [
    confirmPassword,
    setConfirmPassword,
  ] =
  useState("");





  const [
    showPassword,
    setShowPassword,
  ] =
  useState(false);



  const [
    showConfirmPassword,
    setShowConfirmPassword,
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



  const [
    success,
    setSuccess,
  ] =
  useState("");








  function validatePassword(){

    if(password.length < 12){

      return "Password must be at least 12 characters.";

    }



    if(
      !/[A-Z]/.test(password)
    ){

      return "Password must contain an uppercase letter.";

    }



    if(
      !/[a-z]/.test(password)
    ){

      return "Password must contain a lowercase letter.";

    }



    if(
      !/\d/.test(password)
    ){

      return "Password must contain a number.";

    }



    if(
      !/[@$!%*?&^#()[\]{}\-_=+|;:'",.<>/~`\\]/.test(password)
    ){

      return "Password must contain a special character.";

    }



    return "";

  }








  async function handleSubmit(
    event:React.FormEvent<HTMLFormElement>
  ){


    event.preventDefault();



    setError("");

    setSuccess("");





    if(!token){


      setError(
        "Invalid password reset link."
      );


      return;

    }






    const validation =
    validatePassword();




    if(validation){


      setError(validation);


      return;

    }






    if(password !== confirmPassword){


      setError(
        "Passwords do not match."
      );


      return;

    }






    setLoading(true);





    try{


      await resetPassword(

        token,

        password

      );






      setSuccess(
        "Password reset successfully. Redirecting to sign in..."
      );





      setTimeout(()=>{


        router.replace(
          "/signin"
        );


      },2500);






    }
    catch(error:any){



      console.error(
        "Reset password error:",
        error
      );




      setError(

        error?.response?.data?.message ||

        "Unable to reset password."

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
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          shadow-2xl
          p-8
        "

      >






        <Link

          href="/signin"

          className="
            flex
            items-center
            gap-2
            text-sm
            text-white/60
            hover:text-[#00D2FF]
          "

        >

          <ArrowLeft size={16}/>

          Back to Sign In

        </Link>








        <div className="mt-8 mb-6">


          <div

            className="
              h-14
              w-14
              rounded-2xl
              bg-[#FF6B00]/20
              flex
              items-center
              justify-center
              mb-5
            "

          >

            <Lock

              size={26}

              className="
                text-[#FF6B00]
              "

            />


          </div>





          <h1

            className="
              text-3xl
              font-bold
            "

          >

            Reset Password

          </h1>





          <p

            className="
              mt-2
              text-sm
              text-white/50
            "

          >

            Create a new secure password for your EngineeringOS account.

          </p>


        </div>








        {
          error && (

            <div

              className="
                mb-5
                rounded-xl
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







        {
          success && (

            <div

              className="
                mb-5
                rounded-xl
                border
                border-green-500/30
                bg-green-500/10
                px-4
                py-3
                text-sm
                text-green-300
                flex
                items-center
                gap-2
              "

            >

              <CheckCircle size={16}/>

              {success}

            </div>

          )
        }









        <form

          onSubmit={handleSubmit}

          className="
            space-y-5
          "

        >







          <PasswordInput

            label="New Password"

            value={password}

            show={showPassword}

            setShow={setShowPassword}

            onChange={setPassword}

          />







          <PasswordInput

            label="Confirm Password"

            value={confirmPassword}

            show={showConfirmPassword}

            setShow={setShowConfirmPassword}

            onChange={setConfirmPassword}

          />









          <button

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
              "Resetting..."
              :
              "Reset Password"
            }


          </button>





        </form>



      </div>



    </main>

  );


}








function PasswordInput({

label,

value,

show,

setShow,

onChange,

}:{

label:string;

value:string;

show:boolean;

setShow:(value:boolean)=>void;

onChange:(value:string)=>void;

}){


return (

<div>


<label

className="
block
mb-2
text-sm
text-white/70
"

>

{label}

</label>




<div className="relative">



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
show
?
"text"
:
"password"
}

value={value}

onChange={(e)=>
onChange(e.target.value)
}

required

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

onClick={()=>
setShow(!show)
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
show
?
<EyeOffIcon/>
:
<Eye size={18}/>
}

</button>




</div>


</div>

);


}




function EyeOffIcon(){

return (

<EyeOff size={18}/>

);

}