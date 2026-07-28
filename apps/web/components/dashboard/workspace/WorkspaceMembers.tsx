"use client";

import { Users } from "lucide-react";

import { Organization } from "@/types/organization";
import { useOrganizationMembers } from "@/hooks/useOrganizations";


export default function WorkspaceMembers({
  organization,
}: {
  organization: Organization;
}) {


  const {
    members,
    isLoading,
    isError,
  } = useOrganizationMembers(
    organization.id
  );



  if (isLoading) {
    return (
      <div className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        text-white/40
      ">
        Loading team members...
      </div>
    );
  }



  if (isError) {
    return (
      <div className="
        rounded-2xl
        border
        border-red-500/20
        bg-red-500/10
        p-6
        text-red-300
      ">
        Failed to load members.
      </div>
    );
  }



  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >


      <div className="
        flex
        items-center
        gap-3
        mb-5
      ">

        <Users/>

        <h2 className="text-xl font-semibold">
          Team Members
        </h2>

      </div>



      <div className="space-y-3">


        {!members?.length && (

          <p className="text-sm text-white/40">
            No members found.
          </p>

        )}



        {members?.map((membership) => (

          <div
            key={membership.id}
            className="
              rounded-lg
              bg-black/20
              p-4
              flex
              justify-between
              items-center
            "
          >


            <div>

              <p>
                {
                  membership.user?.displayName ||
                  `${membership.user?.firstName ?? ""} ${membership.user?.lastName ?? ""}`.trim() ||
                  membership.user?.email
                }
              </p>


              <p className="
                text-sm
                text-white/50
              ">
                {membership.user?.email}
              </p>


            </div>



            <span className="
              rounded-md
              bg-white/10
              px-3
              py-1
              text-xs
            ">
              {membership.role}
            </span>


          </div>

        ))}


      </div>


    </div>

  );

}
