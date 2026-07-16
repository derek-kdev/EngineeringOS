"use client";

import {
  Palette,
  Globe,
  Clock,
  Bell,
  Save,
} from "lucide-react";

import {
  useState,
} from "react";





export default function PreferencesSection() {



  const [theme,setTheme] =
    useState("System");


  const [language,setLanguage] =
    useState("English");


  const [timezone,setTimezone] =
    useState("UTC");



  const [notifications,setNotifications] =
    useState(true);





  function handleSave(){


    /*
      Future:
      Connect this to:
      PATCH /users/preferences
    */


    console.log({

      theme,

      language,

      timezone,

      notifications,

    });


  }







  return (

    <div
      className="
        space-y-6
      "
    >




      <div>

        <h2
          className="
            font-semibold
          "
        >

          Preferences

        </h2>


        <p
          className="
            text-xs
            text-white/40
            mt-1
          "
        >

          Manage your workspace experience.

        </p>


      </div>








      {/* Appearance */}

      <PreferenceCard

        title="Appearance"

      >


        <PreferenceSelect

          icon={<Palette size={18}/>}

          label="Theme"

          value={theme}

          options={[
            "System",
            "Light",
            "Dark",
          ]}

          onChange={setTheme}

        />


      </PreferenceCard>










      {/* Regional */}

      <PreferenceCard

        title="Regional Settings"

      >


        <PreferenceSelect

          icon={<Globe size={18}/>}

          label="Language"

          value={language}

          options={[
            "English",
          ]}

          onChange={setLanguage}

        />





        <PreferenceSelect

          icon={<Clock size={18}/>}

          label="Timezone"

          value={timezone}

          options={[
            "UTC",
            "GMT",
            "Africa/Accra",
          ]}

          onChange={setTimezone}

        />


      </PreferenceCard>










      {/* Notifications */}

      <PreferenceCard

        title="Notifications"

      >


        <button

          onClick={() =>
            setNotifications(
              !notifications
            )
          }

          className="
            flex
            items-center
            justify-between
            w-full
          "

        >


          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                text-[#00D2FF]
              "
            >

              <Bell size={18}/>

            </div>


            <div
              className="
                text-left
              "
            >

              <p
                className="
                  text-xs
                  text-white/40
                "
              >

                Notifications

              </p>


              <p
                className="
                  text-sm
                "
              >

                Email and project updates

              </p>


            </div>


          </div>





          <div

            className={`
              h-5
              w-10
              rounded-full
              p-1
              transition

              ${
                notifications

                ?

                "bg-[#00D2FF]"

                :

                "bg-white/20"
              }
            `}

          >

            <div

              className={`
                h-3
                w-3
                rounded-full
                bg-white
                transition

                ${
                  notifications
                  ?
                  "translate-x-5"
                  :
                  "translate-x-0"
                }
              `}

            />


          </div>


        </button>



      </PreferenceCard>










      {/* SAVE */}

      <button

        onClick={handleSave}

        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-[#00D2FF]
          to-[#0284C7]
          py-2.5
          text-sm
          font-semibold
          text-black
        "

      >

        <Save size={16}/>

        Save Changes


      </button>





    </div>

  );

}








function PreferenceCard({

  title,

  children,

}:{

  title:string;

  children:React.ReactNode;

}){


  return (

    <div

      className="
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        p-4
        space-y-4
      "

    >


      <h3
        className="
          text-sm
          font-medium
          text-white/80
        "
      >

        {title}

      </h3>


      {children}


    </div>

  );

}









function PreferenceSelect({

  icon,

  label,

  value,

  options,

  onChange,

}:{

  icon:React.ReactNode;

  label:string;

  value:string;

  options:string[];

  onChange:(value:string)=>void;

}){


  return (

    <div

      className="
        flex
        items-center
        gap-3
      "

    >

      <div
        className="
          text-[#00D2FF]
        "
      >

        {icon}

      </div>





      <div className="flex-1">


        <p
          className="
            text-xs
            text-white/40
          "
        >

          {label}

        </p>


      </div>





      <select

        value={value}

        onChange={(e)=>
          onChange(
            e.target.value
          )
        }

        className="
          rounded-lg
          bg-black/20
          border
          border-white/10
          px-3
          py-1.5
          text-sm
          outline-none
        "

      >

        {
          options.map(
            option=>(

              <option
                key={option}
                value={option}
              >

                {option}

              </option>

            )
          )
        }


      </select>


    </div>

  );

}