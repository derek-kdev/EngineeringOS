"use client";


import {
Project
} from "@/types/dashboard/project";


import GlassCard from "../ui/GlassCard";

import StatusBadge from "../ui/StatusBadge";


interface Props {

project:Project;

}



export default function ProjectCard({

project

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
items-start
"

>


<div>


<h3

className="
text-xl
font-semibold
"

>

{project.name}

</h3>


<p

className="
mt-2
text-sm
text-white/50
"

>

{project.description}

</p>


</div>



<StatusBadge

status={project.status}

/>



</div>



<div

className="
mt-6
flex
justify-between
text-sm
text-white/40
"

>

<span>

Members: {project.members}

</span>


<span>

{project.updatedAt}

</span>


</div>



</GlassCard>

);


}