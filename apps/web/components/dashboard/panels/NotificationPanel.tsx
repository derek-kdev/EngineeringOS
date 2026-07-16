"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  Bell,
  Check,
  X,
  Clock,
  Shield,
  Info,
} from "lucide-react";


import {
  getNotifications,
  markNotificationRead,
  dismissNotification,
  Notification,
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
  useState(false);







  /*
  |--------------------------------------------------------------------------
  | Load Notifications
  |--------------------------------------------------------------------------
  */


  useEffect(()=>{


    if(!open)
      return;



    async function loadNotifications(){


      try{


        setLoading(true);



        const data =
          await getNotifications();



        setNotifications(data);



      }
      catch(error){


        console.error(
          "Failed loading notifications",
          error
        );


      }
      finally{


        setLoading(false);


      }


    }



    loadNotifications();



  },[open]);









  async function handleRead(
    id:string
  ){


    try{


      await markNotificationRead(id);



      setNotifications(
        previous=>

          previous.map(
            item=>

              item.id===id

              ?

              {
                ...item,
                readAt:new Date().toISOString(),
              }

              :

              item

          )

      );


    }
    catch(error){


      console.error(
        "Failed marking notification read",
        error
      );


    }


  }









  async function handleDismiss(
    id:string
  ){


    try{


      await dismissNotification(id);



      setNotifications(
        previous=>

          previous.filter(
            item=>
              item.id!==id
          )

      );



    }
    catch(error){


      console.error(
        "Failed dismissing notification",
        error
      );


    }


  }









  function getIcon(
    type:string
  ){


    switch(type){


      case "SECURITY":

        return (
          <Shield
            size={18}
          />
        );


      case "SYSTEM":

        return (
          <Info
            size={18}
          />
        );


      default:

        return (
          <Bell
            size={18}
          />
        );


    }


  }










  if(!open)
    return null;








  return (

    <div

      className="
        fixed
        right-24
        top-20
        z-50
        w-[380px]
        rounded-2xl
        border
        border-white/10
        bg-[#0B132B]/95
        backdrop-blur-xl
        shadow-2xl
        text-white
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


        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Bell
            size={18}
            className="text-[#00D2FF]"
          />

          <h3
            className="
              font-semibold
              text-sm
            "
          >

            Notifications

          </h3>


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









      {/* BODY */}


      <div

        className="
          max-h-[420px]
          overflow-y-auto
        "

      >



        {
          loading && (

            <div
              className="
                p-5
                text-sm
                text-white/50
              "
            >

              Loading notifications...

            </div>

          )
        }







        {
          !loading &&
          notifications.length===0 && (

            <div

              className="
                flex
                flex-col
                items-center
                justify-center
                gap-3
                p-10
                text-center
              "

            >

              <Bell
                size={28}
                className="text-white/30"
              />


              <p
                className="
                  text-sm
                  text-white/40
                "
              >

                No notifications yet.

              </p>


            </div>


          )
        }









        {
          notifications.map(
            notification=>(


              <div

                key={notification.id}

                className={`

                  border-b

                  border-white/5

                  px-5

                  py-4

                  transition

                  ${
                    notification.readAt
                    ?
                    "opacity-60"
                    :
                    "bg-white/[0.03]"
                  }

                `}

              >





                <div
                  className="
                    flex
                    gap-3
                  "
                >



                  <div

                    className="
                      mt-1
                      text-[#00D2FF]
                    "

                  >

                    {
                      getIcon(
                        notification.type
                      )
                    }


                  </div>







                  <div
                    className="flex-1"
                  >


                    <p
                      className="
                        text-sm
                        font-medium
                      "
                    >

                      {notification.title}

                    </p>



                    <p

                      className="
                        mt-1
                        text-xs
                        text-white/50
                      "

                    >

                      {notification.message}

                    </p>





                    <div

                      className="
                        mt-3
                        flex
                        items-center
                        gap-3
                      "

                    >




                      {
                        !notification.readAt && (

                          <button

                            onClick={() =>
                              handleRead(
                                notification.id
                              )
                            }


                            className="
                              flex
                              items-center
                              gap-1
                              text-xs
                              text-[#00D2FF]
                            "

                          >

                            <Check size={13}/>

                            Mark read

                          </button>

                        )
                      }







                      <button

                        onClick={() =>
                          handleDismiss(
                            notification.id
                          )
                        }


                        className="
                          flex
                          items-center
                          gap-1
                          text-xs
                          text-white/40
                          hover:text-red-400
                        "

                      >

                        <X size={13}/>

                        Dismiss

                      </button>




                    </div>





                  </div>




                </div>






              </div>


            )

          )
        }




      </div>








    </div>


  );


}