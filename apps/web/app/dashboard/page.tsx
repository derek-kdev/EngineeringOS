"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const links = [
  {
    label: "New Project",
    shortcut: "Ctrl+Shift+N",
    href: "/dashboard/projects",
  },
  {
    label: "Research",
    shortcut: "Ctrl+Shift+R",
    href: "/dashboard/research",
  },
  {
    label: "Calculations",
    shortcut: "Ctrl+Shift+C",
    href: "/dashboard/calculations",
  },
  {
    label: "Prototype",
    shortcut: "Ctrl+Shift+P",
    href: "/dashboard/prototype",
  },
  {
    label: "Community",
    shortcut: "Ctrl+Shift+C",
    href: "/dashboard/community",
  },
  {
    label: "Open AI Assistant",
    shortcut: "Ctrl+Alt+I",
    href: "/dashboard/ai",
  },
];


export default function DashboardPage() {

  const router = useRouter();


  useEffect(() => {

    const handleShortcut = (event: KeyboardEvent) => {

      const modifier =
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey;

      if (!modifier) return;


      switch(event.key.toLowerCase()) {

        case "n":
          event.preventDefault();
          router.push("/dashboard/projects");
          break;


        case "r":
          event.preventDefault();
          router.push("/dashboard/research");
          break;


        case "c":
          event.preventDefault();
          router.push("/dashboard/calculations");
          break;


        case "p":
          event.preventDefault();
          router.push("/dashboard/prototype");
          break;

      }

    };


    window.addEventListener(
      "keydown",
      handleShortcut
    );


    return () =>
      window.removeEventListener(
        "keydown",
        handleShortcut
      );


  }, [router]);



  return (

    <div className="
      inset-0
      flex
      items-start
      justify-center
      bg-[#0B132B]
      p-4
    ">


      <div className="
        text-center
        space-y-10
      ">


        {/* Logo */}

        <div className="flex justify-center">

          <Image
            src="/img/our_logo.jpg"
            alt="EngineeringOS"
            width={160}
            height={160}
            className="
              rounded-full
              object-cover
              shadow-lg
            "
          />

        </div>



        {/* EngineeringOS Links */}

        <div className="
          space-y-4
          text-left
        ">


          {links.map((item) => (

            <Link
              key={item.label}
              href={item.href}
              className="
                flex
                min-w-[320px]
                items-start
                justify-between
                text-white
                text-base
                transition
                hover:text-[#00D2FF]
              "
            >

              <span>
                {item.label}
              </span>


              <span className="
                ml-8
                font-mono
                text-sm
                text-white/40
              ">
                {item.shortcut}
              </span>


            </Link>

          ))}


        </div>



      </div>


    </div>

  );

}
