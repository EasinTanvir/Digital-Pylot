import { getHeroContent } from "@/data/frontEnd";
import Image from "next/image";
import Container from "../shared/Container";

export default function Hero() {
  const content = getHeroContent();
  return (
    <section
      id="home"
      aria-label="Car rental introduction"
      className="relative bg-primary-50 pt-16 sm:pt-20 md:pt-28 lg:pt-40 pb-20 sm:pb-24 lg:pb-16"
    >
      <Container className="flex flex-col gap-10 sm:gap-14 md:gap-10 lg:flex-row lg:gap-24 xl:gap-32">
        <div className="w-full flex-1 lg:pt-10">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs font-medium text-text-body sm:text-sm leading-[1.21]">
              {content.eyebrow}
            </p>
            <h1 className="text-3xl font-extrabold leading-[1.21] text-secondary uppercase sm:text-4xl  md:text-5xl  lg:text-5xl">
              {content.title}
            </h1>
            <p className="max-w-md text-sm tracking-custom leading-[1.6] text-text-body sm:max-w-lg sm:text-base">
              {content.description}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6 md:mt-12 md:gap-10">
            <button className="whitespace-nowrap rounded-sm bg-primary px-5 py-2 text-xs font-semibold text-white sm:px-6 sm:py-2.5 hover:scale-104 transition-all duration-200">
              {content.bookingLabel}
            </button>
            <button className="whitespace-nowrap text-xs font-bold text-secondary">
              {content.fleetLabel}
            </button>
          </div>
        </div>
        <div className="relative aspect-[3/2] w-full flex-1 overflow-hidden rounded-tl-[64px] lg:aspect-[7/6] lg:-mr-10 xl:-mr-24 ">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
