"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        absolute
        top-6
        left-6
        z-50
        flex
        items-center
        gap-2
        rounded-full
        border
        border-white/20
        bg-white/5
        px-4
        py-2
        text-sm
        text-white/80
        backdrop-blur-md
        transition
        hover:bg-white/10
        hover:text-white
        hover:border-[#00D2FF]/50
      "
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}