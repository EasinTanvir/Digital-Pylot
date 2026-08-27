import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { ICONS } from "@/constants";

const steps = [
  {
    title: "Choose Location",
    description:
      "Aliquam erat volutpat. Integer malesuada turpis id ligula suscipit. Maecenas ultrices, orci vitae convallis mattis.",
    icon: ICONS.locationIcon,
  },
  {
    title: "Pick-up Date",
    description:
      "Aliquam erat volutpat. Integer malesuada turpis id ligula suscipit. Maecenas ultrices, orci vitae convallis mattis.",
    icon: ICONS.pickupDateIcon,
  },
  {
    title: "Book your car",
    description:
      "Aliquam erat volutpat. Integer malesuada turpis id ligula suscipit. Maecenas ultrices, orci vitae convallis mattis.",
    icon: ICONS.carIcon,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-work"
      aria-labelledby="how-it-works-title"
      className="bg-page-bg px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          id="how-it-works-title"
          title="How it works"
          description="A high-performing web-based car rental system for any rent-a-car company and website"
        />

        <ul className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map(({ title, description, icon }, index) => (
            <li
              key={title}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon Container with rounded corners matching wireframe */}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-neutral-blue-100 shadow-xs">
                <Image
                  src={icon}
                  alt={title}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>

              {/* Connecting Curved Shape (Rendered between Step 1-2 and Step 2-3) */}
              {index < steps.length - 1 && (
                <div className="absolute left-[60%] top-6 hidden w-[80%] md:block">
                  <Image
                    src={ICONS.borderShape}
                    alt=""
                    width={220}
                    height={70}
                    className="w-full object-contain pointer-events-none"
                  />
                </div>
              )}

              <h3 className="mt-8 text-lg font-bold text-secondary">{title}</h3>
              <p className="mt-3 max-w-xs text-xs leading-5 text-text-body">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
