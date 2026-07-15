"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";


interface ToastProps {

  message:string;

  type:"success" | "error";

  show:boolean;

  onClose:()=>void;

}


export default function Toast({
  message,
  type,
  show,
  onClose

}:ToastProps){


return (

<AnimatePresence>

{show && (

<motion.div

initial={{
opacity:0,
y:-30,
scale:.9
}}

animate={{
opacity:1,
y:0,
scale:1
}}

exit={{
opacity:0,
y:-30,
scale:.9
}}

className="
fixed
top-6
right-6
z-50
w-[350px]
rounded-2xl
border
border-white/10
bg-[#0B132B]/90
backdrop-blur-xl
shadow-2xl
p-4
text-white
"

>


<div className="flex items-center gap-3">


{
type==="success"

?

<CheckCircle
className="text-green-400"
/>

:

<AlertCircle
className="text-red-400"
/>

}



<div className="flex-1">

<p className="text-sm">

{message}

</p>

</div>



<button
onClick={onClose}
>

<X size={18}/>

</button>



</div>


</motion.div>

)}


</AnimatePresence>

)

}