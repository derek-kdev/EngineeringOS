import { Project } from "@/types/dashboard/project";


const projects:Project[] = [

{
id:"1",
title:"Bridge Structural Analysis",
description:
"Finite element analysis and structural optimisation workflow.",
status:"ACTIVE",
progress:72,
members:5,
updatedAt:"2 hours ago"
},


{
id:"2",
title:"Solar Microgrid Prototype",
description:
"Renewable energy prototype development.",
status:"ACTIVE",
progress:45,
members:8,
updatedAt:"Yesterday"
},


{
id:"3",
title:"AI Research Assistant",
description:
"Engineering research extraction and knowledge system.",
status:"DRAFT",
progress:15,
members:3,
updatedAt:"3 days ago"
},


{
id:"4",
title:"Hydraulic Simulation Model",
description:
"Fluid dynamics simulation environment.",
status:"COMPLETED",
progress:100,
members:6,
updatedAt:"Last week"
}

];



export async function getProjects(){

return projects;

}
