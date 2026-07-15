"use client";

import { Users, Radio } from "lucide-react";
import GlassCard from "@/components/dashboard/ui/GlassCard";
import PrimaryButton from "@/components/dashboard/ui/PrimaryButton";

export default function CommunityHeader() {
  return (
    <GlassCard className="p-6 mb-6">

      <div className="flex flex-col lg:flex-row justify-between gap-6">

        <div className="flex gap-4">

          <div className="
            h-14 w-14
            rounded-2xl
            bg-[#00D2FF]/10
            flex items-center justify-center
            text-[#00D2FF]
          ">
            <Users size={30}/>
          </div>


          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-3xl font-bold">
                Engineering Community
              </h1>


              <span className="
                flex items-center gap-1
                rounded-full
                px-3 py-1
                text-xs
                bg-green-500/10
                text-green-400
              ">
                <Radio size={12}/>
                Live
              </span>

            </div>


            <p className="text-white/50 mt-2 max-w-xl">
              A collaborative engineering network for sharing designs,
              simulations, research and technical knowledge.
            </p>

          </div>

        </div>


        <PrimaryButton>
          Create Post
        </PrimaryButton>


      </div>

    </GlassCard>
  );
}