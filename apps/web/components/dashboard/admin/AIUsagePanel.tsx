// apps/web/components/dashboard/admin/AIUsagePanel.tsx

"use client";

import { Sparkles } from "lucide-react";
import type { AIUsageSummary } from "@/types/dashboard/admin";


export default function AIUsagePanel({
  summary,
}: {
  summary: AIUsageSummary;
}) {

  const maxRequests = Math.max(
    ...summary.daily.map((item) => item.requests)
  );


  return (
    <div className="space-y-6">


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">


        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

          <span className="text-xs text-white/50">
            Requests This Month
          </span>

          <p className="mt-2 text-2xl font-bold text-white">
            {summary.totalRequestsThisMonth.toLocaleString()}
          </p>

        </div>



        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

          <span className="text-xs text-white/50">
            Tokens Used
          </span>

          <p className="mt-2 text-2xl font-bold text-white">
            {(summary.totalTokensThisMonth / 1_000_000).toFixed(2)}
            M
          </p>

        </div>




        <div className="rounded-2xl border border-[#FF6B00]/20 bg-[#FF6B00]/[0.04] p-5">

          <span className="text-xs text-white/50">
            Estimated Cost
          </span>


          <p className="mt-2 text-2xl font-bold text-white">

            ${summary.estimatedCost.toFixed(2)}

            <span className="ml-1 text-sm font-normal text-white/40">
              {summary.currency}
            </span>

          </p>

        </div>



      </div>





      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">


        <div className="flex items-center gap-2 text-sm font-semibold text-white">

          <Sparkles
            size={15}
            className="text-[#00D2FF]"
          />

          AI Requests Timeline

        </div>




        <div className="mt-5 flex h-40 items-end gap-3">


          {summary.daily.map((item) => (

            <div
              key={item.date}
              className="
                flex
                flex-1
                flex-col
                items-center
                gap-2
              "
            >


              <div
                className="
                  w-full
                  rounded-t-md
                  bg-gradient-to-t
                  from-[#0284C7]
                  to-[#00D2FF]
                  transition
                "
                style={{
                  height: `${Math.max(
                    (item.requests / maxRequests) * 100,
                    5
                  )}%`,
                }}
                title={`${item.requests} requests`}
              />



              <span className="text-[10px] text-white/40">
                {item.date}
              </span>


            </div>


          ))}



        </div>


      </div>






      <div className="rounded-2xl border border-white/10 bg-white/5">


        <div className="border-b border-white/10 px-5 py-3">

          <h3 className="text-sm font-semibold text-white">
            Usage By Feature
          </h3>

        </div>



        <div className="divide-y divide-white/5">


          {summary.byFeature.map((feature) => {


            const percentage = Math.round(
              (feature.requests /
                summary.totalRequestsThisMonth) *
                100
            );


            return (

              <div
                key={feature.feature}
                className="
                  flex
                  items-center
                  gap-4
                  px-5
                  py-3
                "
              >


                <span className="w-56 text-sm text-white/80">

                  {feature.feature}

                </span>



                <div className="flex flex-1 items-center gap-3">


                  <div
                    className="
                      h-1.5
                      flex-1
                      overflow-hidden
                      rounded-full
                      bg-white/10
                    "
                  >

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-[#00D2FF]
                      "
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>




                  <span className="w-16 text-right text-xs text-white/50">

                    {feature.requests.toLocaleString()}

                  </span>



                </div>


              </div>

            );

          })}



        </div>


      </div>



    </div>
  );
}