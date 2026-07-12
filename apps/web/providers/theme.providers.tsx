"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"      // ✅ required for Tailwind dark: classes
      defaultTheme="dark"    // ✅ default to dark (matches your design)
      enableSystem={true}    // ✅ respects user's system preference
      disableTransitionOnChange={false} // ✅ smooth transitions
    >
      {children}
    </ThemeProvider>
  );
}