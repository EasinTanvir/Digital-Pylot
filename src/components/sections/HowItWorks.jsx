import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { ICONS } from "@/constants";
import Container from "../shared/Container";

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
      className="bg-surface-200  sm:px-6 lg:px-8 py-8 lg:py-28"
    >
      <Container>
        <SectionHeader
          id="how-it-works-title"
          title="How it works"
          description="A high-performing web-based car rental system for any rent-a-car company and website"
        />

        <ul className="relative mt-8 grid gap-8 md:grid-cols-3 md:gap-4 lg:mt-16 lg:gap-8">
          {steps.map(({ title, description, icon }, index) => (
            <li
              key={title}
              className="relative flex flex-col items-center text-center"
            >
              {/* Box with top positioning for Step 1 & flex centering for Steps 2 & 3 */}
              <div
                className={`relative h-16 w-16 rounded-2xl bg-primary-50 border border-primary-100 cursor-pointer transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20 lg:h-25 lg:w-25 lg:rounded-[30px] ${
                  index !== 0 ? "flex items-center justify-center" : ""
                }`}
              >
                <Image
                  src={icon}
                  alt={title}
                  width={40}
                  height={40}
                  className={`h-6 w-6 object-contain sm:h-7 sm:w-7 lg:h-10 lg:w-10 ${
                    index === 0
                      ? "absolute top-2.5 left-0 right-0 mx-auto sm:top-3 "
                      : "static"
                  }`}
                />
              </div>

              {/* Connected Curved Shape - Restricted to desktop to avoid small screen collapse */}
              {index < steps.length - 1 && (
                <div className="absolute xl:left-[68%] left-[70%] top-5 hidden w-[68%] xl:w-[72%] lg:block pointer-events-none">
                  <Image
                    src={ICONS.borderShape}
                    alt=""
                    width={220}
                    height={70}
                    className="w-full object-contain opacity-60"
                  />
                </div>
              )}

              {/* Responsive Typography */}
              <h3 className="mt-5 text-base font-semibold leading-tight text-secondary tracking-custom sm:text-lg lg:mt-8 lg:text-2xl lg:leading-normal">
                {title}
              </h3>
              <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-text-body sm:text-sm lg:mt-3 lg:max-w-xs lg:leading-[1.75]">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
