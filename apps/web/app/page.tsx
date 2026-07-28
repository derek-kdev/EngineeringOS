"use client";

import LandingTopbar from "@/components/landing/LandingTopbar";
import LandingSlider from "@/components/landing/LandingSlider";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B132B]">
      <LandingTopbar />
      <LandingSlider />
      <LandingFooter />
    </div>
  );
}
