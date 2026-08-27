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
      className="bg-white px-6 py-20 lg:px-8 lg:py-28"
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
              {/* Brand Styled Icon Box */}
              <div
                className={`  ${index !== 0 ? "flex-center" : "relative"} h-25 w-25 rounded-[30px] bg-primary-50 border border-primary-100  cursor-pointer transition-transform duration-300 hover:scale-105`}
              >
                <Image
                  src={icon}
                  alt={title}
                  width={40}
                  height={40}
                  className={`object-contain  top-3 left-0 right-0 mx-auto ${index !== 0 ? "static" : "absolute"}`}
                />
              </div>

              {/* Connected Curved Shape between steps */}
              {index < steps.length - 1 && (
                <div className="absolute left-[68%] top-5 hidden w-[72%] md:block">
                  <Image
                    src={ICONS.borderShape}
                    alt=""
                    width={220}
                    height={70}
                    className="w-full object-contain pointer-events-none opacity-60"
                  />
                </div>
              )}

              <h3 className="mt-8 font-semibold text-2xl  leading-normal  text-secondary tracking-custom">
                {title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-[1.75] text-text-body">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
