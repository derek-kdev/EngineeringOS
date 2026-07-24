"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { Organization } from "@/types/organization";
import { organizationsApi } from "@/lib/api/organizations";
import { useOrganizations } from "@/hooks/useOrganizations";


interface OrganizationCardProps {

  organization: Organization;

}



export default function OrganizationCard({

  organization,

}: OrganizationCardProps){


  const {
    mutate
  } = useOrganizations();



  const [
    deleting,
    setDeleting
  ] = useState(false);




  async function handleDelete(){


    const confirmed =
      window.confirm(
        "Are you sure you want to delete this organisation?"
      );


    if(!confirmed){

      return;

    }



    try{


      setDeleting(true);


      await organizationsApi.deleteOrganization(
        organization.id
      );


      await mutate();



    }
    catch(error){

      console.error(
        "Delete organisation failed:",
        error
      );


    }
    finally{


      setDeleting(false);


    }

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


      <h3 className="text-lg font-semibold">

        {organization.name}

      </h3>



      <p className="mt-2 text-sm text-white/60">

        {
          organization.description ||
          "No description"
        }

      </p>




      <div

        className="
        mt-6
        flex
        gap-3
        "

      >



        <Link

          href={`/dashboard/organization?id=${organization.id}`}

          className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-white/10
          px-4
          py-2
          text-sm
          hover:bg-white/20
          "

        >

          <Pencil size={15}/>

          Edit

        </Link>





        <button

          onClick={handleDelete}

          disabled={deleting}

          className="
          flex
          items-center
          gap-2
          rounded-lg
          bg-red-500/20
          px-4
          py-2
          text-sm
          text-red-300
          hover:bg-red-500/30
          disabled:opacity-50
          "

        >

          <Trash2 size={15}/>


          {
            deleting
            ? "Deleting..."
            : "Delete"
          }


        </button>



      </div>



    </div>

  );


}