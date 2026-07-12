// @/components/Topbar.tsx

"use client";

import { ThemeToggle } from "@/components/ThemeToggle";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 backdrop-blur-sm px-6 dark:border-zinc-800 dark:bg-black/80">
      <span className="font-semibold text-zinc-900 dark:text-white">
        Logo
      </span>
      <ThemeToggle />
    </header>
  );
}