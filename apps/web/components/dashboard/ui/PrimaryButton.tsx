"use client";


import { ReactNode } from "react";


interface Props {

children:ReactNode;

onClick?:()=>void;

className?:string;

}



export default function PrimaryButton({

children,

onClick,

className="",

}:Props){


return (

<button

onClick={onClick}

className={`
flex
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-[#FF6B00]
to-[#FFB000]
px-5
py-3
font-semibold
text-black
transition-all
duration-300
hover:scale-105
${className}
`}

>

{children}

</button>

);


}