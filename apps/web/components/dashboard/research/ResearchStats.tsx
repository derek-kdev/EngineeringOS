"use client";


import MetricCard from "../ui/MetricCard";


import {
FileText,
Brain,
FolderKanban,
MessageSquare
} from "lucide-react";



export default function ResearchStats(){


const stats=[


{
title:"Documents",
value:"128",
description:"Stored research files",
icon:<FileText/>
},


{
title:"AI Parameters",
value:"642",
description:"Extracted engineering values",
icon:<Brain/>
},


{
title:"Linked Projects",
value:"34",
description:"Research driven projects",
icon:<FolderKanban/>
},


{
title:"AI Queries",
value:"256",
description:"Research conversations",
icon:<MessageSquare/>
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
stats.map(stat=>(


<MetricCard

key={stat.title}

title={stat.title}

value={stat.value}

description={stat.description}


/>


))

}


</div>

);


}