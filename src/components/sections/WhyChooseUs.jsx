import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "../shared/Container";
import { ICONS } from "@/constants";

const features = [
  {
    title: "Customer Support",
    description:
      "Extremely responsive customer support provided by the team at best car rental UK.",
    icon: ICONS.phoneCallIcon,
  },
  {
    title: "Best Price Guaranteed",
    description:
      "Extremely best prices for all category people offered at the best car rental UK.",
    icon: ICONS.priceTagIcon,
  },
  {
    title: "Many Location",
    description:
      "Extremely the best location and available near the big cities. Just visit best car rental UK.",
    icon: null,
  },
];

// Separate Feature Item Component within the same file
function FeatureItem({ title, description, icon }) {
  return (
    <li className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
      <div className="flex lg:mt-1 h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-primary transition-transform duration-300 hover:scale-105">
        {icon && (
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
        )}
      </div>
      <div className="tracking-custom text-center lg:text-left">
        <h3 className="text-lg font-semibold leading-normal text-secondary">
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-[1.75] text-text-body">
          {description}
        </p>
      </div>
    </li>
  );
}

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-title"
      aria-label="Why choose us section"
      className="bg-white pb-8 pt-10 lg:pt-20"
    >
      <Container>
        <SectionHeader
          id="why-choose-us-title"
          title="Why choose us"
          description="A high-performing web-based car rental system for any rent-a-car company and website"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Wireframe Matched Image Container */}
          <div className="relative lg:aspect-4/3 sm:aspect-[7/3] aspect-square w-full overflow-hidden rounded-[20px] bg-surface-150 shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85"
              alt="Premium car ready for a road trip"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Features List keeping your exact flex direction & lg:items-end */}
          <ul className="flex flex-col gap-8 sm:flex-row lg:flex-col lg:items-end">
            {features.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
