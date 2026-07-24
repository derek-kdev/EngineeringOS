"use client";


import { useOrganizations } from "@/hooks/useOrganizations";
import OrganizationCard from "./OrganizationCard";


export default function OrganizationList(){


const {

organizations,

isLoading

}=useOrganizations();



if(isLoading){

return (

<div className="text-white/50">

Loading organizations...

</div>

);

}



if(!organizations?.length){

return (

<div className="text-white/50">

No organizations found.

</div>

);

}



return (

<div

className="
grid
gap-6
md:grid-cols-2
"

>


{

organizations.map((organization)=>(

<OrganizationCard

key={organization.id}

organization={organization}

/>

))

}


</div>

);


}