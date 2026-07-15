"use client";


import { ReactNode } from "react";


interface Props {

children:ReactNode;

onClick?:()=>void;

className?:string;

}



export default function SecondaryButton({

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
border
border-[#00D2FF]/30
bg-white/5
px-5
py-3
text-[#00D2FF]
transition-all
duration-300
hover:bg-[#00D2FF]/10
${className}
`}

>

{children}

</button>

);


}