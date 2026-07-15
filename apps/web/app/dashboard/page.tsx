"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";


export default function DashboardPage() {


  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    async function loadUser() {


      try {


        const response = await api.get("/auth/me");


        setUser(response.data);



      } catch (error) {


        console.error(
          "Failed to load user:",
          error
        );


      } finally {


        setLoading(false);


      }


    }



    loadUser();



  }, []);





  if (loading) {


    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-white/60
        "
      >

        Loading dashboard...

      </div>

    );

  }





  return (

    <div
      className="
        min-h-screen
        text-white
      "
    >



      <div
        className="
          max-w-5xl
          mx-auto
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-8
        "
      >



        <h1
          className="
            text-4xl
            font-bold
          "
        >

          Welcome to EngineeringOS

        </h1>



        <p
          className="
            mt-4
            text-white/60
          "
        >

          Your engineering workspace is ready.

        </p>




        <div
          className="
            mt-8
            grid
            gap-4
            text-sm
          "
        >



          <div
            className="
              rounded-xl
              bg-black/20
              p-4
            "
          >

            <p className="text-white/40">
              Email
            </p>


            <p className="mt-1">
              {user?.email}
            </p>


          </div>





          <div
            className="
              rounded-xl
              bg-black/20
              p-4
            "
          >

            <p className="text-white/40">
              Name
            </p>


            <p className="mt-1">
              {user?.firstName} {user?.lastName}
            </p>


          </div>





          <div
            className="
              rounded-xl
              bg-black/20
              p-4
            "
          >

            <p className="text-white/40">
              User ID
            </p>


            <p className="mt-1 break-all">
              {user?.id}
            </p>


          </div>





          <div
            className="
              rounded-xl
              bg-black/20
              p-4
            "
          >

            <p className="text-white/40">
              Email Status
            </p>


            <p className="mt-1">
              {
                user?.emailVerifiedAt
                ?
                "Verified"
                :
                "Not Verified"
              }
            </p>


          </div>



        </div>



      </div>



    </div>

  );


}