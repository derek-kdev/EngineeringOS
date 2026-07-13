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
  const isAuthPage = ["/signin", "/signup", "/forgot-password", "/reset-password"].includes(pathname);
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Topbar />}
      <main className={isAuthPage ? "min-h-screen" : "flex-1 pt-20 pb-16"}>
        {children}
      </main>
      {!isAuthPage && (
        <div className={isDashboard ? "ml-64 mr-3" : ""}>
          <Footer />
        </div>
      )}
    </div>
  );
}