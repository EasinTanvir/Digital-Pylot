import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";
import { CarIcon } from "@/components/ui/Icons";

const features = [
  [
    "Customer Support",
    "Extremely responsive customer support provided by the team at best car rental UK.",
  ],
  [
    "Best Price Guaranteed",
    "Extremely best prices for all category people offered at the best car rental UK.",
  ],
  [
    "Many Location",
    "Extremely the best location and available near the big cities. Just visit best car rental UK.",
  ],
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-title"
      className="bg-white px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="why-choose-us-title"
          title="Why choose us"
          description="A high-performing web-based car rental system for any rent-a-car company and website"
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-[0_18px_45px_rgba(17,19,35,0.12)]">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
              alt="Premium car ready for a road trip"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="space-y-8">
            {features.map(([title, description]) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary">
                  <CarIcon />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-secondary">{title}</h3>
                  <p className="mt-2 max-w-md text-xs leading-5 text-text-body">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
