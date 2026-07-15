import LandingSlider from "@/components/landing/LandingSlider";
import LandingTopbar from "@/components/landing/LandingTopbar";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">

      {/* Cinematic background */}
      <LandingSlider />

      {/* Floating navigation */}
      <div className="absolute top-0 left-0 w-full z-50">
        <LandingTopbar />
      </div>

    </main>
  );
}