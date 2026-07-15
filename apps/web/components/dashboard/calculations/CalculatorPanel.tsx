"use client";


import GlassCard from "@/components/dashboard/ui/GlassCard";


export default function CalculatorPanel(){


return (

<GlassCard

className="
p-6
"

>


<h2

className="
text-xl
font-semibold
"

>

Stress Calculation

</h2>



<div

className="
mt-6
grid
gap-4
"

>


<input

placeholder="Force (N)"

className="
rounded-xl
bg-black/20
border
border-white/10
p-3
"

/>



<input

placeholder="Area (m²)"

className="
rounded-xl
bg-black/20
border
border-white/10
p-3
"

/>



</div>



<div

className="
mt-8
rounded-xl
bg-black/20
p-5
"

>


<p className="text-white/50 text-sm">

Formula

</p>


<p

className="
mt-2
text-[#00D2FF]
"

>

Stress = Force / Area

</p>



</div>



<div

className="
mt-5
text-3xl
font-bold
text-[#FFB000]
"

>

0 Pa

</div>



</GlassCard>

);


}