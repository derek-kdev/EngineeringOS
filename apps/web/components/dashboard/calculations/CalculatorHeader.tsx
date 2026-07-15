"use client";


import {
 Calculator
} from "lucide-react";


import GlassCard from "@/components/dashboard/ui/GlassCard";
import PrimaryButton from "@/components/dashboard/ui/PrimaryButton";


export default function CalculatorHeader(){


return (

<GlassCard

className="
p-6
flex
items-center
justify-between
"

>


<div>

<div

className="
flex
items-center
gap-3
"

>

<Calculator

className="
text-[#00D2FF]
"

/>


<h1

className="
text-2xl
font-bold
"

>

Engineering Calculator

</h1>


</div>



<p

className="
mt-2
text-sm
text-white/50
"

>

Instant engineering calculations with formulas,
units and traceable results.

</p>


</div>



<PrimaryButton>

New Calculation

</PrimaryButton>



</GlassCard>

);


}