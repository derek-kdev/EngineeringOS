"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";

import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";


export default function RegisterPage() {

  const router = useRouter();

  const { login } = useAuth();


  const [form, setForm] = useState({

    firstName: "",

    lastName: "",

    email: "",

    password: "",

    confirmPassword: "",

  });



  const [showPassword, setShowPassword] =
    useState(false);


  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);



  const [loading, setLoading] =
    useState(false);



  const [error, setError] =
    useState("");




  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }





  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    setError("");



    if (
      form.password !== form.confirmPassword
    ) {

      setError(
        "Passwords do not match"
      );

      return;

    }



    setLoading(true);



    try {


      const response = await api.post(
        "/auth/register",
        {

          firstName: form.firstName,

          lastName: form.lastName,

          email: form.email,

          password: form.password,

        }
      );



      const {
        user,
        tokens,
      } = response.data;




      login(

        user,

        tokens.accessToken,

        tokens.refreshToken

      );



      router.push(
        "/verify-email"
      );



    } catch (err: any) {


      console.error(err);



      setError(

        err?.response?.data?.message ||
        "Registration failed. Please try again."

      );



    } finally {


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
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
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





        <div className="mb-8">


          <h1
            className="
              text-3xl
              font-bold
            "
          >

            Create Account

          </h1>



          <p
            className="
              mt-2
              text-white/60
            "
          >

            Join EngineeringOS and build your engineering workspace.

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

              {
                Array.isArray(error)
                ?
                error.join(", ")
                :
                error
              }

            </div>

          )
        }







        <form

          onSubmit={handleSubmit}

          className="
            space-y-5
          "

        >






          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            "
          >



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

            placeholder="Email address"

            type="email"

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
              transition
              hover:opacity-90
              disabled:opacity-50
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







        <p

          className="
            mt-6
            text-center
            text-sm
            text-white/60
          "

        >

          Already have an account?


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







function InputField({

  icon,

  name,

  placeholder,

  value,

  onChange,

  type="text",

}: {

  icon: React.ReactNode;

  name:string;

  placeholder:string;

  value:string;

  onChange:
    (e:React.ChangeEvent<HTMLInputElement>)=>void;

  type?:string;

}) {


  return (

    <div className="relative">


      <div

        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-[#00D2FF]
        "

      >

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
          outline-none
          focus:border-[#00D2FF]
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

}: {

  name:string;

  placeholder:string;

  value:string;

  visible:boolean;

  setVisible:(value:boolean)=>void;

  onChange:
    (e:React.ChangeEvent<HTMLInputElement>)=>void;

}) {


  return (

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
          visible
          ?
          "text"
          :
          "password"
        }

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
          outline-none
          focus:border-[#FF6B00]
        "

      />




      <button

        type="button"

        onClick={() =>
          setVisible(!visible)
        }

        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-white/60
          hover:text-white
        "

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