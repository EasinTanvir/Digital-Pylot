import Image from "next/image";

export default function Hero({ content }) {
  return (
    <section
      id="home"
      aria-label="Car rental introduction"
      className="bg-gradient-to-br from-surface-100 via-white to-primary-50"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:items-center lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <p className="text-[11px] font-medium text-text-body">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 text-[38px] font-extrabold leading-[121%] tracking-normal text-secondary uppercase sm:text-[46px]">
            {content.title}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-text-body">
            {content.description}
          </p>
          <div className="mt-7 flex items-center gap-6">
            <a
              href="#booking-search"
              className="rounded bg-secondary px-5 py-3 text-xs font-bold text-white"
            >
              {content.bookingLabel}
            </a>
            <a
              href="#popular-deals"
              className="text-xs font-bold text-secondary"
            >
              {content.fleetLabel}
            </a>
          </div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-surface-400 shadow-[0_22px_55px_rgba(9,44,76,0.18)] sm:min-h-[380px] lg:min-h-[440px]">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
