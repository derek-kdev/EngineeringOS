"use client";

import { useState } from "react";

import { useOrganizations } from "@/hooks/useOrganizations";

import WorkspaceHeader from "@/components/dashboard/workspace/WorkspaceHeader";

import WorkspaceSettings from "@/components/dashboard/workspace/WorkspaceSettings";



export default function WorkspacePage() {


const {
organizations,
isLoading
}=useOrganizations();



const [
selectedOrgId,
setSelectedOrgId
]=useState<string | null>(null);



if(isLoading){

return (

<div className="p-8 text-white">

Loading workspace...

</div>

);

}



if(!organizations || organizations.length===0){

return (

<div className="p-8 text-white">

No workspace found.

</div>

);

}



const organization =
organizations.find(
(org)=>org.id===selectedOrgId
)
||
organizations[0];



return (

<div className="
space-y-6
">


{/* Workspace Selector */}

<div className="
rounded-2xl
border
border-white/10
bg-white/5
p-4
">


<label className="
text-sm
text-white/60
">

Active Workspace

</label>


<select

value={organization.id}

onChange={(e)=>
setSelectedOrgId(e.target.value)
}

className="
mt-2
rounded-lg
bg-[#0B132B]
border
border-white/10
px-4
py-2
text-white
"

>


{
organizations.map((org)=>(

<option
key={org.id}
value={org.id}
>

{org.name}

</option>

))

}


</select>


</div>





{/* Workspace Information */}

<WorkspaceHeader

organization={organization}

/>





{/* Workspace Management */}

<WorkspaceSettings

organizationId={
organization.id
}

organizations={
organizations
}

onSwitchOrg={
setSelectedOrgId
}

/>



</div>

);


}
