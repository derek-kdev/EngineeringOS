"use client";

import { useState } from "react";

import {
  ChevronRight,
  ChevronDown,
  Box,
  Boxes,
  Settings,
  CircleDot,
  GitBranch,
  Package,
  X,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";



type TreeNode = {

  name:string;

  icon:LucideIcon;

  children?:TreeNode[];

};





const TREE:TreeNode[] = [

  {

    name:"Mars Rover Assembly",

    icon:Boxes,

    children:[

      {

        name:"Base Structure",

        icon:Box,

        children:[

          {

            name:"Base Plate",

            icon:Package,

          },

          {

            name:"Mounting Holes",

            icon:CircleDot,

          },

        ],

      },


      {

        name:"Shoulder Joint",

        icon:Settings,

        children:[

          {

            name:"Revolute Constraint",

            icon:GitBranch,

          },

          {

            name:"Cylindrical Constraint",

            icon:GitBranch,

          },

        ],

      },


      {

        name:"Upper Arm",

        icon:Box,

      },


      {

        name:"Forearm",

        icon:Box,

      },


    ],

  },

];







interface AssemblyTreeProps {

  onClose?:()=>void;

}







export default function AssemblyTree({

  onClose,

}:AssemblyTreeProps){


  return (

    <div

      className="
      flex
      flex-col
      h-full
      w-full
      bg-[#0B132B]/80
      backdrop-blur-2xl
      border
      border-white/10
      rounded-2xl
      overflow-hidden
      shadow-2xl
      "

    >


      <div

        className="
        flex
        items-center
        justify-between
        h-10
        px-3
        border-b
        border-white/10
        "

      >


        <span className="text-sm font-semibold text-white">

          Assembly Tree

        </span>



        {

          onClose && (

            <button

              onClick={onClose}

              className="
              p-1
              rounded
              text-white/60
              hover:text-white
              hover:bg-white/10
              transition
              "

            >

              <X size={16}/>

            </button>

          )

        }


      </div>





      <div

        className="
        flex-1
        overflow-y-auto
        p-2
        space-y-0.5
        "

      >

        {

          TREE.map((node)=>(

            <TreeItem

              key={node.name}

              node={node}

              level={0}

            />

          ))

        }


      </div>


    </div>

  );

}









function TreeItem({

  node,

  level,

}:{

  node:TreeNode;

  level:number;

}){


  const [
    open,
    setOpen
  ] = useState(true);



  const Icon =
    node.icon;



  return (

    <div>


      <button

        onClick={()=>{

          if(node.children){

            setOpen(!open);

          }

        }}

        className={`
          w-full
          flex
          items-center
          gap-2
          rounded-lg
          px-2
          py-1.5
          text-sm
          text-white
          hover:bg-white/5
          transition
          ${level > 0 ? "ml-4" : ""}
        `}

        style={{

          paddingLeft:
            level * 16 + 8,

        }}

      >


        {

          node.children && (

            <span className="text-white/40">

              {

                open

                ?

                <ChevronDown size={12}/>

                :

                <ChevronRight size={12}/>

              }

            </span>

          )

        }



        <Icon

          size={14}

          className="text-white/60"

        />



        <span className="truncate">

          {node.name}

        </span>



      </button>






      {

        node.children && open && (

          <div>

            {

              node.children.map((child)=>(


                <TreeItem

                  key={child.name}

                  node={child}

                  level={level + 1}

                />


              ))

            }

          </div>

        )

      }


    </div>

  );

}
