"use client";

import MetricCard from "@/components/dashboard/ui/MetricCard";


const stats = [
{
title:"Engineers Online",
value:"248",
description:"Active members"
},
{
title:"Discussions",
value:"1,420",
description:"Technical conversations"
},
{
title:"Shared Projects",
value:"86",
description:"Community projects"
},
{
title:"Experts Available",
value:"34",
description:"Specialists online"
}
];


export default function CommunityStats(){

return (

<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-5
mb-6
">

{
stats.map(item=>(
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