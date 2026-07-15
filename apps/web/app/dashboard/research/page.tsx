"use client";


import ResearchHeader from "@/components/dashboard/research/ResearchHeader";

import ResearchStats from "@/components/dashboard/research/ResearchStats";

import ResearchFilters from "@/components/dashboard/research/ResearchFilters";

import ResearchCard from "@/components/dashboard/research/ResearchCard";



const documents=[


{
title:"Aluminium Alloy Mechanical Properties",
category:"Material Science",
parameters:24,
status:"Completed"
},


{
title:"Thermal Expansion Analysis",
category:"Thermodynamics",
parameters:18,
status:"Active"
},


{
title:"Bridge Load Research Paper",
category:"Structural Engineering",
parameters:32,
status:"Prototype"
}


];



export default function ResearchPage(){


return (

<div>


<ResearchHeader/>


<ResearchStats/>


<ResearchFilters/>




<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
"

>


{
documents.map(doc=>(


<ResearchCard

key={doc.title}

{...doc}

/>


))

}



</div>


</div>

);


}