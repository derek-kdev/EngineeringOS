"use client";

import { useAuth } from "@/hooks/useAuth";


export default function DashboardPage() {


  const {
    user,
  } = useAuth();




  if (!user) {

    return null;

  }





  return (

    <main

      className="
        min-h-screen
        bg-[#0B132B]
        text-white
        p-10
      "

    >

      <h1

        className="
          text-4xl
          font-bold
        "

      >

        Welcome, {user.firstName}

      </h1>



      <p

        className="
          mt-2
          text-white/70
        "

      >

        {user.email}

      </p>





      <div

        className="
          mt-8
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-6
        "

      >

        <h2

          className="
            text-xl
            font-semibold
          "

        >

          Dashboard

        </h2>



        <p

          className="
            mt-2
            text-white/60
          "

        >

          Authentication is working successfully.

        </p>


      </div>


    </main>

  );

}