// apps/web/components/ClientLayout.tsx
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
  const isLandingPage = pathname === "/" || pathname === "/landing";

  let mainClassName = "min-h-screen";
  if (!isAuthPage && !isLandingPage) {
    mainClassName = "min-h-screen pt-20 pb-16";
  }

  return (
    <>
      {/* Skip global Topbar on auth and landing pages */}
      {!isAuthPage && !isLandingPage && <Topbar />}
      <main className={mainClassName}>{children}</main>
      {/* Skip global Footer on auth and landing pages */}
      {!isAuthPage && !isLandingPage && <Footer />}
    </>
  );
}