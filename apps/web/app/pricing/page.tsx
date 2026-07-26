"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: {
      monthly: 0,
      annual: 0,
    },
    description: "Ideal for individual users starting with EngineeringOS.",
    features: [
      "Access to basic engineering tools",
      "1 user",
      "1GB storage",
      "Community support",
    ],
    href: "/register",
    badge: null,
  },

  {
    name: "Pro",
    price: {
      monthly: 45,
      annual: 450,
    },
    description: "Perfect for students, engineers and small teams.",
    features: [
      "Access to advanced engineering tools",
      "Up to 10 users",
      "5GB storage per user",
      "Priority support",
      "Project collaboration",
    ],
    href: "/register?plan=pro",
    badge: null,
  },

  {
    name: "Premium",
    price: {
      monthly: 200,
      annual: 2000,
    },
    description: "Best choice for engineering organisations.",
    features: [
      "Unlimited users",
      "50GB storage per user",
      "Advanced simulations",
      "Priority support",
      "Custom engineering features",
      "Enterprise collaboration",
    ],
    href: "/register?plan=premium",
    badge: "Best Choice for Enterprises",
  },
];


export default function PricingPage() {

  const router = useRouter();

  const [isAnnual, setIsAnnual] = useState(false);


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

      <div className="w-full max-w-6xl space-y-10">


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



        {/* LOGO */}

        <div className="flex justify-center">

          <div className="relative h-20 w-20 overflow-hidden rounded-2xl">

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
            Pricing
          </h1>


          <p
            className="
              mt-2
              text-white/60
            "
          >
            Choose the EngineeringOS plan that fits your workflow.
          </p>

        </div>




        {/* TOGGLE */}

        <div className="flex justify-center">

          <div
            className="
              flex
              rounded-full
              border
              border-white/10
              bg-white/5
              p-1
            "
          >

            <button

              onClick={() => setIsAnnual(false)}

              className={`
                px-6
                py-2
                rounded-full
                text-sm
                transition
                ${
                  !isAnnual
                  ?
                  "bg-[#00D2FF] text-black"
                  :
                  "text-white/60"
                }
              `}

            >
              Monthly
            </button>



            <button

              onClick={() => setIsAnnual(true)}

              className={`
                px-6
                py-2
                rounded-full
                text-sm
                transition
                ${
                  isAnnual
                  ?
                  "bg-[#00D2FF] text-black"
                  :
                  "text-white/60"
                }
              `}

            >
              Annual
            </button>


          </div>

        </div>





        {/* CARDS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          {plans.map((plan)=>{


            const price =
              isAnnual
              ?
              plan.price.annual
              :
              plan.price.monthly;


            return (

              <div

                key={plan.name}

                className={`
                  relative
                  rounded-3xl
                  border
                  p-7
                  bg-white/5
                  backdrop-blur-xl
                  transition
                  hover:border-[#00D2FF]/40
                  hover:shadow-[0_0_40px_rgba(0,210,255,0.15)]
                  ${
                    plan.badge
                    ?
                    "border-[#00D2FF]/40"
                    :
                    "border-white/10"
                  }
                `}

              >


                {
                  plan.badge && (

                    <div
                      className="
                        absolute
                        -top-3
                        left-1/2
                        -translate-x-1/2
                        rounded-full
                        bg-[#00D2FF]
                        px-4
                        py-1
                        text-xs
                        font-semibold
                        text-black
                      "
                    >

                      {plan.badge}

                    </div>

                  )
                }



                <div className="text-center">


                  <h2 className="text-2xl font-bold">

                    {plan.name}

                  </h2>


                  <p className="mt-2 text-sm text-white/60">

                    {plan.description}

                  </p>



                  <div className="mt-6">


                    <span
                      className="
                        text-4xl
                        font-bold
                      "
                    >

                      ₵{price}.00

                    </span>


                    <span className="text-white/40">

                      {
                        isAnnual
                        ?
                        "/year"
                        :
                        "/month"
                      }

                    </span>


                  </div>


                </div>




                <ul
                  className="
                    mt-8
                    space-y-3
                    text-sm
                    text-white/80
                  "
                >

                  {plan.features.map((feature)=>(

                    <li
                      key={feature}
                      className="
                        flex
                        gap-2
                      "
                    >

                      <span className="text-[#00D2FF]">
                        ✓
                      </span>

                      {feature}

                    </li>

                  ))}

                </ul>




                <Link

                  href={plan.href}

                  className="
                    block
                    mt-8
                    rounded-full
                    bg-[#00D2FF]
                    py-3
                    text-center
                    font-semibold
                    text-black
                    transition
                    hover:scale-105
                  "

                >

                  Get Started

                </Link>



              </div>

            );

          })}


        </div>




        <footer
          className="
            text-center
            text-xs
            text-white/30
          "
        >

          www.engineeringosgh.com

        </footer>



      </div>


    </main>

  );

}
