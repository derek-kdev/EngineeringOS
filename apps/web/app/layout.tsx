import { Providers } from "@/providers/theme.providers";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Topbar />
          <main className="pt-16 pb-14 min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}