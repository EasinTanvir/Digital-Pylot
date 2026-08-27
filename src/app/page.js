import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BookingSearchBar from "@/components/sections/BookingSearchBar";
import HowItWorks from "@/components/sections/HowItWorks";
import PopularDeals from "@/components/sections/PopularDeals";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ImageBannerDuo from "@/components/sections/ImageBannerDuo";
import Testimonials from "@/components/sections/Testimonials";
import { getHeroContent } from "@/data/frontEnd";

export default async function HomePage() {
  return (
    <div className="overflow-x-hidden bg-page-bg">
      <Navbar />
      <main>
        <Hero content={getHeroContent()} />
        <BookingSearchBar />
        <HowItWorks />
        <PopularDeals />
        <WhyChooseUs />
        <ImageBannerDuo />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
