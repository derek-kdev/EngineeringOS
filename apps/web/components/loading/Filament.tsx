"use client";

import {
  motion,
} from "framer-motion";



export default function Filament(){


  const paths = Array.from(
    { length: 14 },
    (_,index)=>index
  );



  return (

    <svg

      viewBox="0 0 400 400"

      className="
        absolute
        h-full
        w-full
      "

      fill="none"

    >



      <defs>


        <filter id="glow">


          <feGaussianBlur

            stdDeviation="4"

            result="blur"

          />


          <feMerge>

            <feMergeNode in="blur"/>

            <feMergeNode in="SourceGraphic"/>

          </feMerge>


        </filter>


        <linearGradient

          id="energy"

          x1="0"

          y1="0"

          x2="1"

          y2="1"

        >

          <stop

            offset="0%"

            stopColor="#00D2FF"

          />

          <stop

            offset="50%"

            stopColor="#ffffff"

          />

          <stop

            offset="100%"

            stopColor="#FF6B00"

          />

        </linearGradient>


      </defs>





      {

        paths.map((item)=>(


          <motion.path

            key={item}

            d={`
              M200 200
              C ${80-item*3} ${120-item*2},
                ${120+item*8} ${280-item*4},
                200 200

              C ${280+item*3} ${120+item*2},
                ${280-item*8} ${280+item*4},
                200 200
            `}


            stroke="url(#energy)"

            strokeWidth={
              1.2 + item * 0.04
            }


            opacity={
              0.15 +
              item * 0.04
            }


            filter="url(#glow)"


            animate={{

              rotate:[
                0,
                360
              ],

              scale:[
                0.8,
                1.05,
                0.8
              ],


              opacity:[
                0.2,
                0.8,
                0.2
              ]

            }}


            transition={{

              rotate:{

                duration:
                  10 + item * 0.3,

                repeat:Infinity,

                ease:"linear"

              },


              scale:{

                duration:
                  4 + item * 0.2,

                repeat:Infinity,

                ease:"easeInOut"

              },


              opacity:{

                duration:
                  3 + item * 0.1,

                repeat:Infinity,

                ease:"easeInOut"

              }


            }}


            style={{

              transformOrigin:
                "200px 200px"

            }}


          />


        ))

      }



    </svg>


  );


}