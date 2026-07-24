"use client";

import { Organization } from "@/types/organization";
import { Users } from "lucide-react";


export default function WorkspaceMembers({
organization
}:{
organization:Organization;
}){


return (

<div className="
rounded-2xl
border
border-white/10
bg-white/5
p-6
">


<div className="flex gap-3 items-center mb-5">

<Users/>

<h2 className="text-xl font-semibold">
Team Members
</h2>

</div>



<div className="space-y-3">

{
organization.memberships?.map(member=>(

<div
key={member.id}
className="
rounded-lg
bg-black/20
p-4
flex
justify-between
"
>

<div>

<p>

{
member.user?.displayName ||
member.user?.email
}

</p>

<p className="text-sm text-white/50">

{member.user?.email}

</p>

</div>


<span>
{member.role}
</span>


</div>

))

}


</div>


</div>

);

}
