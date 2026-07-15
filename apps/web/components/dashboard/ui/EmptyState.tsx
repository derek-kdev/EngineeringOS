"use client";


import { ReactNode } from "react";


interface Props {

title:string;

description:string;

icon?:ReactNode;

}



export default function EmptyState({

title,

description,

icon

}:Props){


return (

<div

className="
flex
flex-col
items-center
justify-center
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-12
text-center
"

>


{
icon &&

<div
className="
mb-4
text-[#00D2FF]
"
>

{icon}

</div>

}



<h2

className="
text-xl
font-semibold
"

>

{title}

</h2>



<p

className="
mt-2
max-w-md
text-sm
text-white/50
"

>

{description}

</p>



</div>

);


}