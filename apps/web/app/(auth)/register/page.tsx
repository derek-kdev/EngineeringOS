"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
} from "lucide-react";

import api from "@/lib/api";


export default function RegisterPage() {

  const router = useRouter();


  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });


  const [showPassword, setShowPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const [success, setSuccess] =
    useState("");



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);



    try {


      const response = await api.post(
        "/auth/register",
        {
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          password: form.password,
        }
      );



      const {
        accessToken,
        refreshToken,
      } = response.data.tokens;



      localStorage.setItem(
        "accessToken",
        accessToken
      );


      localStorage.setItem(
        "refreshToken",
        refreshToken
      );



      setSuccess(
        "Account created successfully. Redirecting..."
      );


      setTimeout(() => {

        router.push("/verify-email");

      }, 1000);



    } catch (err: any) {


      const message =
        err.response?.data?.message;


      if (Array.isArray(message)) {

        setError(message[0]);

      } else if (message) {

        setError(message);

      } else {

        setError(
          "Registration failed. Please try again."
        );

      }


    } finally {

      setLoading(false);

    }

  };



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
      relative
      overflow-hidden
      "
    >


      {/* Background Glow */}

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.12),transparent_55%)]
        "
      />



      {/* Back Button */}

      <Link
        href="/"
        className="
        absolute
        top-8
        left-8
        flex
        items-center
        gap-2
        text-white/70
        hover:text-white
        transition
        "
      >

        <ArrowLeft size={20}/>

        Back

      </Link>





      <section
        className="
        relative
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-8
        shadow-[0_0_50px_rgba(0,210,255,0.12)]
        "
      >



        <div
          className="
          text-center
          mb-8
          "
        >

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
            text-sm
            "
          >

            Join EngineeringOS and build the future of engineering.

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
              border-cyan-500/30
              bg-cyan-500/10
              px-4
              py-3
              text-sm
              text-cyan-300
              "
            >

              {success}

            </div>

          )
        }






        <form
          onSubmit={handleSubmit}
          className="
          space-y-4
          "
        >



          <input
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            bg-black/20
            border
            border-white/10
            px-4
            py-3
            outline-none
            focus:border-[#00D2FF]
            "
          />



          <input
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
            className="
            w-full
            rounded-xl
            bg-black/20
            border
            border-white/10
            px-4
            py-3
            outline-none
            focus:border-[#00D2FF]
            "
          />





          <div
            className="
            relative
            "
          >

            <Mail
              size={18}
              className="
              absolute
              left-4
              top-3.5
              text-white/40
              "
            />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="
              w-full
              rounded-xl
              bg-black/20
              border
              border-white/10
              pl-11
              pr-4
              py-3
              outline-none
              focus:border-[#00D2FF]
              "
            />

          </div>






          <div
            className="
            relative
            "
          >

            <input
              name="password"
              type={
                showPassword
                ? "text"
                : "password"
              }
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="
              w-full
              rounded-xl
              bg-black/20
              border
              border-white/10
              px-4
              py-3
              pr-12
              outline-none
              focus:border-[#00D2FF]
              "
            />



            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
              absolute
              right-4
              top-3
              text-white/50
              hover:text-white
              "
            >

              {
                showPassword
                ?
                <EyeOff size={20}/>
                :
                <Eye size={20}/>
              }

            </button>


          </div>





          <p
            className="
            text-xs
            text-white/50
            "
          >

            Password must contain uppercase, lowercase,
            number, special character and be at least 12 characters.

          </p>






          <button
            disabled={loading}
            className="
            w-full
            rounded-xl
            py-3
            font-semibold
            bg-gradient-to-r
            from-[#FF6B00]
            to-[#FFB000]
            hover:scale-[1.02]
            transition
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
          text-center
          text-sm
          text-white/60
          mt-6
          "
        >

          Already have an account?

          {" "}

          <Link
            href="/signin"
            className="
            text-[#00D2FF]
            hover:underline
            "
          >

            Sign in

          </Link>

        </p>



      </section>


    </main>

  );

}