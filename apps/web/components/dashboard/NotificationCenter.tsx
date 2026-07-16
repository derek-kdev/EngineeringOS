"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  Bell,
  Check,
  Shield,
  Info,
  X,
  Clock,
} from "lucide-react";


import {
  getNotifications,
  markNotificationRead,
  dismissNotification,
  Notification,
} from "@/lib/api/notifications";







type FilterType =
  | "ALL"
  | "UNREAD"
  | "SECURITY"
  | "SYSTEM";








export default function NotificationCenter(){



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




  const [
    filter,
    setFilter,
  ] =
  useState<FilterType>("ALL");







  /*
  |--------------------------------------------------------------------------
  | Load Notifications
  |--------------------------------------------------------------------------
  */


  useEffect(()=>{


    async function load(){


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



    load();



  },[]);









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
            readAt:
              new Date()
              .toISOString(),
          }

          :

          item

        )

    );


  }









  async function handleDismiss(
    id:string
  ){


    await dismissNotification(id);



    setNotifications(
      previous=>

        previous.filter(
          item=>
            item.id!==id
        )

    );


  }









  function filteredNotifications(){


    switch(filter){


      case "UNREAD":

        return notifications.filter(
          item =>
            !item.readAt
        );



      case "SECURITY":

        return notifications.filter(
          item =>
            item.type==="SECURITY"
        );



      case "SYSTEM":

        return notifications.filter(
          item =>
            item.type==="SYSTEM"
        );



      default:

        return notifications;


    }


  }










  function getIcon(
    type:string
  ){


    if(type==="SECURITY")
      return (
        <Shield
          size={20}
        />
      );


    if(type==="SYSTEM")
      return (
        <Info
          size={20}
        />
      );


    return (
      <Bell
        size={20}
      />
    );


  }









  return (

    <section

      className="
        space-y-6
      "

    >





      {/* HEADER */}


      <div

        className="
          flex
          items-center
          justify-between
        "

      >



        <div>


          <h1
            className="
              text-2xl
              font-bold
            "
          >

            Notifications

          </h1>


          <p
            className="
              mt-1
              text-sm
              text-white/50
            "
          >

            Manage your EngineeringOS activity alerts.

          </p>


        </div>





        <Bell
          size={28}
          className="
            text-[#00D2FF]
          "
        />


      </div>









      {/* FILTERS */}


      <div

        className="
          flex
          gap-3
          flex-wrap
        "

      >


        {
          [
            "ALL",
            "UNREAD",
            "SECURITY",
            "SYSTEM",
          ]
          .map(
            item=>(

              <button

                key={item}

                onClick={() =>
                  setFilter(
                    item as FilterType
                  )
                }


                className={`

                  rounded-lg

                  px-4

                  py-2

                  text-sm

                  border

                  border-white/10


                  ${
                    filter===item
                    ?
                    "bg-[#00D2FF]/20 text-[#00D2FF]"
                    :
                    "bg-white/5 text-white/60"
                  }

                `}

              >

                {item}


              </button>

            )

          )
        }


      </div>









      {/* CONTENT */}



      <div

        className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          overflow-hidden
        "

      >




        {
          loading && (

            <div
              className="
                p-8
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
          filteredNotifications().length===0 && (


            <div

              className="
                flex
                flex-col
                items-center
                justify-center
                gap-3
                p-12
                text-white/40
              "

            >

              <Bell
                size={32}
              />

              <p>

                No notifications available.

              </p>


            </div>


          )
        }









        {
          filteredNotifications()
          .map(
            notification=>(


              <div

                key={notification.id}

                className={`

                  flex

                  gap-4

                  border-b

                  border-white/10

                  p-5


                  ${
                    notification.readAt
                    ?
                    "opacity-60"
                    :
                    ""
                  }

                `}

              >





                <div
                  className="
                    text-[#00D2FF]
                    mt-1
                  "
                >

                  {
                    getIcon(
                      notification.type
                    )
                  }


                </div>








                <div
                  className="
                    flex-1
                  "
                >


                  <h3
                    className="
                      text-sm
                      font-semibold
                    "
                  >

                    {notification.title}

                  </h3>




                  <p

                    className="
                      mt-1
                      text-sm
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
                      gap-4
                    "

                  >



                    <span

                      className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        text-white/40
                      "

                    >

                      <Clock size={12}/>

                      {
                        new Date(
                          notification.createdAt
                        )
                        .toLocaleDateString()
                      }


                    </span>








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

                      Remove

                    </button>




                  </div>




                </div>





              </div>


            )

          )
        }



      </div>




    </section>


  );

}