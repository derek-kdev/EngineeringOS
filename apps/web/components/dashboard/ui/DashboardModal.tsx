"use client";


import { X } from "lucide-react";


export default function DashboardModal({

children,
title,
onClose,

}:{

children:React.ReactNode;
title:string;
onClose:()=>void;

}){


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
p-6
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
right-4
top-4
rounded-full
p-2
text-white/60
hover:bg-white/10
"

>

<X size={20}/>

</button>



<h2 className="
mb-6
text-2xl
font-semibold
">

{title}

</h2>



{children}


</div>


</div>

);


}
