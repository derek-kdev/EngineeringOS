"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";

export default function AuthSocialButtons() {
  return (
    <div className="grid grid-cols-3 gap-4">

      <button
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/5
          py-3
          text-white
          transition
          hover:bg-white/10
        "
      >
        <FcGoogle size={22}/>
      </button>


      <button
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/5
          py-3
          text-white
          transition
          hover:bg-white/10
        "
      >
        <FaGithub size={22}/>
      </button>


      <button
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/5
          py-3
          text-white
          transition
          hover:bg-white/10
        "
      >
        <ShieldCheck size={22}/>
      </button>


    </div>
  );
}