"use client";

import React from "react";

import {
  Cpu,
  Zap,
  Droplets,
  Activity,
  Menu,
} from "lucide-react";



interface PrototypeSidebarProps {

  expanded:boolean;

  setExpanded:(value:boolean)=>void;

}



export default function PrototypeSidebar({

  expanded,

  setExpanded,

}:PrototypeSidebarProps){



return (

<aside

className={`
${
expanded
?
"w-60"
:
"w-16"
}

bg-[#0c1f36]

border-r

border-white/10

transition-all

duration-300

p-3

`}

>



<button

onClick={() =>
  setExpanded(!expanded)
}

className="
mb-4
text-slate-400
hover:text-white
transition
"

>

<Menu size={20}/>

</button>







<ComponentButton

icon={<Cpu size={18}/>}

text="Mechanical"

expanded={expanded}

/>







<ComponentButton

icon={<Zap size={18}/>}

text="Electrical"

expanded={expanded}

/>







<ComponentButton

icon={<Droplets size={18}/>}

text="Fluid Systems"

expanded={expanded}

/>







<ComponentButton

icon={<Activity size={18}/>}

text="Controls"

expanded={expanded}

/>





</aside>


);

}







function ComponentButton({

icon,

text,

expanded,


}:{

icon:React.ReactNode;

text:string;

expanded:boolean;


}){


return (

<div

className="
relative
flex
items-center
gap-3
bg-[#14233f]
rounded
p-2
mb-2
cursor-pointer
hover:bg-[#1a2d52]
transition
"

>


<span>

{icon}

</span>





{
expanded && (

<span className="text-sm">

{text}

</span>

)

}



{
!expanded && (

<div

className="
absolute
left-14
hidden
group-hover:block
bg-[#101d3a]
px-2
py-1
rounded
text-xs
"

>

{text}

</div>

)

}



</div>


);


}