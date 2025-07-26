import HeroSection from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="min-h-screen px-20 flex flex-col items-center justify-center md:max-w-[1500px] mx-auto">
      <Navbar />
      <HeroSection />
      <Skills />
      {/* <Services /> */}
      <Projects />
      <div className="h-[500px] bg-white"></div>
      <div className="h-[500px] bg-black"></div>
    </div>
  );
}
