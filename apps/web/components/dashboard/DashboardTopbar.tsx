"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";


export default function DashboardTopbar() {
  const router = useRouter();

  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);


  const user = {
    firstName: "Kingsley",
    lastName: "Engineer",
    email: "engineeringos@dev.com",
    role: "Lead Engineer",
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;


      if (currentScroll > lastScroll && currentScroll > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }


      setLastScroll(currentScroll);
    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, [lastScroll]);



  function logout() {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "refreshToken"
    );


    router.push("/");
  }



  return (

    <motion.header

      initial={{
        y:0,
        opacity:1
      }}

      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}

      transition={{
        duration:0.3,
        ease:"easeOut"
      }}


      className="
      fixed
      top-3
      left-64
      right-3
      z-50

      h-16

      rounded-2xl

      bg-[#0B132B]/60

      backdrop-blur-2xl

      border
      border-white/10

      shadow-[0_8px_32px_rgba(0,0,0,0.25)]

      px-5

      flex
      items-center
      "

    >


      {/* LEFT */}

      <div
      className="
      flex-1
      text-white
      font-medium
      "
      >

        Welcome back,

        <span
        className="
        ml-2
        text-[#FF6B00]
        "
        >

          {user.firstName}

        </span>

        👋

      </div>



      {/* CENTER SEARCH */}


      <div
      className="
      flex-[1.5]
      flex
      justify-center
      "
      >

        <div
        className="
        group

        w-full
        max-w-xl

        flex
        items-center
        gap-3

        px-4
        py-2

        rounded-xl

        border
        border-white/10

        bg-transparent

        text-white/70

        transition

        hover:border-[#00D2FF]/40

        focus-within:border-[#00D2FF]

        focus-within:shadow-[0_0_20px_rgba(0,210,255,0.25)]

        "
        >

          <Search
          size={18}
          className="
          text-[#00D2FF]
          "
          />


          <input

          placeholder="
          Search projects, papers, prototypes...
          "

          className="
          w-full

          bg-transparent

          outline-none

          text-sm

          placeholder:text-white/40

          "

          />


          <span
          className="
          text-xs

          text-white/40

          border

          border-white/10

          rounded

          px-2
          py-1

          "
          >

            Ctrl K

          </span>


        </div>


      </div>



      {/* RIGHT */}

      <div
      className="
      flex-1

      flex

      justify-end

      items-center

      gap-4
      "
      >


        {/* Notification */}

        <button

        className="
        relative

        text-white/70

        hover:text-[#00D2FF]

        transition

        "

        >

          <Bell size={21}/>


          <span
          className="
          absolute

          -top-2

          -right-2

          bg-[#FF6B00]

          text-white

          text-[10px]

          w-5
          h-5

          rounded-full

          flex
          items-center
          justify-center

          "

          >

            3

          </span>


        </button>



        {/* USER */}

        <div
        className="
        relative
        "
        >


          <button

          onClick={() =>
            setOpenMenu(!openMenu)
          }

          className="
          flex
          items-center
          gap-2

          text-white

          "

          >


            <div

            className="
            w-10
            h-10

            rounded-full

            bg-gradient-to-br

            from-[#FF6B00]

            to-[#FFB300]

            flex

            items-center

            justify-center

            font-bold

            "

            >

              K

            </div>



            <ChevronDown
            size={16}
            />


          </button>




          {openMenu && (

          <div

          className="
          absolute

          right-0

          mt-3

          w-64

          rounded-2xl

          bg-[#0B132B]

          border

          border-white/10

          shadow-xl

          p-4

          text-white

          "

          >


            <div
            className="
            mb-4
            "
            >

              <p
              className="
              font-semibold
              "
              >

                {user.firstName} {user.lastName}

              </p>


              <p
              className="
              text-sm

              text-white/50

              "
              >

                {user.email}

              </p>


              <p
              className="
              text-xs

              text-[#00D2FF]

              mt-1

              "
              >

                {user.role}

              </p>


            </div>



            <button
            className="
            flex
            items-center
            gap-3

            w-full

            py-2

            hover:text-[#00D2FF]

            "
            >

              <User size={17}/>

              Profile

            </button>


            <button
            className="
            flex
            items-center
            gap-3

            w-full

            py-2

            hover:text-[#00D2FF]

            "
            >

              <Settings size={17}/>

              Workspace Settings

            </button>



            <button

            onClick={logout}

            className="
            flex
            items-center
            gap-3

            w-full

            py-2

            text-[#FF6B00]

            "

            >

              <LogOut size={17}/>

              Logout


            </button>



          </div>

          )}



        </div>


      </div>


    </motion.header>


  );
}