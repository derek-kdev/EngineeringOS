"use client";

import {
  UserPlus,
  MoreVertical,
  Shield,
  User,
  Ban,
  Trash2,
  CheckCircle,
  Mail,
} from "lucide-react";

import { useState } from "react";

import type { OrgMember } from "@/types/dashboard/admin";


const ROLE_STYLE: Record<OrgMember["role"], string> = {
  owner: "text-[#FF6B00] bg-[#FF6B00]/10",
  admin: "text-[#00D2FF] bg-[#00D2FF]/10",
  member: "text-white/60 bg-white/10",
};


const STATUS_STYLE: Record<OrgMember["status"], string> = {
  active: "text-emerald-400",
  invited: "text-amber-400",
  suspended: "text-red-400",
};



export default function MembersPanel({
  members,
}: {
  members: OrgMember[];
}) {


  const [openMenu, setOpenMenu] =
    useState<string | null>(null);



  function handleAction(
    action: string,
    member: OrgMember
  ) {

    console.log(
      action,
      member
    );

    /*
      Replace with API mutations:

      promote:
      PATCH /members/:id/role

      suspend:
      PATCH /members/:id/status

      delete:
      DELETE /members/:id

    */

    setOpenMenu(null);

  }



  return (

    <div className="rounded-2xl border border-white/10 bg-white/5">


      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">


        <div>

          <h2 className="text-sm font-semibold text-white">
            Organisation Members
          </h2>

          <p className="mt-1 text-xs text-white/40">
            Manage workspace users and permissions
          </p>

        </div>



        <button
          className="
          flex items-center gap-2
          rounded-full
          bg-gradient-to-r
          from-[#00D2FF]
          to-[#FF6B00]
          px-4
          py-2
          text-xs
          font-semibold
          text-[#0B132B]
          hover:scale-105
          transition
          "
        >

          <UserPlus size={14}/>

          Invite Member

        </button>


      </div>




      <div className="divide-y divide-white/5">


        {members.map((member)=>{


          return (

            <div

              key={member.id}

              className="
              flex
              items-center
              justify-between
              px-5
              py-4
              "

            >



              <div className="flex items-center gap-3">


                <div
                  className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#00D2FF]
                  to-[#FF6B00]
                  text-sm
                  font-bold
                  text-[#0B132B]
                  "
                >

                  {member.name.charAt(0)}

                </div>



                <div>


                  <p className="text-sm text-white">
                    {member.name}
                  </p>


                  <p className="text-xs text-white/40">
                    {member.email}
                  </p>


                  <p className="mt-1 text-[11px] text-white/30">

                    Joined {member.joinedAt}

                  </p>


                </div>


              </div>






              <div className="flex items-center gap-3">


                <span
                  className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  capitalize
                  ${ROLE_STYLE[member.role]}
                  `}
                >

                  {member.role}

                </span>



                <span
                  className={`
                  text-xs
                  capitalize
                  ${STATUS_STYLE[member.status]}
                  `}
                >

                  {member.status}

                </span>





                {
                  member.role !== "owner" && (

                    <div className="relative">


                      <button

                        onClick={()=>setOpenMenu(
                          openMenu === member.id
                          ? null
                          : member.id
                        )}

                        className="
                        rounded-full
                        p-2
                        text-white/50
                        hover:bg-white/10
                        hover:text-white
                        "

                      >

                        <MoreVertical size={16}/>

                      </button>





                      {
                        openMenu === member.id && (

                          <div

                            className="
                            absolute
                            right-0
                            z-20
                            mt-2
                            w-48
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111827]
                            p-2
                            shadow-xl
                            "

                          >


                            <button

                              onClick={()=>
                                handleAction(
                                  "promote_admin",
                                  member
                                )
                              }

                              className="
                              flex
                              w-full
                              items-center
                              gap-2
                              rounded-lg
                              px-3
                              py-2
                              text-xs
                              text-white/80
                              hover:bg-white/10
                              "

                            >

                              <Shield size={14}/>

                              Promote Admin

                            </button>





                            <button

                              onClick={()=>
                                handleAction(
                                  "make_member",
                                  member
                                )
                              }

                              className="
                              flex
                              w-full
                              items-center
                              gap-2
                              rounded-lg
                              px-3
                              py-2
                              text-xs
                              text-white/80
                              hover:bg-white/10
                              "

                            >

                              <User size={14}/>

                              Make Member

                            </button>





                            <button

                              onClick={()=>
                                handleAction(
                                  "suspend",
                                  member
                                )
                              }

                              className="
                              flex
                              w-full
                              items-center
                              gap-2
                              rounded-lg
                              px-3
                              py-2
                              text-xs
                              text-amber-400
                              hover:bg-white/10
                              "

                            >

                              <Ban size={14}/>

                              Suspend

                            </button>





                            <button

                              onClick={()=>
                                handleAction(
                                  "remove",
                                  member
                                )
                              }

                              className="
                              flex
                              w-full
                              items-center
                              gap-2
                              rounded-lg
                              px-3
                              py-2
                              text-xs
                              text-red-400
                              hover:bg-white/10
                              "

                            >

                              <Trash2 size={14}/>

                              Remove Member

                            </button>


                          </div>

                        )

                      }



                    </div>

                  )
                }


              </div>


            </div>

          );


        })}


      </div>


    </div>

  );

}