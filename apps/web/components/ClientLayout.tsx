"use client";

import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Topbar />}
      <main className={isAuthPage ? "min-h-screen" : "min-h-screen pt-28 pb-16"}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}