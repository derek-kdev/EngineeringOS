"use client";

import { useOrganizations } from "@/hooks/useOrganizations";
import { useOrganizationTasks } from "@/hooks/useTasks";

import {
  Building2,
  Users,
  ClipboardList,
  CheckCircle2,
  Clock3,
  PlayCircle,
} from "lucide-react";

import { useState } from "react";

import CreateOrganizationForm from "@/components/dashboard/workspace/CreateOrganizationForm";
import DashboardModal from "@/components/dashboard/ui/DashboardModal";
import OrganisationHeader from "@/components/dashboard/community/organisations/OrganisationHeader";


export default function OrganisationsPage() {

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);


  const {
    organizations,
    isLoading,
  } = useOrganizations();


  const [
    selectedOrg,
    setSelectedOrg,
  ] = useState<string>("");


  const activeOrganization =
    organizations?.find(
      (org) =>
        org.id === selectedOrg
    )
    ||
    organizations?.[0];


  const {
    tasks,
    isLoading: tasksLoading,
  } =
    useOrganizationTasks(
      activeOrganization?.id || ""
    );


  if (isLoading) {

    return (

      <div className="p-8 text-white/60">

        Loading organisations...

      </div>

    );

  }


  /*
   * No organisations yet.
   *
   * This is a modal action, not navigation,
   * therefore this MUST be a button rather
   * than a Next.js Link.
   */
  if (!organizations?.length) {

    return (

      <div className="space-y-6">


        {
          showCreateModal && (

            <DashboardModal

              title="Create Engineering Organisation"

              onClose={() =>
                setShowCreateModal(false)
              }

            >

              <CreateOrganizationForm

                onClose={() =>
                  setShowCreateModal(false)
                }

                onCreated={() =>
                  window.location.reload()
                }

              />

            </DashboardModal>

          )
        }


        <header
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h1 className="text-3xl font-bold">

              Engineering Organisations

            </h1>


            <p className="mt-2 text-white/60">

              Create or join an engineering organisation.

            </p>

          </div>


          <button

            type="button"

            onClick={() =>
              setShowCreateModal(true)
            }

            className="
              rounded-xl
              bg-[#00D2FF]
              px-5
              py-3
              font-semibold
              text-black
              transition
              hover:opacity-90
            "

          >

            + Create Organisation

          </button>


        </header>


        <div
          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-8
            text-white/60
          "
        >

          No organisations found.

          Create your first engineering organisation
          or join an existing one through invitation.

        </div>


      </div>

    );

  }


  const pending =
    tasks?.filter(
      (task) =>
        task.status === "PENDING"
    ).length || 0;


  const running =
    tasks?.filter(
      (task) =>
        task.status === "IN_PROGRESS"
    ).length || 0;


  const completed =
    tasks?.filter(
      (task) =>
        task.status === "COMPLETED"
    ).length || 0;


  return (

    <div className="space-y-8">


      {
        showCreateModal && (

          <DashboardModal

            title="Create Engineering Organisation"

            onClose={() =>
              setShowCreateModal(false)
            }

          >

            <CreateOrganizationForm

              onClose={() =>
                setShowCreateModal(false)
              }

              onCreated={() =>
                window.location.reload()
              }

            />

          </DashboardModal>

        )
      }


      <OrganisationHeader

        onCreate={() =>
          setShowCreateModal(true)
        }

      />


      <div
        className="
          flex
          gap-3
          flex-wrap
        "
      >

        {
          organizations.map(
            (org) => (

              <button

                key={org.id}

                type="button"

                onClick={() =>
                  setSelectedOrg(org.id)
                }

                className={`
                  rounded-lg
                  px-4
                  py-2
                  border
                  transition
                  ${
                    activeOrganization?.id === org.id
                      ?
                      "bg-[#00D2FF]/20 border-[#00D2FF]"
                      :
                      "border-white/10 bg-white/5"
                  }
                `}

              >

                {org.name}

              </button>

            )
          )
        }

      </div>


      {
        activeOrganization && (

          <div className="space-y-6">


            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >

              <div
                className="
                  flex
                  gap-3
                  items-center
                "
              >

                <Building2 />


                <h2 className="text-2xl font-semibold">

                  {activeOrganization.name}

                </h2>

              </div>


              <p className="mt-4 text-white/60">

                {
                  activeOrganization.description ||
                  "No description provided."
                }

              </p>


              <div
                className="
                  grid
                  md:grid-cols-4
                  gap-4
                  mt-6
                "
              >

                <div
                  className="
                    bg-black/20
                    rounded-xl
                    p-4
                  "
                >

                  Industry

                  <p className="font-semibold">

                    {
                      activeOrganization.industry ||
                      "N/A"
                    }

                  </p>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-xl
                    p-4
                  "
                >

                  Website

                  <p className="font-semibold">

                    {
                      activeOrganization.website ||
                      "N/A"
                    }

                  </p>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-xl
                    p-4
                  "
                >

                  Company Size

                  <p className="font-semibold">

                    {
                      activeOrganization.size ||
                      "N/A"
                    }

                  </p>

                </div>


                <div
                  className="
                    bg-black/20
                    rounded-xl
                    p-4
                  "
                >

                  Created

                  <p className="font-semibold">

                    {
                      new Date(
                        activeOrganization.createdAt
                      ).toLocaleDateString()
                    }

                  </p>

                </div>

              </div>

            </div>


            <div
              className="
                grid
                md:grid-cols-4
                gap-5
              "
            >

              <div
                className="
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  p-5
                "
              >

                <ClipboardList />


                <p className="mt-3 text-white/60">

                  Assignments

                </p>


                <h3 className="text-3xl font-bold">

                  {tasks?.length || 0}

                </h3>

              </div>


              <div
                className="
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  p-5
                "
              >

                <Clock3 />


                <p className="mt-3 text-white/60">

                  Pending

                </p>


                <h3 className="text-3xl font-bold">

                  {pending}

                </h3>

              </div>


              <div
                className="
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  p-5
                "
              >

                <PlayCircle />


                <p className="mt-3 text-white/60">

                  Running

                </p>


                <h3 className="text-3xl font-bold">

                  {running}

                </h3>

              </div>


              <div
                className="
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  p-5
                "
              >

                <CheckCircle2 />


                <p className="mt-3 text-white/60">

                  Completed

                </p>


                <h3 className="text-3xl font-bold">

                  {completed}

                </h3>

              </div>

            </div>


            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-5
                "
              >

                <Users />


                <h2 className="text-xl font-semibold">

                  Team Members

                </h2>

              </div>


              <div className="space-y-3">

                {
                  activeOrganization.memberships?.map(
                    (member, index) => (

                      <div

                        key={
                          member.id ||
                          member.user?.id ||
                          index
                        }

                        className="
                          flex
                          justify-between
                          rounded-lg
                          bg-black/20
                          p-4
                        "

                      >

                        <div>

                          <p className="font-medium">

                            {
                              member.user?.displayName ||
                              `${member.user?.firstName || ""}
                              ${member.user?.lastName || ""}`
                            }

                          </p>


                          <p className="text-sm text-white/50">

                            {member.user?.email}

                          </p>

                        </div>


                        <span className="text-sm">

                          {member.role}

                        </span>

                      </div>

                    )
                  )
                }

              </div>

            </div>


            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >

              <h2
                className="
                  text-xl
                  font-semibold
                  mb-5
                "
              >

                Engineering Assignments

              </h2>


              {
                tasksLoading

                  ?

                  <p>
                    Loading tasks...
                  </p>

                  :

                  tasks?.map(
                    (task) => (

                      <div

                        key={task.id}

                        className="
                          rounded-xl
                          bg-black/20
                          p-4
                          mb-3
                        "

                      >

                        <h3 className="font-semibold">

                          {task.title}

                        </h3>


                        <p className="text-white/60 text-sm">

                          {task.description}

                        </p>


                        <div
                          className="
                            mt-3
                            flex
                            justify-between
                            text-sm
                          "
                        >

                          <span>

                            Assigned:

                            {
                              task.assignedTo?.user?.displayName ||
                              task.assignedTo?.user?.email ||
                              "Unassigned"
                            }

                          </span>


                          <span>

                            {task.status}

                          </span>

                        </div>

                      </div>

                    )
                  )
              }

            </div>


          </div>

        )
      }


    </div>

  );

}
