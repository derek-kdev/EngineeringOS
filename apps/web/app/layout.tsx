import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/theme.providers";
import { AuthProvider } from "@/providers/auth.providers";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "EngineeringOS",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0A0A0A] text-white antialiased" suppressHydrationWarning>
        <div className="viewport-glow" />
        <Providers>
          <AuthProvider>
            <ClientLayout>{children}</ClientLayout>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}