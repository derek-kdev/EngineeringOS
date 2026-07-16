"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  Edit3,
  Save,
  X,
  Clock,
  Globe,
} from "lucide-react";

import {
  getCurrentUser,
  updateCurrentUser,
} from "@/lib/api/users";

import { useAuth } from "@/hooks/useAuth";

import Toast from "@/components/ui/Toast";



interface UserProfile {

  id: string;

  email: string;

  firstName: string;

  lastName: string;

  role: string;

  avatarUrl?: string | null;

  timezone: string;

  locale: string;

  emailVerifiedAt?: string | null;

  lastLoginAt?: string | null;

  createdAt: string;

}





export default function ProfileSection() {


  const {
    setUser: updateAuthUser,
  } = useAuth();



  const [user, setUser] =
    useState<UserProfile | null>(null);



  const [loading, setLoading] =
    useState(true);



  const [saving, setSaving] =
    useState(false);



  const [editing, setEditing] =
    useState(false);



  const [error, setError] =
    useState("");



  const [toast, setToast] =
    useState({

      show:false,

      message:"",

      type:"success" as "success" | "error",

    });





  const [form, setForm] =
    useState({

      firstName:"",

      lastName:"",

      timezone:"",

      locale:"",

    });








  useEffect(()=>{


    async function loadProfile(){


      try {


        const data =
          await getCurrentUser();



        setUser(data);



        setForm({

          firstName:
            data.firstName || "",


          lastName:
            data.lastName || "",


          timezone:
            data.timezone || "",


          locale:
            data.locale || "",

        });



      } catch(error){


        console.error(
          "Failed loading profile",
          error
        );


      }
      finally {


        setLoading(false);


      }


    }



    loadProfile();



  }, []);








  function updateField(
    field:string,
    value:string
  ){


    setForm(previous => ({

      ...previous,

      [field]:value,

    }));


  }








  async function saveProfile(){


    try {


      setSaving(true);

      setError("");



      const updated =
        await updateCurrentUser({

          firstName:
            form.firstName,


          lastName:
            form.lastName,


          timezone:
            form.timezone,


          locale:
            form.locale,

        });





      setUser(updated);



      updateAuthUser(updated);



      setEditing(false);





      setToast({

        show:true,

        message:
          "Profile updated successfully",

        type:"success",

      });





      setTimeout(()=>{

        setToast(previous => ({

          ...previous,

          show:false,

        }));

      },3000);





    } catch(error){


      console.error(
        "Profile update failed",
        error
      );



      setError(
        "Unable to update profile"
      );



      setToast({

        show:true,

        message:
          "Unable to update profile",

        type:"error",

      });



    }
    finally {


      setSaving(false);


    }


  }








  if(loading){


    return (

      <div className="text-sm text-white/40">

        Loading profile...

      </div>

    );

  }







  if(!user){


    return (

      <div className="text-sm text-red-400">

        Unable to load profile.

      </div>

    );

  }








  return (

    <div className="space-y-5">



      <Toast

        message={toast.message}

        type={toast.type}

        show={toast.show}

        onClose={()=>


          setToast(previous=>({

            ...previous,

            show:false,

          }))


        }

      />







      {/* PROFILE HEADER */}


      <div
        className="
          flex
          items-center
          justify-between
        "
      >


        <div
          className="
            flex
            items-center
            gap-4
          "
        >


          <div
            className="
              h-16
              w-16
              rounded-full
              bg-gradient-to-br
              from-[#FF6B00]
              to-[#FFB300]
              flex
              items-center
              justify-center
              text-xl
              font-bold
              text-black
            "
          >

            {
              user.firstName
              ?.charAt(0)
              .toUpperCase()
            }


          </div>




          <div>


            <h2 className="font-semibold">

              {user.firstName} {user.lastName}

            </h2>



            <p className="
              text-sm
              text-white/40
            ">

              {user.email}

            </p>



          </div>



        </div>






        <button

          onClick={() =>
            setEditing(previous=>!previous)
          }

          className="
            rounded-lg
            bg-white/5
            p-2
            hover:bg-white/10
          "

        >

          {
            editing
            ?
            <X size={17}/>
            :
            <Edit3 size={17}/>
          }


        </button>



      </div>








      {
        editing && (

          <div
            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              space-y-3
            "
          >


            <Input

              label="First Name"

              value={form.firstName}

              onChange={(value)=>
                updateField(
                  "firstName",
                  value
                )
              }

            />



            <Input

              label="Last Name"

              value={form.lastName}

              onChange={(value)=>
                updateField(
                  "lastName",
                  value
                )
              }

            />



            <Input

              label="Timezone"

              value={form.timezone}

              onChange={(value)=>
                updateField(
                  "timezone",
                  value
                )
              }

            />



            <Input

              label="Locale"

              value={form.locale}

              onChange={(value)=>
                updateField(
                  "locale",
                  value
                )
              }

            />





            <button

              disabled={saving}

              onClick={saveProfile}

              className="
                flex
                items-center
                justify-center
                gap-2
                w-full
                rounded-xl
                bg-[#00D2FF]/20
                py-2
                text-sm
                text-[#00D2FF]
                disabled:opacity-50
              "

            >

              <Save size={16}/>


              {
                saving
                ?
                "Saving..."
                :
                "Save Changes"
              }


            </button>



          </div>

        )

      }








      {
        !editing && (

          <div className="space-y-4">


            <InfoRow

              icon={<Shield size={17}/>}

              label="Role"

              value={user.role}

            />



            <InfoRow

              icon={<Clock size={17}/>}

              label="Timezone"

              value={user.timezone}

            />



            <InfoRow

              icon={<Globe size={17}/>}

              label="Locale"

              value={user.locale}

            />



            <InfoRow

              icon={<Mail size={17}/>}

              label="Email Verification"

              value={
                user.emailVerifiedAt
                ?
                "Verified"
                :
                "Not verified"
              }

              status={
                !!user.emailVerifiedAt
              }

            />



            <InfoRow

              icon={<Calendar size={17}/>}

              label="Joined"

              value={
                new Date(
                  user.createdAt
                ).toLocaleDateString()
              }

            />



          </div>

        )

      }



    </div>

  );

}







function Input({

label,

value,

onChange,

}:{

label:string;

value:string;

onChange:(value:string)=>void;

}){


return (

<div>


<p className="
text-xs
text-white/40
mb-1
">

{label}

</p>



<input

value={value}

onChange={(event)=>
  onChange(event.target.value)
}

className="
w-full
rounded-lg
bg-black/20
border
border-white/10
px-3
py-2
text-sm
outline-none
focus:border-[#00D2FF]/50
"

/>


</div>

);

}








function InfoRow({

icon,

label,

value,

status,

}:{

icon:React.ReactNode;

label:string;

value:string;

status?:boolean;

}){


return (

<div
className="
flex
items-center
gap-3
"
>


<div className="text-[#00D2FF]">

{icon}

</div>



<div className="flex-1">

<p className="
text-xs
text-white/40
">

{label}

</p>



<p className="text-sm">

{value}

</p>


</div>





{
status !== undefined &&

(
status

?

<CheckCircle
size={16}
className="text-green-400"
/>

:

<XCircle
size={16}
className="text-red-400"
/>

)

}



</div>

);

}