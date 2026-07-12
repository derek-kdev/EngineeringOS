// apps/web/app/dashboard/layout.tsx
"use client";

import { useUIStore } from "@/stores/ui";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <DashboardSidebar />

      <motion.main
        className={`
          flex-1 transition-all duration-300
          ${sidebarOpen ? "ml-72" : "ml-28"}
          pt-24 px-8 pb-8
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
    </div>
  );
}