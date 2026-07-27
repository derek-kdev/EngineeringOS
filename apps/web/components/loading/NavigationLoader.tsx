"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  EngineeringLoader,
} from "@/components/loading";


export default function NavigationLoader({

  children,

}:{

  children: React.ReactNode;

}) {


const pathname =
usePathname();


const [
loading,
setLoading
] = useState(false);



useEffect(()=>{


setLoading(false);


},[
pathname
]);





useEffect(()=>{


function handleClick(
event:MouseEvent
){


const target =
event.target as HTMLElement;


const link =
target.closest("a");



if(!link)
return;



const href =
link.getAttribute("href");



if(
!href ||
href.startsWith("#") ||
href.startsWith("http") ||
href === pathname
)
return;



setLoading(true);



}



document.addEventListener(
"click",
handleClick
);



return ()=>{

document.removeEventListener(
"click",
handleClick
);

};


},[
pathname
]);






return (

<>

{
loading &&
<EngineeringLoader/>
}


{children}


</>

);


}
