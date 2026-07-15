"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";


export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const loadUser = async () => {

      const token =
        localStorage.getItem("accessToken");


      if (!token) {
        router.push("/signin");
        return;
      }



      try {

        const response =
          await api.get("/auth/me");


        setUser(response.data);


      } catch (error) {

        console.error(error);

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        router.push("/signin");


      } finally {

        setLoading(false);

      }

    };


    loadUser();


  }, [router]);




  if (loading) {

    return (

      <main
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#0B132B]
        text-white
        "
      >

        Loading dashboard...

      </main>

    );

  }




  return (

    <main
      className="
      min-h-screen
      bg-[#0B132B]
      text-white
      p-8
      "
    >


      <div
        className="
        max-w-4xl
        mx-auto
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        "
      >


        <h1
          className="
          text-4xl
          font-bold
          "
        >

          Welcome to EngineeringOS

        </h1>



        <p
          className="
          mt-4
          text-white/70
          "
        >

          Authentication is working successfully.

        </p>



        <div
          className="
          mt-8
          space-y-3
          "
        >

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>


          <p>
            <strong>Name:</strong>{" "}
            {user?.firstName}{" "}
            {user?.lastName}
          </p>


          <p>
            <strong>User ID:</strong>{" "}
            {user?.id}
          </p>


          <p>
            <strong>Email Verified:</strong>{" "}
            {
              user?.emailVerifiedAt
              ? "Yes"
              : "No"
            }
          </p>


        </div>



        <button
          onClick={() => {

            localStorage.removeItem(
              "accessToken"
            );

            localStorage.removeItem(
              "refreshToken"
            );

            router.push("/signin");

          }}
          className="
          mt-8
          rounded-xl
          bg-gradient-to-r
          from-[#FF6B00]
          to-[#FFB000]
          px-6
          py-3
          font-semibold
          "
        >

          Logout

        </button>



      </div>


    </main>

  );

}