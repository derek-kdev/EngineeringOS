"use client";

import {
  Lock,
  KeyRound,
  ShieldCheck,
  Smartphone,
} from "lucide-react";


export default function SecuritySection() {


  return (

    <div className="space-y-5">


      <div>

        <h2 className="font-semibold">
          Security
        </h2>

        <p className="text-xs text-white/40 mt-1">
          Manage your account security settings.
        </p>

      </div>





      <SecurityRow

        icon={<ShieldCheck size={18}/>}

        label="Account Status"

        value="Protected"

      />





      <SecurityRow

        icon={<KeyRound size={18}/>}

        label="Password"

        value="Last updated recently"

      />





      <SecurityRow

        icon={<Smartphone size={18}/>}

        label="Two Factor Authentication"

        value="Not enabled"

      />





      <SecurityRow

        icon={<Lock size={18}/>}

        label="Login Sessions"

        value="Active session"

      />






      <button

        className="
          mt-3
          w-full
          rounded-xl
          border
          border-[#00D2FF]/30
          bg-[#00D2FF]/10
          py-2
          text-sm
          text-[#00D2FF]
          hover:bg-[#00D2FF]/20
          transition
        "

      >

        Change Password

      </button>



    </div>

  );

}






function SecurityRow({

  icon,

  label,

  value,

}:{

  icon:React.ReactNode;

  label:string;

  value:string;

}){


  return (

    <div

      className="
        flex
        items-center
        gap-3
      "

    >

      <div
        className="
          text-[#00D2FF]
        "
      >

        {icon}

      </div>




      <div>

        <p
          className="
            text-xs
            text-white/40
          "
        >

          {label}

        </p>



        <p
          className="
            text-sm
          "
        >

          {value}

        </p>


      </div>


    </div>

  );

}