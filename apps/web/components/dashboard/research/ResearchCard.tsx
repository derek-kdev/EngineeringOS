"use client";


import GlassCard from "../ui/GlassCard";

import StatusBadge from "../ui/StatusBadge";



interface Props {

title:string;

category:string;

parameters:number;

status:string;

}



export default function ResearchCard({

title,

category,

parameters,

status

}:Props){


return (

<GlassCard

className="
p-6
"

>


<div

className="
flex
justify-between
"

>


<div>


<h3

className="
text-xl
font-semibold
"

>

{title}

</h3>


<p

className="
mt-2
text-sm
text-white/50
"

>

{category}

</p>


</div>


<StatusBadge

status={status}

/>


</div>




<div

className="
mt-6
text-sm
text-white/60
"

>


Extracted Parameters:

<span

className="
ml-2
text-[#00D2FF]
font-semibold
"

>

{parameters}

</span>


</div>



</GlassCard>

);


}