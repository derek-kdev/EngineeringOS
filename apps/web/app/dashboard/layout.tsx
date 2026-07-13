// apps/web/app/dashboard/layout.tsx
"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <DashboardSidebar />
      <main className="flex-1 ml-64 pt-14 px-8 pb-8 overscroll-y-contain">
        {children}
      </main>
    </div>
  );
}