// apps/web/components/NoScript.tsx
"use client";

import { ReactNode } from "react";

interface NoScriptProps {
  children: ReactNode;
}

export default function NoScript({ children }: NoScriptProps) {
  return (
    <div suppressHydrationWarning>
      {children}
    </div>
  );
}