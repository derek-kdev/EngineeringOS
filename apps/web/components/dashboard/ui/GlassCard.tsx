"use client";


import { ReactNode } from "react";


interface Props {

  children: ReactNode;

  className?: string;

}


export default function GlassCard({

  children,

  className = "",

}: Props) {


return (

<div

className={`
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
transition-all
duration-300
hover:border-[#00D2FF]/30
${className}
`}

>

{children}

</div>

);


}