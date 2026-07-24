"use client";

import { Building2 } from "lucide-react";
import { Organization } from "@/types/organization";


export default function WorkspaceHeader({
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

<div className="flex items-center gap-3">

<Building2 size={24}/>

<h1 className="text-2xl font-bold">
{organization.name}
</h1>

</div>


<p className="mt-3 text-white/60">
{organization.description || "No description"}
</p>


<div className="
grid
md:grid-cols-3
gap-4
mt-6
">


<div className="rounded-xl bg-black/20 p-4">

<p className="text-white/50 text-sm">
Industry
</p>

<p>
{organization.industry || "N/A"}
</p>

</div>



<div className="rounded-xl bg-black/20 p-4">

<p className="text-white/50 text-sm">
Company Size
</p>

<p>
{organization.size || "N/A"}
</p>

</div>



<div className="rounded-xl bg-black/20 p-4">

<p className="text-white/50 text-sm">
Website
</p>

<p>
{organization.website || "N/A"}
</p>

</div>


</div>


</div>

);

}
