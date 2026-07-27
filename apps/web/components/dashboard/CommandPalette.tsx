"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  X,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  globalSearch,
  SearchResult,
} from "@/services/search/search.service";



interface CommandPaletteProps {

  open:boolean;

  onClose:()=>void;

}



export default function CommandPalette({

  open,

  onClose,

}:CommandPaletteProps){


const router = useRouter();


const [
  query,
  setQuery
] = useState("");



const [
  results,
  setResults
] = useState<SearchResult[]>([]);



const [
  loading,
  setLoading
] = useState(false);





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







useEffect(()=>{


if(!query.trim()){

setResults([]);

return;

}



const timer =
setTimeout(async()=>{


try{


setLoading(true);


const data =
await globalSearch(query);


setResults(
data.results
);


}
catch(error){


console.error(
"Search failed",
error
);


setResults([]);


}
finally{

setLoading(false);

}


},400);



return()=>clearTimeout(timer);


},[
query
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
Search EngineeringOS...
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
max-h-96
overflow-y-auto
"

>


{
loading
?

<div className="
px-4
py-8
text-center
text-sm
text-white/40
">

Searching...

</div>


:


results.length===0 && query

?

<div className="
px-4
py-8
text-center
text-sm
text-white/40
">

No results found

</div>


:


results.map(
(item)=>(


<button

key={item.id}

onClick={()=>{


if(item.href){

router.push(item.href);

}


onClose();


}}

className="
w-full
flex
items-start
gap-4
rounded-xl
px-4
py-3
text-left
hover:bg-white/5
transition
"

>


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


<span className="
text-[10px]
uppercase
tracking-wider
text-[#00D2FF]
">

{item.category}

</span>


</div>


</button>


)

)


}



</div>


</div>


</div>

);


}
