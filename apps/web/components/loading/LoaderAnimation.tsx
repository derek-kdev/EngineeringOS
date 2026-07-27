"use client";

import {
motion
} from "framer-motion";


interface Props {

type:string;

}



export default function LoaderAnimation({

type

}:Props){



switch(type){


case "standard-spinner":

return (

<motion.div

className="
h-16
w-16
rounded-full
border-4
border-white/20
border-t-[#00D2FF]
"

animate={{
rotate:360
}}

transition={{
duration:1,
repeat:Infinity,
ease:"linear"
}}

/>

);



case "pulse-dot":

return (

<motion.div

className="
h-10
w-10
rounded-full
bg-[#00D2FF]
"

animate={{

scale:[
1,
1.4,
1
],

opacity:[
0.5,
1,
0.5

]

}}

transition={{

duration:1.2,

repeat:Infinity

}}

/>

);



case "three-dots":

return (

<div className="
flex
gap-2
">

{
[1,2,3].map(i=>(

<motion.div

key={i}

className="
h-3
w-3
rounded-full
bg-[#00D2FF]
"

animate={{

y:[
0,
-10,
0

]

}}

transition={{

duration:.8,

repeat:Infinity,

delay:i*.15

}}

/>

))
}

</div>

);



default:

return (

<motion.div

className="
h-12
w-12
rounded-full
border-4
border-[#00D2FF]/30
border-t-[#00D2FF]
"

animate={{
rotate:360
}}

transition={{
duration:1,
repeat:Infinity,
ease:"linear"
}}

/>

);


}


}
