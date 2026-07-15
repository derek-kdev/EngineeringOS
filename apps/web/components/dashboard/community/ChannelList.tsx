"use client";

import GlassCard from "@/components/dashboard/ui/GlassCard";


const channels=[
"#general",
"#engineering",
"#showcase",
"#help"
];


export default function ChannelList(){

return(

<GlassCard className="p-6">

<h2 className="text-xl font-semibold mb-4">
Channels
</h2>


<div className="space-y-3">

{
channels.map(channel=>(

<div
key={channel}
className="
rounded-xl
bg-white/5
px-4 py-3
hover:bg-[#00D2FF]/10
cursor-pointer
"
>

{channel}

</div>

))
}

</div>

</GlassCard>

);

}