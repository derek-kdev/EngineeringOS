"use client";


import {
FolderKanban,
Activity,
CheckCircle,
Users
} from "lucide-react";


import MetricCard from "../ui/MetricCard";



export default function ProjectStats(){


const stats=[

{
title:"Total Projects",
value:"24",
description:"All engineering projects",
icon:<FolderKanban/>
},


{
title:"Active",
value:"8",
description:"Currently running",
icon:<Activity/>
},


{
title:"Completed",
value:"12",
description:"Successfully finished",
icon:<CheckCircle/>
},


{
title:"Collaborators",
value:"46",
description:"Across teams",
icon:<Users/>
}

];



return (

<div

className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-5
mb-8
"

>


{
stats.map((item)=>(


<MetricCard

key={item.title}

title={item.title}

value={item.value}

description={item.description}

/>


))

}


</div>

);


}