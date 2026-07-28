"use client";


import ProjectHeader from "@/components/dashboard/projects/ProjectHeader";

import ProjectStats from "@/components/dashboard/projects/ProjectStats";

import ProjectCard from "@/components/dashboard/projects/ProjectCard";

import EmptyState from "@/components/dashboard/ui/EmptyState";

import type { Project } from "@/types/dashboard/project";


const projects: Project[] = [

{
id:"1",
name:"Solar Microgrid System",
description:"Renewable energy optimisation platform.",
status:"Active",
progress:65,
owner:"Kingsley",
members:5,
updatedAt:"Today"
},


{
id:"2",
name:"Bridge Structural Analysis",
description:"Finite element analysis workflow.",
status:"Prototype",
progress:42,
owner:"Engineering Team",
members:8,
updatedAt:"Yesterday"
}

];



export default function ProjectsPage(){


return (

<div>


<ProjectHeader/>


<ProjectStats/>



<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
"

>


{
projects.length === 0 ?


<EmptyState

title="No projects yet"

description="Create your first engineering project."


/>


:


projects.map(project=>(

<ProjectCard

key={project.id}

project={project}

/>

))

}



</div>


</div>

);


}