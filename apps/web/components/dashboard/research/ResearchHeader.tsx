"use client";


import {
  Upload
} from "lucide-react";


import PrimaryButton from "../ui/PrimaryButton";



export default function ResearchHeader(){


return (

<div

className="
flex
items-center
justify-between
mb-8
"

>


<div>


<h1

className="
text-3xl
font-bold
"

>

Research Library

</h1>



<p

className="
mt-2
text-white/50
"

>

Store, analyse and transform engineering research into project intelligence.

</p>


</div>



<PrimaryButton>

<Upload size={18}/>

Upload Document

</PrimaryButton>



</div>

);


}