"use client";


import {
  Plus
} from "lucide-react";


import PrimaryButton from "../ui/PrimaryButton";


export default function ProjectHeader(){


return (

<div

className="
flex
items-center
justify-between
mb-8
"

>


<div>


<h1

className="
text-3xl
font-bold
"

>

Projects

</h1>


<p

className="
mt-2
text-white/50
"

>

Manage engineering projects, designs, simulations and collaborations.

</p>


</div>



<PrimaryButton>

<Plus size={18}/>

Create Project

</PrimaryButton>



</div>

);


}