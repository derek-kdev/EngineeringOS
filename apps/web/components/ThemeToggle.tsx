"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        rounded-full p-2 text-xl
        transition-all duration-300
        hover:bg-[#FF6200]/10
        text-white
      "
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}