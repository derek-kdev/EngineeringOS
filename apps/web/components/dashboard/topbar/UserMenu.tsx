"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  User,
  Settings,
  Shield,
  Building2,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";


interface UserMenuProps {

  onOpenPanel?: (
    panel:
      | "profile"
      | "preferences"
      | "security"
      | "workspace"
  ) => void;

}



export default function UserMenu({
  onOpenPanel,
}: UserMenuProps) {


  const { user, logout } = useAuth();


  const [showMenu, setShowMenu] =
    useState(false);



  const menuRef =
    useRef<HTMLDivElement>(null);

  const closeTimeoutRef =
    useRef<NodeJS.Timeout | null>(null);


  /*
  |--------------------------------------------------------------------------
  | Close dropdown when:
  |
  | 1. User clicks outside (click-outside detection)
  | 2. User scrolls the dashboard (scroll detection)
  | 3. Cursor leaves the menu (mouseleave)
  | 4. User clicks on a menu item (auto-close after action)
  |
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (!showMenu) {
      return;
    }


    function handleClickOutside(
      event: MouseEvent
    ) {

      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {

        setShowMenu(false);

      }

    }




    function handleScroll() {

      setShowMenu(false);

    }




    function handleKeyDown(
      event: KeyboardEvent
    ) {

      if (
        event.key === "Escape"
      ) {

        setShowMenu(false);

      }

    }




    // Add a small delay to allow click handlers to complete
    const delayedAddListeners = setTimeout(
      () => {

        document.addEventListener(
          "mousedown",
          handleClickOutside,
          true
        );

        document.addEventListener(
          "touchstart",
          handleClickOutside,
          true
        );

        window.addEventListener(
          "scroll",
          handleScroll,
          { passive: true }
        );

        document.addEventListener(
          "keydown",
          handleKeyDown
        );

      },
      0
    );




    return () => {

      clearTimeout(delayedAddListeners);

      document.removeEventListener(
        "mousedown",
        handleClickOutside,
        true
      );

      document.removeEventListener(
        "touchstart",
        handleClickOutside,
        true
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };


  }, [showMenu]);




  function handleOpen(
    panel:
      | "profile"
      | "preferences"
      | "security"
      | "workspace"
  ) {

    setShowMenu(false);

    onOpenPanel?.(panel);

  }




  async function handleLogout(){

    setShowMenu(false);

    await logout();

  }




  function handleMouseLeave() {

    closeTimeoutRef.current = setTimeout(
      () => {

        setShowMenu(false);

      },
      100
    );

  }




  function handleMouseEnter() {

    if (
      closeTimeoutRef.current
    ) {

      clearTimeout(
        closeTimeoutRef.current
      );

      closeTimeoutRef.current = null;

    }

  }




  return (

    <div
      ref={menuRef}
      className="relative"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >



      {/* Avatar Button */}

      <button
        onClick={() =>
          setShowMenu(
            (previous) => !previous
          )
        }
        className="
          flex
          items-center
          gap-2
          text-white
          transition-all
          duration-200
          hover:opacity-80
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
            transition-transform
            duration-200
            hover:scale-105
          "
        >

          {
            user?.firstName?.charAt(0)
            ||
            "E"
          }

        </div>



        <ChevronDown
          size={16}
          className={`
            text-white/70
            transition-transform
            duration-300
            ${showMenu ? "rotate-180" : ""}
          `}
        />


      </button>




      {/* Dropdown Menu */}

      {
        showMenu && (

          <div
            className={`
              absolute
              right-0
              mt-3
              w-64
              rounded-xl
              border
              border-white/10
              bg-gradient-to-b
              from-[#0F1729]
              to-[#0B132B]
              shadow-2xl
              backdrop-blur-xl
              p-4
              text-white
              z-50
              animate-in
              fade-in
              slide-in-from-top-2
              duration-200
            `}
          >



            {/* User Information */}

            <div
              className="
                mb-4
                pb-4
                border-b
                border-white/10
              "
            >


              <p
                className="
                  font-semibold
                  text-white
                  text-sm
                  truncate
                "
              >

                {user?.firstName}
                {" "}
                {user?.lastName}

              </p>




              <p
                className="
                  text-xs
                  text-white/50
                  truncate
                  mt-1
                "
              >

                {user?.email}

              </p>




              <p
                className="
                  text-xs
                  text-[#00D2FF]
                  mt-2
                  font-medium
                  inline-block
                  px-2
                  py-1
                  rounded-md
                  bg-[#00D2FF]/10
                "
              >

                {user?.role}

              </p>


            </div>




            {/* Menu Items */}

            <div
              className="
                space-y-1
              "
            >




              <button
                onClick={() =>
                  handleOpen("profile")
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-white/80
                  hover:bg-white/5
                  hover:text-white
                  transition-all
                  duration-150
                  group
                "
              >

                <User
                  size={16}
                  className="
                    text-white/60
                    group-hover:text-[#00D2FF]
                    transition-colors
                  "
                />

                Profile

              </button>




              <button
                onClick={() =>
                  handleOpen("preferences")
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-white/80
                  hover:bg-white/5
                  hover:text-white
                  transition-all
                  duration-150
                  group
                "
              >

                <Settings
                  size={16}
                  className="
                    text-white/60
                    group-hover:text-[#00D2FF]
                    transition-colors
                  "
                />

                Preferences

              </button>




              <button
                onClick={() =>
                  handleOpen("security")
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-white/80
                  hover:bg-white/5
                  hover:text-white
                  transition-all
                  duration-150
                  group
                "
              >

                <Shield
                  size={16}
                  className="
                    text-white/60
                    group-hover:text-[#00D2FF]
                    transition-colors
                  "
                />

                Security

              </button>




              <button
                onClick={() =>
                  handleOpen("workspace")
                }
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-white/80
                  hover:bg-white/5
                  hover:text-white
                  transition-all
                  duration-150
                  group
                "
              >

                <Building2
                  size={16}
                  className="
                    text-white/60
                    group-hover:text-[#00D2FF]
                    transition-colors
                  "
                />

                Workspace

              </button>




              <div
                className="
                  my-3
                  border-t
                  border-white/10
                "
              />




              <button
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-sm
                  text-red-400/80
                  hover:bg-red-500/10
                  hover:text-red-300
                  transition-all
                  duration-150
                  group
                "
              >

                <LogOut
                  size={16}
                  className="
                    text-red-400/60
                    group-hover:text-red-300
                    transition-colors
                  "
                />

                Logout

              </button>



            </div>




          </div>

        )
      }



    </div>

  );

}