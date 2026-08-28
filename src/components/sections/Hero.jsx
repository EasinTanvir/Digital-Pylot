import { getHeroContent } from "@/data/frontEnd";
import Image from "next/image";
import Container from "../shared/Container";

export default function Hero() {
  const content = getHeroContent();
  return (
    <section
      id="home"
      aria-label="Car rental introduction"
      className="relative bg-primary-50 pt-24 sm:pt-28 lg:pt-40"
    >
      <Container className="flex flex-col gap-10 sm:gap-14 md:gap-10 lg:flex-row lg:gap-24 xl:gap-32">
        <div className="w-full xl:flex-1 xl:max-w-max lg:max-w-sm  lg:pt-10">
          <div className=" space-y-6">
            <p className="text-xs font-medium text-text-body sm:text-sm leading-[1.21]">
              {content.eyebrow}
            </p>
            <h1 className="text-3xl font-extrabold leading-[1.21] text-secondary uppercase sm:text-4xl  md:text-4xl  xl:text-5xl">
              {content.title}
            </h1>
            <p className="max-w-md text-sm tracking-custom leading-[1.6] text-text-body sm:max-w-lg sm:text-base">
              {content.description}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6 md:mt-12 ">
            {/* Primary Action Button */}
            <button className="whitespace-nowrap rounded-sm bg-primary px-5 py-2 text-xs font-semibold text-white transition-all duration-200 ease-in-out hover:scale-[1.03] hover:bg-primary-alt hover:shadow-md active:scale-95 sm:px-6 sm:py-2.5">
              {content.bookingLabel}
            </button>

            {/* Secondary Action Button with Primary Outline Border on Hover */}
            <button className="whitespace-nowrap rounded-sm border border-transparent px-5 py-2 text-xs font-bold text-secondary transition-all duration-200 ease-in-out hover:scale-[1.03] hover:border-primary active:scale-95 sm:px-6 sm:py-2.5">
              {content.fleetLabel}
            </button>
          </div>
        </div>
        <div className="relative   flex-1 overflow-hidden rounded-tl-[64px] aspect-[3/2] md:aspect-[4/2] lg:aspect-auto lg:min-h-[600px] -mr-6 lg:-mr-10 xl:-mr-24 ">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 20vw, 80vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
