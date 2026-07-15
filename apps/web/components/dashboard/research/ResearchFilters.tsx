"use client";


import SecondaryButton from "../ui/SecondaryButton";


export default function ResearchFilters(){


return (

<div

className="
flex
flex-wrap
gap-4
mb-8
"

>


<input

placeholder="Search research documents..."

className="
flex-1
min-w-[260px]
rounded-xl
border
border-white/10
bg-white/5
px-4
py-3
text-sm
outline-none
placeholder:text-white/40
"

/>



<SecondaryButton>

Category

</SecondaryButton>



<SecondaryButton>

Parameters

</SecondaryButton>



<SecondaryButton>

Date

</SecondaryButton>



</div>

);


}