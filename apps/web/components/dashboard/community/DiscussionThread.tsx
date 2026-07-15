"use client";

import GlassCard from "@/components/dashboard/ui/GlassCard";


export default function DiscussionThread(){

return(

<GlassCard className="p-6">

<h2 className="font-semibold">
Discussion Thread
</h2>


<div className="mt-4 space-y-3 text-sm">


<p>
<strong>Michael:</strong>
Has anyone tested this material under thermal cycling?
</p>


<p className="text-white/60">
Sarah:
Yes, results show stable performance up to 300°C.
</p>


</div>


</GlassCard>

);

}