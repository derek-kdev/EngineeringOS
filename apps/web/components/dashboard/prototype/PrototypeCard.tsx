"use client";

import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import GlassCard from "@/components/dashboard/ui/GlassCard";


interface PrototypeCardProps {

  title: string;

  description: string;

  status: string;

  material?: string;

  progress?: number;

  updated?: string;

}



export default function PrototypeCard({

  title,

  description,

  status,

  material,

  progress = 0,

  updated,

}: PrototypeCardProps) {


  return (

    <GlassCard

      className="
        p-6
        space-y-5
      "

    >


      {/* HEADER */}

      <div

        className="
          flex
          items-start
          justify-between
          gap-4
        "

      >


        <div>


          <h3

            className="
              text-xl
              font-semibold
              text-white
            "

          >

            {title}

          </h3>



          <p

            className="
              mt-2
              text-sm
              text-white/60
            "

          >

            {description}

          </p>


        </div>



        <StatusBadge status={status}/>


      </div>





      {/* PROTOTYPE DETAILS */}

      <div

        className="
          grid
          grid-cols-2
          gap-4
          text-sm
        "

      >


        {
          material &&

          <div>


            <p className="text-white/40">

              Material

            </p>


            <p className="mt-1 text-[#00D2FF]">

              {material}

            </p>


          </div>

        }




        {
          updated &&

          <div>


            <p className="text-white/40">

              Updated

            </p>


            <p className="mt-1">

              {updated}

            </p>


          </div>

        }


      </div>





      {/* SIMULATION PROGRESS */}

      <div>


        <div

          className="
            flex
            justify-between
            mb-2
            text-xs
            text-white/50
          "

        >

          <span>

            Simulation Progress

          </span>


          <span>

            {progress}%

          </span>


        </div>




        <div

          className="
            h-2
            rounded-full
            bg-white/10
            overflow-hidden
          "

        >


          <div

            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#00D2FF]
              to-[#FF6B00]
              transition-all
            "

            style={{
              width:`${progress}%`
            }}

          />


        </div>


      </div>





      {/* ACTIONS */}

      <div

        className="
          flex
          gap-3
          pt-3
        "

      >


        <button

          className="
            rounded-xl
            border
            border-[#00D2FF]/30
            px-4
            py-2
            text-sm
            text-[#00D2FF]
            hover:bg-[#00D2FF]/10
            transition
          "

        >

          Open Lab

        </button>



        <button

          className="
            rounded-xl
            bg-gradient-to-r
            from-[#FF6B00]
            to-[#FFB000]
            px-4
            py-2
            text-sm
            font-semibold
            text-black
            transition
            hover:scale-105
          "

        >

          Run Simulation

        </button>


      </div>



    </GlassCard>

  );

}