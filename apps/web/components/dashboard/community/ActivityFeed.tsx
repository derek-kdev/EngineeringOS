"use client";

import GlassCard from "@/components/dashboard/ui/GlassCard";


const activities=[
{
user:"Ama Mensah",
action:"uploaded a structural simulation",
time:"5 minutes ago"
},
{
user:"Daniel Owusu",
action:"shared a prototype update",
time:"20 minutes ago"
},
{
user:"Kwame Boateng",
action:"published research findings",
time:"1 hour ago"
}
];


export default function ActivityFeed(){

return(

<GlassCard className="p-6">

<h2 className="text-xl font-semibold mb-5">
Activity Feed
</h2>


<div className="space-y-5">

{
activities.map((item,index)=>(

<div
key={index}
className="
border-b
border-white/10
pb-4
"
>

<p>

<span className="text-[#00D2FF]">
{item.user}
</span>

{" "}
{item.action}

</p>


<p className="
text-xs
text-white/40
mt-1
">
{item.time}
</p>


</div>

))
}

</div>


</GlassCard>

);

}