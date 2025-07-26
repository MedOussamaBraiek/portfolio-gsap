import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen px-20 flex flex-col items-center justify-center md:max-w-[1500px] mx-auto">
      <Navbar />
      <HeroSection />
    </div>
  );
}
