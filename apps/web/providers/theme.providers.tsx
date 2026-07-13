// apps/web/providers/theme.providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import NoScript from "@/components/NoScript";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NoScript>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </NoScript>
  );
}