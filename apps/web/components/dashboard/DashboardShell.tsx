"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import DashboardTopbar from "./DashboardTopbar";
import DashboardFooter from "./DashboardFooter";
import UserPanel from "./panels/UserPanel";
import BackButton from "./ui/BackButton";
import PageTransition from "./transitions/PageTransition";

type UserPanelType =
  | "profile"
  | "preferences"
  | "security"
  | "workspace"
  | null;

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePanel, setActivePanel] = useState<UserPanelType>(null);
  const pathname = usePathname();
  const showBackButton = pathname !== "/dashboard";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0B132B] text-white">
      <div className="fixed inset-0 bg-black/40 pointer-events-none" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <DashboardTopbar onOpenPanel={setActivePanel} />

        {activePanel && (
          <UserPanel
            panel={activePanel}
            onClose={() => setActivePanel(null)}
          />
        )}

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
          {showBackButton && <BackButton />}
          <PageTransition key={pathname}>{children}</PageTransition>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
