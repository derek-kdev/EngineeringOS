"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowLeft,
} from "lucide-react";

import {
  FaXTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";


export default function ContactsPage() {

  const router = useRouter();


  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Adenta",
        "Greater Accra",
        "Ghana",
      ],
      link: "https://maps.google.com/?q=Adenta+Accra+Ghana",
      linkText: "View on Google Maps",
    },

    {
      icon: Phone,
      title: "Phone",
      details: [
        "+233 54 855 8728",
        "+233 59 176 5036",
      ],
      link: "tel:+233548558728",
      linkText: "Call us",
    },

    {
      icon: Mail,
      title: "Email",
      details: [
        "team.engineeringos.dev@gmail.com",
      ],
      link: "mailto:team.engineeringos.dev@gmail.com",
      linkText: "Send email",
    },
  ];



  const socials = [
    {
      name: "X",
      icon: FaXTwitter,
      handle: "@engineeringos_gh",
      url: "https://x.com/engineeringos_gh",
    },

    {
      name: "LinkedIn",
      icon: FaLinkedin,
      handle: "engineeringos.gh",
      url: "https://linkedin.com/company/engineeringos.gh",
    },

    {
      name: "Facebook",
      icon: FaFacebook,
      handle: "engineeringos",
      url: "https://facebook.com/engineeringos",
    },

    {
      name: "Instagram",
      icon: FaInstagram,
      handle: "@engineering_os_gh",
      url: "https://instagram.com/engineering_os_gh",
    },
  ];



  return (

    <main
      className="
        min-h-screen
        bg-[#0B132B]
        flex
        items-center
        justify-center
        px-6
        py-12
        text-white
      "
    >


      {/* BACK BUTTON */}

      <button

        onClick={() => router.back()}

        className="
          fixed
          top-6
          left-6
          z-50
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-white/5
          px-4
          py-2
          text-sm
          text-white/70
          backdrop-blur-md
          transition
          hover:border-[#00D2FF]/50
          hover:text-[#00D2FF]
        "

      >

        <ArrowLeft size={16}/>

        Back

      </button>




      <div
        className="
          w-full
          max-w-5xl
          space-y-8
        "
      >



        {/* LOGO */}

        <div className="flex justify-center">

          <div
            className="
              relative
              h-20
              w-20
              overflow-hidden
              rounded-2xl
            "
          >

            <Image

              src="/img/our_logo.jpg"

              alt="EngineeringOS"

              fill

              className="object-contain"

            />

          </div>

        </div>





        {/* HEADER */}

        <div className="text-center">

          <h1
            className="
              text-4xl
              font-bold
            "
          >

            Contacts

          </h1>


          <p
            className="
              mt-2
              text-white/60
            "
          >

            Get in touch with the EngineeringOS team

          </p>

        </div>






        {/* CONTACT CARDS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {contactInfo.map((item)=>{

            const Icon = item.icon;


            return (

              <div

                key={item.title}

                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-6
                  text-center
                  transition
                  hover:border-[#00D2FF]/40
                "

              >

                <Icon
                  size={30}
                  className="
                    mx-auto
                    text-[#00D2FF]
                  "
                />


                <h3
                  className="
                    mt-4
                    text-xl
                    font-semibold
                  "
                >

                  {item.title}

                </h3>



                {item.details.map((line)=>(

                  <p
                    key={line}
                    className="
                      mt-1
                      text-sm
                      text-white/70
                    "
                  >

                    {line}

                  </p>

                ))}



                <Link

                  href={item.link}

                  className="
                    inline-block
                    mt-4
                    text-sm
                    text-[#00D2FF]
                    hover:underline
                  "

                >

                  {item.linkText} →

                </Link>


              </div>

            );

          })}


        </div>






        {/* SOCIALS */}

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            p-6
          "
        >

          <h3
            className="
              text-center
              font-semibold
              mb-5
            "
          >

            Follow Us

          </h3>



          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-6
            "
          >

            {socials.map((social)=>{

              const Icon = social.icon;


              return (

                <Link

                  key={social.name}

                  href={social.url}

                  target="_blank"

                  className="
                    flex
                    items-center
                    gap-2
                    text-white/70
                    hover:text-[#00D2FF]
                    transition
                  "

                >

                  <Icon size={18}/>

                  {social.handle}

                </Link>

              );

            })}


          </div>


        </div>






        {/* CTA */}

        <div className="flex justify-center">


          <Link

            href="mailto:team.engineeringos.dev@gmail.com"

            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-[#00D2FF]
              px-8
              py-3
              font-semibold
              text-black
              transition
              hover:scale-105
            "

          >

            <Send size={18}/>

            Start a conversation

          </Link>


        </div>






        <footer
          className="
            text-center
            text-xs
            text-white/30
          "
        >

          <Link
            href="https://www.engineeringosgh.com"
            className="
              hover:text-[#00D2FF]
              transition
            "
          >

            www.engineeringosgh.com

          </Link>


        </footer>



      </div>


    </main>

  );

}
