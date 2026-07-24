"use client";

import { X } from "lucide-react";


export default function Modal({

open,

onClose,

title,

children,

}:{

open:boolean;

onClose:()=>void;

title:string;

children:React.ReactNode;

}){


if(!open)
return null;



return (

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/60
px-6
"

>


<div

className="
relative
w-full
max-w-xl
rounded-2xl
border
border-white/10
bg-[#0B132B]
p-8
shadow-2xl
"

>


<button

onClick={onClose}

className="
absolute
right-5
top-5
text-white/60
hover:text-white
"

>

<X size={22}/>

</button>



<h2 className="
text-2xl
font-bold
mb-6
">

{title}

</h2>



{children}



</div>


</div>


);


}
