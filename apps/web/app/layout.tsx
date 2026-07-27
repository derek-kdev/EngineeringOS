import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { NavigationLoader } from "@/components/loading";


export const metadata: Metadata = {
  title: "EngineeringOS",
  description:
    "Engineering workspace for projects, research, calculations and collaboration.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">

      <body
        className="
          bg-[#050816]
          text-white
          antialiased
        "
      >

        <AuthProvider>

          <NavigationLoader>

            {children}

          </NavigationLoader>

        </AuthProvider>


      </body>


    </html>

  );

}