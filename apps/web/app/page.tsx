"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/api";



export default function DashboardPage() {


  const router = useRouter();



  const [user,setUser] = useState<any>(null);

  const [loading,setLoading] = useState(true);




  useEffect(()=>{


    async function loadUser(){


      const token =
        localStorage.getItem(
          "accessToken"
        );



      if(!token){

        router.push("/signin");

        return;

      }



      try{


        const response =
          await api.get("/auth/me");



        setUser(
          response.data
        );



      }catch(error){


        console.error(error);



        localStorage.removeItem(
          "accessToken"
        );


        localStorage.removeItem(
          "refreshToken"
        );


        router.push("/signin");



      }finally{


        setLoading(false);


      }


    }



    loadUser();


  },[router]);





  if(loading){


    return (

      <div

        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-white/70
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

          Authentication is working successfully.

        </p>




        <div

          className="
            mt-8
            space-y-3
            text-sm
          "

        >


          <p>

            <strong>Email:</strong>{" "}

            {user?.email}

          </p>



          <p>

            <strong>Name:</strong>{" "}

            {user?.firstName}{" "}

            {user?.lastName}

          </p>




          <p>

            <strong>User ID:</strong>{" "}

            {user?.id}

          </p>




          <p>

            <strong>Email Verified:</strong>{" "}

            {
              user?.emailVerifiedAt
              ?
              "Yes"
              :
              "No"
            }

          </p>


        </div>




      </div>



    </div>

  );


}