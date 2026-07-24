"use client";


import OrganizationCreateForm from "@/components/organization/OrganizationCreateForm";
import OrganizationList from "@/components/organization/OrganizationList";
import { useOrganizations } from "@/hooks/useOrganizations";


export default function OrganizationPage(){


const {

organizations

}=useOrganizations();



return (

<div

className="
space-y-10
"

>


<header>

<h1 className="text-3xl font-bold">

Organizations

</h1>


<p className="text-white/60 mt-2">

Manage your engineering workspaces.

</p>


</header>




{

organizations?.length ?

(

<OrganizationList/>

)

:

(

<OrganizationCreateForm/>

)

}



</div>

);


}