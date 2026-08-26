import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import { getHeroContent } from "@/data/frontEnd";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero content={getHeroContent()} />
    </>
  );
}
