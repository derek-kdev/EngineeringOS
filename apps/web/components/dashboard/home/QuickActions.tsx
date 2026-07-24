"use client";

import Link from "next/link";

import {
  FolderKanban,
  FlaskConical,
  Lightbulb,
  Calculator,
  Box,
  Users,
  Building2,
} from "lucide-react";


const actions = [

  {
    title:"Projects",
    description:"Manage engineering projects",
    href:"/dashboard/projects",
    icon:FolderKanban,
  },


  {
    title:"Research",
    description:"Research library and collaboration",
    href:"/dashboard/research",
    icon:FlaskConical,
  },


  {
    title:"Ideas",
    description:"Engineering ideas and concepts",
    href:"/dashboard/ideas",
    icon:Lightbulb,
  },


  {
    title:"Calculations",
    description:"Engineering calculations",
    href:"/dashboard/calculations",
    icon:Calculator,
  },


  {
    title:"Prototype",
    description:"Simulation and modelling",
    href:"/dashboard/prototype",
    icon:Box,
  },


  {
    title:"Community",
    description:"Engineering discussions",
    href:"/dashboard/community",
    icon:Users,
  },


  {
    title:"Organisations",
    description:"Create or manage engineering teams",
    href:"/dashboard/community/organisations",
    icon:Building2,
  },


];


export default function QuickActions(){


return (

<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


{
actions.map((item)=>(


<Link

key={item.title}

href={item.href}

className="
rounded-2xl
border
border-white/10
bg-white/5
p-6
transition
hover:bg-white/10
"

>


<div className="flex items-center gap-3">


<item.icon size={24}/>


<h3 className="font-semibold">
{item.title}
</h3>


</div>


<p className="mt-3 text-sm text-white/60">

{item.description}

</p>


</Link>


))

}


</div>

);


}
