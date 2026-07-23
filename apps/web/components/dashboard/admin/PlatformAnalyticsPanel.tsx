// apps/web/components/dashboard/admin/AnalyticsPanel.tsx

"use client";

import {
  Users,
  Activity,
  FolderKanban,
  BarChart3,
} from "lucide-react";

import type {
  PlatformAnalytics,
} from "@/types/dashboard/admin";


interface AnalyticsPanelProps {
  analytics: PlatformAnalytics;
}


export default function AnalyticsPanel({
  analytics,
}: AnalyticsPanelProps) {


  const maxUserGrowth = Math.max(
    ...analytics.userGrowth.map(
      (item) => item.value
    )
  );


  const maxProjectActivity = Math.max(
    ...analytics.projectActivity.map(
      (item) => item.value
    )
  );


  return (

    <div className="space-y-6">


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">


        <StatCard
          title="Total Users"
          value={analytics.totalUsers}
          icon={<Users size={18} />}
        />


        <StatCard
          title="Active Users"
          value={analytics.activeUsers}
          icon={<Activity size={18} />}
        />


        <StatCard
          title="Projects"
          value={analytics.totalProjects}
          icon={<FolderKanban size={18} />}
        />


        <StatCard
          title="Events"
          value={analytics.totalEvents}
          icon={<BarChart3 size={18} />}
        />


      </div>




      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


        <ChartBox title="User Growth">


          <div className="flex h-40 items-end gap-3">


            {analytics.userGrowth.map((item) => (

              <div
                key={item.label}
                className="flex flex-1 flex-col items-center gap-2"
              >

                <div

                  className="w-full rounded-t-md bg-gradient-to-t from-[#0284C7] to-[#00D2FF]"

                  style={{
                    height: `${(item.value / maxUserGrowth) * 100}%`,
                  }}

                />


                <span className="text-[10px] text-white/40">
                  {item.label}
                </span>


              </div>

            ))}


          </div>


        </ChartBox>





        <ChartBox title="Project Activity">


          <div className="flex h-40 items-end gap-3">


            {analytics.projectActivity.map((item) => (

              <div
                key={item.label}
                className="flex flex-1 flex-col items-center gap-2"
              >

                <div

                  className="w-full rounded-t-md bg-gradient-to-t from-[#FF6B00] to-[#FDBA74]"

                  style={{
                    height: `${(item.value / maxProjectActivity) * 100}%`,
                  }}

                />


                <span className="text-[10px] text-white/40">
                  {item.label}
                </span>


              </div>

            ))}


          </div>


        </ChartBox>


      </div>





      <div className="rounded-2xl border border-white/10 bg-white/5">


        <div className="border-b border-white/10 px-5 py-3 text-sm font-semibold text-white">

          Module Usage

        </div>



        <div className="divide-y divide-white/5">


          {analytics.modules.map((module) => (

            <div

              key={module.name}

              className="flex items-center justify-between px-5 py-3"

            >

              <span className="text-sm text-white/80">

                {module.name}

              </span>


              <span className="text-sm text-white">

                {module.usage.toLocaleString()}

              </span>


            </div>


          ))}


        </div>


      </div>


    </div>

  );

}





function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {


  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">


      <div className="flex items-center gap-2 text-xs text-white/50">

        <span className="text-[#00D2FF]">

          {icon}

        </span>

        {title}

      </div>


      <p className="mt-3 text-2xl font-bold text-white">

        {value.toLocaleString()}

      </p>


    </div>

  );

}





function ChartBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {


  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">


      <h3 className="mb-5 text-sm font-semibold text-white">

        {title}

      </h3>


      {children}


    </div>

  );

}