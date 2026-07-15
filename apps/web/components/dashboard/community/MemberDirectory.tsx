"use client";

import GlassCard from "@/components/dashboard/ui/GlassCard";


const members=[
["Kwesi","Thermodynamics"],
["Ama","Structural Engineering"],
["Daniel","Python Simulation"]
];


export default function MemberDirectory(){

return(

<GlassCard className="p-6">

<h2 className="font-semibold mb-4">
Member Directory
</h2>


{
members.map(member=>(

<div
key={member[0]}
className="mb-3"
>

<p>
{member[0]}
</p>

<p className="text-xs text-white/50">
{member[1]}
</p>

</div>

))
}


</GlassCard>

);

}