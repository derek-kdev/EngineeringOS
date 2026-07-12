import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/theme.providers";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "EngineeringOS",
  description:
    "EngineeringOS is a modern engineering platform for design, simulation, collaboration, and intelligent engineering workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0A0A0A] text-white antialiased">
        {/* Optional viewport glow effect — you can keep or remove */}
        <div className="viewport-glow" />

        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}