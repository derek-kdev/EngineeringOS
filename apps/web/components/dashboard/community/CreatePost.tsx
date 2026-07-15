"use client";

import GlassCard from "@/components/dashboard/ui/GlassCard";
import PrimaryButton from "@/components/dashboard/ui/PrimaryButton";


export default function CreatePost(){

return(

<GlassCard className="p-6">

<h2 className="font-semibold mb-4">
Create Engineering Update
</h2>


<textarea

placeholder="Share your engineering progress..."

className="
w-full
h-32
rounded-xl
bg-black/20
border
border-white/10
p-4
outline-none
"

/>


<div className="mt-4">

<PrimaryButton>
Publish
</PrimaryButton>

</div>


</GlassCard>

);

}