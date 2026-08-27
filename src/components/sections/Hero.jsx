import { getHeroContent } from "@/data/frontEnd";
import Image from "next/image";
import Container from "../shared/Container";

export default function Hero() {
  const content = getHeroContent();
  return (
    <section
      id="home"
      aria-label="Car rental introduction"
      className="bg-primary-50 lg:pt-40 relative"
    >
      <Container className="flex gap-40 ">
        <div className="flex-1">
          <div className="space-y-6">
            <p className="text-sm font-medium text-text-body">
              {content.eyebrow}
            </p>
            <h1 className=" text-5xl font-extrabold  leading-15  text-secondary uppercase ">
              {content.title}
            </h1>
            <p className="text-base leading-6 text-text-body">
              {content.description}
            </p>
          </div>
          <div className="mt-12 flex items-center gap-10">
            <button className="rounded-sm bg-primary px-6 py-2.5 text-xs font-semibold text-white">
              {content.bookingLabel}
            </button>
            <button className="text-xs font-bold text-secondary">
              {content.fleetLabel}
            </button>
          </div>
        </div>
        <div className="flex-1 relative  overflow-hidden rounded-tl-[64px] h-[550px]">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
