"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  NAV_GROUPS,
} from "@/constants/dashboard/navigation";

import {
  isAdminRole,
} from "@/constants/dashboard/roles";

import {
  useAuth,
} from "@/hooks/useAuth";

import UserPanel from "@/components/dashboard/panels/UserPanel";

import NotificationPanel from "@/components/dashboard/panels/NotificationPanel";

import CommandPalette from "@/components/dashboard/CommandPalette";



interface NavItem {

  name:string;

  href:string;

  icon:React.ReactNode;

}



interface NavGroup {

  name:string;

  items:NavItem[];

}





interface DashboardTopbarProps {

  onOpenPanel?: (

    panel:
      | "profile"
      | "preferences"
      | "security"
      | "workspace"

  ) => void;

}





export default function DashboardTopbar({

  onOpenPanel,

}: DashboardTopbarProps) {



  const {
    user,
  } = useAuth();





  const [
    showUser,
    setShowUser
  ] = useState(false);





  const [
    showNotifications,
    setShowNotifications
  ] = useState(false);





  const [
    showCommand,
    setShowCommand
  ] = useState(false);





  const [
    openMenu,
    setOpenMenu
  ] = useState<string | null>(null);





  const closeTimer =
    useRef<NodeJS.Timeout | null>(null);







  function handleOpenMenu(
    name:string
  ){

    if(closeTimer.current){

      clearTimeout(closeTimer.current);

    }


    setOpenMenu(name);

  }







  function handleCloseMenu(){

    closeTimer.current =
      setTimeout(()=>{

        setOpenMenu(null);

      },450);

  }







  function cancelClose(){

    if(closeTimer.current){

      clearTimeout(closeTimer.current);

    }

  }









  useEffect(()=>{


    function shortcut(
      event:KeyboardEvent
    ){

      if(

        (event.metaKey || event.ctrlKey)

        &&

        event.key.toLowerCase()==="k"

      ){

        event.preventDefault();

        setShowCommand(true);

      }

    }



    window.addEventListener(
      "keydown",
      shortcut
    );



    return()=>{

      window.removeEventListener(
        "keydown",
        shortcut
      );

    };


  },[]);









  const filteredGroups =
    NAV_GROUPS
      .map((group):NavGroup | null => {

        if(group.name !== "Administration"){

          return group as NavGroup;

        }



        const allowed =
          isAdminRole(
            user?.role
          );



        if(allowed){

          return group as NavGroup;

        }



        return null;


      })
      .filter(
        (group): group is NavGroup =>
          group !== null
      );









  return (

    <>


<header

className="
sticky
top-0
left-0
right-0
z-50
h-9
border-b
border-white/10
bg-[#0B132B]/90
backdrop-blur-xl
flex
items-center
justify-between
px-3
text-white
"

>

<Link

href="/dashboard"

className="
flex
items-center
gap-2
text-xs
font-semibold
hover:opacity-80
transition
"

>


<div

className="
h-5
w-5
rounded
overflow-hidden
flex
items-center
justify-center
"

>


<Image

src="/img/our_logo.jpg"

alt="EngineeringOS Logo"

width={20}

height={20}

className="
h-full
w-full
object-cover
"

/>


</div>



EngineeringOS


</Link>



<nav

className="
flex
items-center
gap-5
text-xs
"

>


{

filteredGroups.map((group:NavGroup)=>(


<div

key={group.name}

className="
relative
"

onMouseEnter={()=>handleOpenMenu(group.name)}

onMouseLeave={handleCloseMenu}

>


<button

className="
px-4
py-1.5
rounded-md
text-white/70
hover:bg-white/10
hover:text-white
transition
"

>

{group.name}

</button>





{

openMenu === group.name && (


<div

onMouseEnter={cancelClose}

onMouseLeave={handleCloseMenu}

className="
absolute
top-full
left-0
mt-2
min-w-56
rounded-xl
border
border-white/10
bg-[#111827]
shadow-2xl
p-2
"

>


{

group.items.map((item:NavItem)=>(


<Link

key={item.href}

href={item.href}

className="
flex
items-center
gap-3
rounded-lg
px-4
py-3
text-xs
text-white/70
hover:bg-white/10
hover:text-white
"

>


{item.icon}


<span>

{item.name}

</span>


</Link>


))

}



</div>


)


}



</div>


))


}


</nav>







<div

className="
flex
items-center
gap-3
"

>


<button

onClick={()=>setShowCommand(true)}

className="
flex
items-center
gap-2
rounded
border
border-white/10
px-2
py-1
text-xs
text-white/50
"

>

<Search size={12}/>

Search

</button>







<button

onClick={()=>setShowNotifications(!showNotifications)}

>

<Bell size={15}/>

</button>







<button

onClick={()=>setShowUser(!showUser)}

className="
flex
items-center
gap-1
"

>


<div

className="
h-5
w-5
rounded-full
overflow-hidden
flex
items-center
justify-center
bg-gradient-to-br
from-[#00D2FF]
to-[#FF6B00]
text-black
text-[10px]
font-bold
"

>


{

user?.avatarUrl ? (

<Image

src={user.avatarUrl}

alt="User avatar"

width={20}

height={20}

className="
h-full
w-full
object-cover
"

/>

)

:

(

user?.firstName?.charAt(0)

||

"E"

)

}


</div>





<ChevronDown size={12}/>


</button>



</div>


</header>







{

showUser &&

<UserPanel

open={showUser}

onClose={()=>setShowUser(false)}

/>

}





{

showNotifications &&

<NotificationPanel

open={showNotifications}

onClose={()=>setShowNotifications(false)}

/>

}





{

showCommand &&

<CommandPalette

open={showCommand}

onClose={()=>setShowCommand(false)}

/>

}



</>


);


}
