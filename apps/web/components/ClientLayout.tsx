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

  return (
    <>
      {!isAuthPage && <Topbar />}
      {/* Changed pt-28 to pt-20 – no gap between topbar and content */}
      <main className={isAuthPage ? "min-h-screen" : "min-h-screen pt-20 pb-16"}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}