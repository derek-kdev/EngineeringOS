"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

import {
  motion,
} from "framer-motion";


import {
  useAuth,
} from "@/hooks/useAuth";


import UserPanel from "@/components/dashboard/panels/UserPanel";

import CommandPalette from "@/components/dashboard/CommandPalette";

import NotificationPanel from "@/components/dashboard/panels/NotificationPanel";





interface DashboardTopbarProps {

  expanded:boolean;

}





export default function DashboardTopbar({
  expanded,
}:DashboardTopbarProps){



  const {
    user,
  } = useAuth();




  const [
    showPanel,
    setShowPanel,
  ] =
  useState(false);




  const [
    showCommandPalette,
    setShowCommandPalette,
  ] =
  useState(false);




  const [
    showNotifications,
    setShowNotifications,
  ] =
  useState(false);




  const [
    visible,
    setVisible,
  ] =
  useState(true);




  const lastScroll =
  useRef(0);



  const ticking =
  useRef(false);








  /*
  |--------------------------------------------------------------------------
  | Global Command Shortcut
  |--------------------------------------------------------------------------
  */


  useEffect(()=>{


    function handleShortcut(
      event:KeyboardEvent
    ){


      if(
        (event.ctrlKey || event.metaKey)
        &&
        event.key.toLowerCase()==="k"
      ){

        event.preventDefault();

        setShowCommandPalette(true);

      }


    }





    window.addEventListener(
      "keydown",
      handleShortcut
    );



    return()=>{


      window.removeEventListener(
        "keydown",
        handleShortcut
      );


    };


  },[]);










  /*
  |--------------------------------------------------------------------------
  | Hide Topbar On Scroll
  |--------------------------------------------------------------------------
  */


  useEffect(()=>{


    lastScroll.current =
      window.scrollY;




    function handleScroll(){



      if(ticking.current)
        return;




      ticking.current=true;



      requestAnimationFrame(()=>{



        const current =
          window.scrollY;




        if(
          current > lastScroll.current &&
          current > 80
        ){


          setVisible(false);

          setShowPanel(false);

          setShowNotifications(false);


        }
        else{


          setVisible(true);


        }




        lastScroll.current =
          current;



        ticking.current=false;



      });



    }





    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive:true,
      }
    );




    return()=>{


      window.removeEventListener(
        "scroll",
        handleScroll
      );


    };



  },[]);









  return (

    <>


      <motion.header


        animate={{
          y:visible ? 0 : -100,
          opacity:visible ? 1 : 0,
        }}


        transition={{
          duration:0.3,
        }}



        className={`
          fixed
          top-4
          right-4
          z-40
          rounded-2xl
          border
          border-white/10
          bg-[#0B132B]/60
          backdrop-blur-2xl
          px-5
          py-3
          text-white

          ${
            expanded
            ?
            "left-[286px]"
            :
            "left-[94px]"
          }

        `}


      >



        <div
          className="
            flex
            items-center
            justify-between
            gap-6
          "
        >







          {/* GREETING */}


          <div
            className="
              flex-1
              hidden
              lg:block
            "
          >


            <p
              className="
                text-sm
                text-white/50
              "
            >

              Welcome back,

            </p>



            <h2
              className="
                text-sm
                font-semibold
              "
            >

              {user?.firstName || "Engineer"}

              <span className="text-[#FF6B00]">
                👋
              </span>


            </h2>


          </div>









          {/* COMMAND SEARCH */}



          <div
            className="
              flex-[1.5]
            "
          >


            <button

              onClick={() =>
                setShowCommandPalette(true)
              }


              className="
                relative
                w-full
                text-left
              "

            >



              <Search

                size={17}

                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-[#00D2FF]
                "

              />




              <div

                className="
                  w-full
                  rounded-xl
                  bg-white/[0.03]
                  pl-10
                  pr-16
                  py-2.5
                  text-sm
                  text-white/40
                "

              >

                Search projects, papers, prototypes...

              </div>





              <span

                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  rounded-md
                  bg-white/5
                  px-2
                  py-1
                  text-[10px]
                  text-white/40
                "

              >

                Ctrl K

              </span>




            </button>


          </div>









          {/* ACTIONS */}



          <div

            className="
              flex
              flex-1
              justify-end
              items-center
              gap-5
            "

          >





            {/* NOTIFICATIONS */}



            <button

              onClick={() =>
                setShowNotifications(
                  previous=>!previous
                )
              }


              className="
                relative
                text-white/60
                hover:text-[#00D2FF]
              "

            >

              <Bell size={20}/>



              {/* Temporary unread count */}

              <span

                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FF6B00]
                  text-[10px]
                  text-black
                "

              >

                0

              </span>



            </button>









            {/* USER MENU */}



            <button

              onClick={() =>
                setShowPanel(
                  previous=>!previous
                )
              }


              className="
                flex
                items-center
                gap-2
              "

            >



              <div

                className="
                  h-9
                  w-9
                  rounded-full
                  bg-gradient-to-br
                  from-[#FF6B00]
                  to-[#FFB300]
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-black
                "

              >

                {
                  user?.firstName
                  ?.charAt(0)
                  ||
                  "E"
                }


              </div>





              <ChevronDown

                size={16}

                className="
                  text-white/70
                "

              />


            </button>



          </div>



        </div>



      </motion.header>








      <UserPanel

        open={showPanel}

        onClose={() =>
          setShowPanel(false)
        }

      />








      <NotificationPanel

        open={showNotifications}

        onClose={() =>
          setShowNotifications(false)
        }

      />








      <CommandPalette

        open={showCommandPalette}

        onClose={() =>
          setShowCommandPalette(false)
        }

      />



    </>


  );


}