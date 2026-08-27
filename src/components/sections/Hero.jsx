import { getHeroContent } from "@/data/frontEnd";
import Image from "next/image";
import Container from "../shared/Container";

export default function Hero() {
  const content = getHeroContent();
  return (
    <section
      id="home"
      aria-label="Car rental introduction"
      className="bg-primary-50 pt-16 sm:pt-20 md:pt-28 lg:pt-40 relative"
    >
      <Container className="flex flex-col lg:flex-row gap-10 sm:gap-14 md:gap-10 lg:gap-24 xl:gap-32 ">
        <div className="flex-1 w-full lg:pt-10">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-xs sm:text-sm font-medium text-text-body">
              {content.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight sm:leading-tight md:leading-[1.1] text-secondary uppercase">
              {content.title}
            </h1>
            <p className="text-sm sm:text-base leading-6 text-text-body max-w-md sm:max-w-lg">
              {content.description}
            </p>
          </div>
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10">
            <button className="rounded-sm bg-primary px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold text-white whitespace-nowrap">
              {content.bookingLabel}
            </button>
            <button className="text-xs font-bold text-secondary whitespace-nowrap">
              {content.fleetLabel}
            </button>
          </div>
        </div>
        <div className="flex-1 relative 2xl:-mr-40 xl:-mr-24 lg:-mr-10 overflow-hidden rounded-tl-[64px] aspect-[3/2] lg:aspect-[7/6] w-full">
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
