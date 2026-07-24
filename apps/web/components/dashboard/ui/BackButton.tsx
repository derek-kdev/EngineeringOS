"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function BackButton(){

  const router = useRouter();


  return (

    <button
      onClick={() => router.back()}
      className="
      mb-6
      flex
      items-center
      gap-2
      rounded-lg
      border
      border-white/10
      bg-white/5
      px-4
      py-2
      text-sm
      text-white/80
      transition
      hover:bg-white/10
      "
    >

      <ArrowLeft size={16}/>

      Back

    </button>

  );

}
