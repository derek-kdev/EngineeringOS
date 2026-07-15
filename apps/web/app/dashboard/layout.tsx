import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <DashboardTopbar />

      <main className="pt-24 px-6">
        {children}
      </main>

    </div>
  );
}