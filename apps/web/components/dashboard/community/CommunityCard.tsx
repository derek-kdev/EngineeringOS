"use client";

import { ReactNode } from "react";

import GlassCard from "@/components/dashboard/ui/GlassCard";


interface CommunityCardProps {

  children: ReactNode;

  title?: string;

  description?: string;

  className?: string;

}


export default function CommunityCard({

  children,

  title,

  description,

  className = "",

}: CommunityCardProps) {


return (

<GlassCard

className={`
p-6
${className}
`}

>


{
title && (

<h2
className="
text-lg
font-semibold
text-white
"
>
{title}
</h2>

)
}


{
description && (

<p
className="
mt-2
text-sm
text-white/50
"
>
{description}
</p>

)
}


<div className={title || description ? "mt-5" : ""}>

{children}

</div>


</GlassCard>

);

}