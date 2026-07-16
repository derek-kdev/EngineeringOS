"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  Bell,
  Shield,
  User,
  AlertTriangle,
  CheckCircle,
  X,
  ExternalLink,
} from "lucide-react";


import {
  Notification,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/api/notifications";




interface NotificationPanelProps {

  open:boolean;

  onClose:()=>void;

}





export default function NotificationPanel({

  open,

  onClose,

}:NotificationPanelProps){



  const [
    notifications,
    setNotifications,
  ] =
  useState<Notification[]>([]);



  const [
    loading,
    setLoading,
  ] =
  useState(true);







  useEffect(()=>{


    if(!open)
      return;



    async function load(){


      try{


        const data =
          await getNotifications();


        setNotifications(data);


      }
      finally{


        setLoading(false);


      }


    }



    load();


  },[open]);









  async function handleRead(
    id:string
  ){


    await markNotificationRead(id);



    setNotifications(
      previous=>

        previous.map(
          item=>

            item.id===id

            ?

            {
              ...item,
              read:true,
            }

            :

            item

        )

    );


  }








  async function handleReadAll(){


    await markAllNotificationsRead();



    setNotifications(
      previous=>

        previous.map(
          item=>(
            {
              ...item,
              read:true,
            }
          )
        )

    );


  }








  function getIcon(
    type:Notification["type"]
  ){


    switch(type){


      case "SECURITY":

        return (
          <Shield size={18}/>
        );



      case "ACCOUNT":

        return (
          <User size={18}/>
        );



      case "ALERT":

        return (
          <AlertTriangle size={18}/>
        );



      default:

        return (
          <Bell size={18}/>
        );


    }


  }









  if(!open){

    return null;

  }









  const unread =
    notifications.filter(
      item=>!item.read
    ).length;








  return (

    <div

      className="
        fixed
        right-6
        top-20
        z-50
        w-[380px]
        rounded-2xl
        border
        border-white/10
        bg-[#0B132B]/95
        backdrop-blur-xl
        shadow-2xl
        overflow-hidden
      "

    >







      {/* HEADER */}

      <div

        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          px-5
          py-4
        "

      >


        <div className="flex items-center gap-3">


          <Bell
            size={20}
            className="text-[#00D2FF]"
          />


          <div>


            <h3 className="text-sm font-semibold">

              Notifications

            </h3>



            <p className="
              text-xs
              text-white/40
            ">

              {unread} unread

            </p>


          </div>


        </div>





        <button

          onClick={onClose}

          className="
            text-white/50
            hover:text-white
          "

        >

          <X size={18}/>

        </button>


      </div>









      {/* ACTION */}

      {
        unread > 0 && (

          <button

            onClick={handleReadAll}

            className="
              mx-5
              mt-3
              text-xs
              text-[#00D2FF]
              hover:underline
            "

          >

            Mark all as read

          </button>

        )

      }









      {/* CONTENT */}

      <div

        className="
          max-h-[420px]
          overflow-y-auto
          p-3
          space-y-2
        "

      >



      {
        loading

        ?

        <p className="
          p-4
          text-sm
          text-white/40
        ">

          Loading notifications...

        </p>


        :



        notifications.length===0


        ?

        <div

          className="
            p-8
            text-center
            text-sm
            text-white/40
          "

        >

          No notifications

        </div>


        :



        notifications.map(
          notification=>(


            <button

              key={notification.id}

              onClick={()=>
                handleRead(
                  notification.id
                )
              }

              className={`
                w-full
                flex
                gap-3
                rounded-xl
                p-3
                text-left
                transition
                ${
                  notification.read
                  ?
                  "bg-white/[0.02]"
                  :
                  "bg-white/[0.07]"
                }
                hover:bg-white/10
              `}

            >



              <div

                className="
                  mt-1
                  text-[#00D2FF]
                "

              >

                {getIcon(notification.type)}

              </div>





              <div className="flex-1">


                <div className="
                  flex
                  items-center
                  justify-between
                  gap-2
                ">


                  <p className="text-sm font-medium">

                    {notification.title}

                  </p>



                  {
                    !notification.read && (

                      <span

                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-[#FF6B00]
                        "

                      />

                    )
                  }


                </div>





                <p className="
                  mt-1
                  text-xs
                  text-white/50
                ">

                  {notification.message}

                </p>






                {
                  notification.actionUrl && (

                    <ExternalLink

                      size={13}

                      className="
                        mt-2
                        text-white/30
                      "

                    />

                  )
                }



              </div>





            </button>


          )

        )

      }



      </div>






      <div

        className="
          border-t
          border-white/10
          px-5
          py-3
        "

      >

        <button

          className="
            flex
            items-center
            gap-2
            text-xs
            text-white/50
            hover:text-white
          "

        >

          <CheckCircle size={14}/>

          View notification history

        </button>


      </div>





    </div>

  );

}