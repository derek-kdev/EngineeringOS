"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  User,
  Settings,
  Shield,
  Building2,
  LogOut,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";


import {
  useAuth,
} from "@/hooks/useAuth";


import ProfileSection
from "./user/ProfileSection";

import PreferencesSection
from "./user/PreferencesSection";

import SecuritySection
from "./user/SecuritySection";

import OrganizationSection
from "./user/OrganizationSection";




interface UserPanelProps {

  open:boolean;

  onClose:()=>void;

}




type PanelTab =
  | "profile"
  | "preferences"
  | "security"
  | "organization";






export default function UserPanel({

  open,

  onClose,

}:UserPanelProps){



  const {
    logout
  } = useAuth();



  const router =
    useRouter();




  const panelRef =
    useRef<HTMLDivElement>(null);





  const [activeTab,setActiveTab] =
    useState<PanelTab>("profile");








  /*
  |--------------------------------------------------------------------------
  | Close Outside Click
  |--------------------------------------------------------------------------
  */

  useEffect(()=>{


    function handleClick(
      event:MouseEvent
    ){


      if(
        panelRef.current &&
        !panelRef.current.contains(
          event.target as Node
        )
      ){

        onClose();

      }


    }



    if(open){

      document.addEventListener(
        "mousedown",
        handleClick
      );

    }



    return ()=>{

      document.removeEventListener(
        "mousedown",
        handleClick
      );

    };


  },[
    open,
    onClose
  ]);






  if(!open)
    return null;






  function handleLogout(){


    logout();


    router.push("/");


  }








  return (

    <div

      ref={panelRef}

      className="
        fixed
        top-20
        right-6
        z-50
        w-[420px]
        max-h-[75vh]
        overflow-y-auto
        rounded-2xl
        border
        border-white/10
        bg-[#0B132B]
        shadow-2xl
        text-white
      "

    >





      {/* TABS */}

      <div
        className="
          grid
          grid-cols-4
          border-b
          border-white/10
        "
      >


        <button
          onClick={()=>setActiveTab("profile")}
          className="p-3 flex justify-center"
        >
          <User size={18}/>
        </button>


        <button
          onClick={()=>setActiveTab("preferences")}
          className="p-3 flex justify-center"
        >
          <Settings size={18}/>
        </button>


        <button
          onClick={()=>setActiveTab("security")}
          className="p-3 flex justify-center"
        >
          <Shield size={18}/>
        </button>


        <button
          onClick={()=>setActiveTab("organization")}
          className="p-3 flex justify-center"
        >
          <Building2 size={18}/>
        </button>


      </div>






      {/* CONTENT */}

      <div className="p-5">


        {
          activeTab==="profile" &&
          <ProfileSection/>
        }


        {
          activeTab==="preferences" &&
          <PreferencesSection/>
        }


        {
          activeTab==="security" &&
          <SecuritySection/>
        }


        {
          activeTab==="organization" &&
          <OrganizationSection/>
        }


      </div>







      {/* LOGOUT */}

      <div
        className="
          border-t
          border-white/10
          p-4
        "
      >

        <button

          onClick={handleLogout}

          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white/5
            py-2
            text-sm
            hover:bg-white/10
          "

        >

          <LogOut size={16}/>

          Logout


        </button>


      </div>



    </div>

  );

}