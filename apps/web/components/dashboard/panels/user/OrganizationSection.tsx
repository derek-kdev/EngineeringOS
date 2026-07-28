"use client";

import Link from "next/link";
import {
  Building2,
  Users,
  BriefcaseBusiness,
  Globe2,
} from "lucide-react";

import { useCurrentOrganization } from "@/hooks/useCurrentOrganization";


export default function OrganizationSection() {

  const {
    currentOrganization,
    hasOrganization,
    isLoading,
  } = useCurrentOrganization();


  if (isLoading) {
    return (
      <div className="text-sm text-white/40">
        Loading organisation...
      </div>
    );
  }


  if (!hasOrganization || !currentOrganization) {

    return (
      <div className="space-y-4">

        <h2 className="font-semibold">
          Organization
        </h2>

        <p className="text-sm text-white/40">
          No organisation has been created yet.
        </p>

        <Link
          href="/dashboard/workspace/create"
          className="
          block
          rounded-xl
          border
          border-[#FF6B00]/40
          bg-[#FF6B00]/10
          py-2
          text-center
          text-sm
          text-[#FFB300]
          hover:bg-[#FF6B00]/20
          transition
          "
        >
          Create Organisation
        </Link>

      </div>
    );

  }


  const memberCount =
    currentOrganization.memberships?.length || 0;


  return (

    <div className="space-y-5">


      <div>

        <h2 className="font-semibold">
          Organization
        </h2>

        <p className="mt-1 text-xs text-white/40">
          Workspace and organisation information.
        </p>

      </div>



      <OrganizationRow
        icon={<Building2 size={18}/>}
        label="Workspace"
        value={currentOrganization.name}
      />



      <OrganizationRow
        icon={<BriefcaseBusiness size={18}/>}
        label="Industry"
        value={
          currentOrganization.industry ||
          "Not specified"
        }
      />



      <OrganizationRow
        icon={<Users size={18}/>}
        label="Members"
        value={`${memberCount} members`}
      />



      <OrganizationRow
        icon={<Globe2 size={18}/>}
        label="Website"
        value={
          currentOrganization.website ||
          "Not specified"
        }
      />



      <Link
        href="/dashboard/workspace"
        className="
        mt-3
        block
        w-full
        rounded-xl
        border
        border-[#FF6B00]/40
        bg-[#FF6B00]/10
        py-2
        text-center
        text-sm
        text-[#FFB300]
        hover:bg-[#FF6B00]/20
        transition
        "
      >
        Manage Workspace
      </Link>


    </div>

  );

}



function OrganizationRow({
  icon,
  label,
  value,
}:{
  icon:React.ReactNode;
  label:string;
  value:string;
}){


return (

<div className="flex items-center gap-3">

<div className="text-[#00D2FF]">
{icon}
</div>


<div>

<p className="text-xs text-white/40">
{label}
</p>


<p className="text-sm">
{value}
</p>


</div>


</div>

);

}
