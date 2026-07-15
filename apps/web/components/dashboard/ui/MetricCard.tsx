"use client";


interface Props {


title:string;

value:string;

description?:string;


}



export default function MetricCard({

title,

value,

description,

}:Props){



return (

<div

className="
rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-5
"

>


<p
className="
text-sm
text-white/50
"
>

{title}

</p>



<h2

className="
mt-2
text-3xl
font-bold
text-[#00D2FF]
"

>

{value}

</h2>



{
description &&

<p

className="
mt-2
text-xs
text-white/40
"

>

{description}

</p>

}



</div>

);


}