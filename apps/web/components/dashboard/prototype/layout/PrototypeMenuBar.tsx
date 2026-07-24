"use client";


const MENUS = [

  {
    name:"File",
    items:[
      "New Prototype",
      "Open",
      "Save",
      "Save As",
      "Export",
      "Import CAD"
    ]
  },


  {
    name:"Edit",
    items:[
      "Undo",
      "Redo",
      "Cut",
      "Copy",
      "Paste",
      "Delete"
    ]
  },


  {
    name:"View",
    items:[
      "Solid",
      "Wireframe",
      "Thermal",
      "Stress",
      "Grid",
      "Axis",
      "Reset Camera"
    ]
  },


  {
    name:"Insert",
    items:[
      "Add Part",
      "Add Sub Assembly",
      "Add Constraint"
    ]
  },


  {
    name:"Tools",
    items:[
      "Measure",
      "Mass Properties",
      "Interference Check",
      "AI Optimise",
      "Simulation"
    ]
  },


  {
    name:"Window",
    items:[
      "Assembly Tree",
      "Specification Panel",
      "Reset Layout"
    ]
  },


  {
    name:"Help",
    items:[
      "Documentation",
      "Keyboard Shortcuts",
      "About EngineeringOS"
    ]
  }

];



export default function PrototypeMenuBar(){


return (

<div

className="
h-9
flex
items-center
gap-1
px-3
bg-[#111111]
border-b
border-white/10
text-xs
"

>


{
MENUS.map(menu=>(

<div

key={menu.name}

className="
relative
group
"

>


<button

className="
px-3
py-1
rounded
text-white/70
hover:bg-white/10
hover:text-white
transition
"

>

{menu.name}

</button>





<div

className="
absolute
top-full
left-0
hidden
group-hover:block
z-50
min-w-44
bg-[#171717]
border
border-white/10
rounded-lg
shadow-xl
p-1
"

>


{
menu.items.map(item=>(

<button

key={item}

className="
block
w-full
text-left
px-3
py-2
rounded
text-white/70
hover:bg-cyan-500/10
hover:text-white
transition
"

>

{item}

</button>

))

}


</div>



</div>

))

}


</div>

);


}
