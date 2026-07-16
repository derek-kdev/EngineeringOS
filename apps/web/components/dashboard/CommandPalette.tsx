"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  User,
  Settings,
  LayoutDashboard,
  X,
  ArrowRight,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";



interface CommandItem {

  title:string;

  description:string;

  icon:React.ReactNode;

  action:()=>void;

}





interface CommandPaletteProps {

  open:boolean;

  onClose:()=>void;

}





export default function CommandPalette({

  open,

  onClose,

}:CommandPaletteProps){



const router =
useRouter();



const [query,setQuery] =
useState("");







const commands:CommandItem[] = [


{

title:"Dashboard",

description:"Open workspace dashboard",

icon:
<LayoutDashboard size={18}/>,

action(){

router.push("/dashboard");

onClose();

}

},



{

title:"Profile",

description:"Manage your account profile",

icon:
<User size={18}/>,

action(){

router.push("/dashboard/profile");

onClose();

}

},



{

title:"Settings",

description:"Open workspace settings",

icon:
<Settings size={18}/>,

action(){

router.push("/dashboard/settings");

onClose();

}

},


];







const filtered =
commands.filter((item)=>

item.title
.toLowerCase()
.includes(
query.toLowerCase()
)

);








useEffect(()=>{


function keyboard(
event:KeyboardEvent
){


if(event.key==="Escape"){

onClose();

}


}



window.addEventListener(
"keydown",
keyboard
);


return()=>{

window.removeEventListener(
"keydown",
keyboard
);

};


},[
onClose
]);










if(!open){

return null;

}






return (

<div

className="
fixed
inset-0
z-50
flex
items-start
justify-center
pt-32
bg-black/60
backdrop-blur-sm
"

onClick={onClose}

>



<div

className="
w-full
max-w-xl
rounded-2xl
border
border-white/10
bg-[#0B132B]
shadow-2xl
overflow-hidden
"

onClick={
(e)=>e.stopPropagation()
}

>





<div

className="
flex
items-center
gap-3
border-b
border-white/10
px-5
py-4
"

>


<Search
size={20}
className="text-[#00D2FF]"
/>


<input

autoFocus

value={query}

onChange={
(e)=>
setQuery(
e.target.value
)
}

placeholder="
Search commands...
"

className="
flex-1
bg-transparent
outline-none
text-sm
"

/>




<button
onClick={onClose}
>

<X size={18}/>

</button>



</div>









<div
className="
p-3
space-y-2
"
>



{
filtered.length===0
?

<div
className="
px-4
py-8
text-center
text-sm
text-white/40
"
>

No commands found

</div>


:


filtered.map(
(item)=>(


<button

key={item.title}

onClick={
item.action
}

className="
w-full
flex
items-center
gap-4
rounded-xl
px-4
py-3
text-left
hover:bg-white/5
transition
"

>


<div
className="
text-[#00D2FF]
"
>

{item.icon}

</div>




<div className="flex-1">


<p className="text-sm">

{item.title}

</p>


<p className="
text-xs
text-white/40
">

{item.description}

</p>


</div>



<ArrowRight
size={16}
className="
text-white/30
"
/>



</button>


)

)

}



</div>



</div>



</div>

);


}