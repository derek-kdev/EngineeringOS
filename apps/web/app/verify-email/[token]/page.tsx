"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";


export default function VerifyTokenPage(){

 const params = useParams();
 const router = useRouter();

 const [message,setMessage]=useState(
   "Verifying your email..."
 );


 useEffect(()=>{


 async function verify(){

   try{


    await api.get(
      `/auth/verify-email/${params.token}`
    );


    setMessage(
      "Email verified successfully. Redirecting..."
    );


    setTimeout(()=>{
      router.push("/signin");
    },2000);



   }catch(error){


    setMessage(
      "Verification link is invalid or expired."
    );


   }


 }


 verify();


 },[params.token,router]);



 return (

  <main
   className="
   min-h-screen
   flex
   items-center
   justify-center
   bg-[#0B132B]
   text-white
   "
  >

   <div
    className="
    rounded-3xl
    bg-white/5
    border
    border-white/10
    backdrop-blur-xl
    p-10
    text-center
    "
   >

    <h1
     className="
     text-2xl
     font-bold
     "
    >
      EngineeringOS
    </h1>


    <p
     className="
     mt-4
     text-white/70
     "
    >
      {message}
    </p>


   </div>


  </main>

 );


}