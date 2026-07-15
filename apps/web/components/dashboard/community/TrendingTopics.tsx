"use client";

import GlassCard from "@/components/dashboard/ui/GlassCard";


export default function TrendingTopics(){

return(

<GlassCard className="p-6">

<h2 className="font-semibold mb-4">
Trending Topics
</h2>


<ul className="space-y-3">

<li>#FiniteElementAnalysis</li>
<li>#AIEngineering</li>
<li>#MaterialScience</li>

</ul>


</GlassCard>

);

}