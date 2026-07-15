"use client";


import GlassCard from "@/components/dashboard/ui/GlassCard";


const formulas=[

"Stress & Strain",

"Beam Deflection",

"Heat Transfer",

"Thermal Expansion",

"Bernoulli Equation",

"Ohm's Law",

"Factor of Safety",

"Projectile Motion",

];



export default function FormulaLibrary(){


return (

<GlassCard

className="
p-5
"

>


<h2

className="
font-semibold
"

>

Formula Library

</h2>



<div

className="
mt-4
space-y-2
"

>


{
formulas.map((item)=>(

<button

key={item}

className="
w-full
rounded-xl
border
border-white/10
bg-white/5
px-3
py-2
text-left
text-sm
text-white/70
hover:border-[#00D2FF]/40
transition
"

>

{item}

</button>

))

}


</div>


</GlassCard>

);


}