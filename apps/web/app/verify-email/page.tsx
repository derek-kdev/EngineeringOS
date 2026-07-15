"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import api from "@/lib/api";


export default function VerifyEmailPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setError("");
    setMessage("");

    try {

      setLoading(true);


      await api.post(
        "/auth/verify-email",
        {
          email,
        }
      );


      setMessage(
        "Verification email sent. Please check your inbox."
      );


    } catch (err:any) {

      setError(
        err.response?.data?.message ||
        "Unable to send verification email."
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
        p-8
        "
      >


        <Link
          href="/signin"
          className="
          flex
          items-center
          gap-2
          text-white/70
          hover:text-white
          mb-8
          "
        >

          <ArrowLeft size={18}/>
          Back

        </Link>



        <div
          className="
          flex
          justify-center
          mb-5
          "
        >

          <div
            className="
            rounded-full
            bg-[#00D2FF]/10
            p-4
            "
          >

            <Mail
              size={35}
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
          text-center
          "
        >
          Verify your email
        </h1>


        <p
          className="
          text-center
          text-white/60
          mt-3
          "
        >
          Enter your email and we will resend your verification link.
        </p>



        <form
          onSubmit={handleSubmit}
          className="
          mt-8
          space-y-5
          "
        >


          <input
            type="email"
            required
            value={email}
            onChange={
              e=>setEmail(e.target.value)
            }
            placeholder="Email address"
            className="
            w-full
            rounded-xl
            bg-black/30
            border
            border-white/10
            px-4
            py-3
            outline-none
            focus:border-[#00D2FF]
            "
          />



          {
            error &&
            <div
              className="
              rounded-xl
              bg-red-500/10
              border
              border-red-500/30
              p-3
              text-sm
              text-red-300
              "
            >
              {error}
            </div>
          }



          {
            message &&
            <div
              className="
              rounded-xl
              bg-green-500/10
              border
              border-green-500/30
              p-3
              text-sm
              text-green-300
              "
            >
              {message}
            </div>
          }



          <button
            disabled={loading}
            className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-[#FF6B00]
            to-[#FF9D00]
            py-3
            font-semibold
            hover:scale-[1.02]
            transition
            "
          >

            {
              loading
              ?
              "Sending..."
              :
              "Send verification email"
            }


          </button>


        </form>


      </div>


    </main>

  );

}