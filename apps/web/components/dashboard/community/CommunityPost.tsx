"use client";


import StatusBadge from "@/components/dashboard/ui/StatusBadge";

import CommunityCard from "./CommunityCard";


const posts = [

{
author:"Ama Mensah",
role:"Structural Engineer",
title:"Optimised Aluminium Frame Design",
content:
"Simulation results achieved an 18% weight reduction while maintaining structural integrity.",
status:"Prototype",
time:"12 minutes ago"
},

{
author:"Kwame Boateng",
role:"Materials Engineer",
title:"New Composite Material Analysis",
content:
"Uploaded research findings on carbon fibre reinforcement properties.",
status:"Completed",
time:"1 hour ago"
}

];



export default function CommunityPost(){


return (

<div className="space-y-5">


{
posts.map((post,index)=>(


<CommunityCard

key={index}

>


<div
className="
flex
justify-between
gap-4
"
>


<div>


<h3
className="
text-lg
font-semibold
"
>

{post.title}

</h3>


<p
className="
mt-2
text-sm
text-white/50
"
>

{post.content}

</p>


</div>



<StatusBadge

status={post.status}

/>


</div>



<div
className="
mt-5
flex
justify-between
text-xs
text-white/40
"
>


<span>

{post.author} · {post.role}

</span>


<span>

{post.time}

</span>


</div>


<div
className="
mt-4
text-sm
text-[#00D2FF]
"
>

👍 24 &nbsp; 💡 8 &nbsp; 🚀 12

</div>


</CommunityCard>


))

}


</div>

);

}