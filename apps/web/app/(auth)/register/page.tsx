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
  User,
} from "lucide-react";


import {
  authService,
} from "@/services/auth.service";




export default function RegisterPage(){


  const router =
    useRouter();



  const [
    form,
    setForm
  ] =
  useState({

    firstName:"",

    lastName:"",

    email:"",

    password:"",

    confirmPassword:"",

  });




  const [
    showPassword,
    setShowPassword
  ] =
  useState(false);



  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] =
  useState(false);



  const [
    loading,
    setLoading
  ] =
  useState(false);



  const [
    error,
    setError
  ] =
  useState("");







  function handleChange(
    e:React.ChangeEvent<HTMLInputElement>
  ){


    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });


  }









  async function handleSubmit(
    e:React.FormEvent<HTMLFormElement>
  ){


    e.preventDefault();


    setError("");




    if(
      form.password !== form.confirmPassword
    ){

      setError(
        "Passwords do not match"
      );

      return;

    }






    setLoading(true);



    try{


      await authService.register({

        firstName:
          form.firstName,


        lastName:
          form.lastName,


        email:
          form.email,


        password:
          form.password,


        sendVerificationEmail:true,


      });







      router.push(
        `/verify-email/sent?email=${encodeURIComponent(form.email)}`
      );



    }


    catch(error:any){


      console.error(
        "Registration error:",
        error
      );



      setError(

        error?.response?.data?.message ||

        "Registration failed. Please try again."

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
      py-10
      text-white
      "

    >


      <div

        className="
        w-full
        max-w-lg
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-8
        "

      >



        <Link

          href="/"

          className="
          flex
          gap-2
          items-center
          text-white/60
          mb-8
          "

        >

          <ArrowLeft size={16}/>

          Back

        </Link>





        <h1 className="text-3xl font-bold">

          Create Account

        </h1>



        <p className="mt-2 mb-8 text-white/60">

          Join EngineeringOS and build your engineering workspace.

        </p>






        {
          error &&

          <div

            className="
            mb-5
            rounded-xl
            bg-red-500/10
            border
            border-red-500/30
            px-4
            py-3
            text-red-300
            "

          >

            {
              Array.isArray(error)
              ?
              error.join(", ")
              :
              error
            }

          </div>

        }









        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >




          <div className="grid sm:grid-cols-2 gap-4">


            <InputField

              icon={<User size={18}/>}

              name="firstName"

              placeholder="First name"

              value={form.firstName}

              onChange={handleChange}

            />



            <InputField

              icon={<User size={18}/>}

              name="lastName"

              placeholder="Last name"

              value={form.lastName}

              onChange={handleChange}

            />


          </div>






          <InputField

            icon={<Mail size={18}/>}

            name="email"

            type="email"

            placeholder="Email address"

            value={form.email}

            onChange={handleChange}

          />






          <PasswordField

            name="password"

            placeholder="Password"

            value={form.password}

            visible={showPassword}

            setVisible={setShowPassword}

            onChange={handleChange}

          />







          <PasswordField

            name="confirmPassword"

            placeholder="Confirm password"

            value={form.confirmPassword}

            visible={showConfirmPassword}

            setVisible={setShowConfirmPassword}

            onChange={handleChange}

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
            "

          >

            {
              loading
              ?
              "Creating account..."
              :
              "Create Account"
            }


          </button>




        </form>






        <p className="mt-6 text-center text-white/60">


          Already have an account?


          <Link

            href="/signin"

            className="ml-2 text-[#00D2FF]"

          >

            Sign in

          </Link>


        </p>



      </div>


    </main>

  );

}








function InputField({
  icon,
  name,
  placeholder,
  value,
  onChange,
  type="text",
}:any){


return (

<div className="relative">


<div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00D2FF]">

{icon}

</div>



<input

type={type}

name={name}

placeholder={placeholder}

value={value}

onChange={onChange}

required

className="
w-full
rounded-xl
border
border-white/10
bg-black/20
py-3
pl-10
pr-4
"

/>


</div>

);


}








function PasswordField({
name,
placeholder,
value,
visible,
setVisible,
onChange,
}:any){


return (

<div className="relative">


<Lock

size={18}

className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF6B00]"

/>




<input

type={visible ? "text":"password"}

name={name}

placeholder={placeholder}

value={value}

onChange={onChange}

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
"

/>




<button

type="button"

onClick={()=>setVisible(!visible)}

className="absolute right-3 top-1/2 -translate-y-1/2"

>

{
visible
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}

</button>



</div>

);


}