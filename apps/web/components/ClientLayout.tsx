// apps/web/components/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import LandingTopbar from "./LandingTopbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isAuthPage && (isDashboard ? <Topbar /> : <LandingTopbar />)}
      <main
        className={
          isAuthPage
            ? "min-h-screen"
            : isDashboard
              ? "min-h-screen pt-20 pb-16"
              : "min-h-screen pt-24 pb-16"
        }
      >
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}