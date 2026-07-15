"use client";


import GlassCard from "@/components/dashboard/ui/GlassCard";
import EmptyState from "@/components/dashboard/ui/EmptyState";


export default function CalculationHistory(){


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

History

</h2>



<div

className="
mt-5
"

>


<EmptyState

title="No calculations"

description="Saved engineering calculations will appear here."

/>


</div>



</GlassCard>

);


}