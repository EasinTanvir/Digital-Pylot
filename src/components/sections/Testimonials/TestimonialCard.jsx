import Image from "next/image";
import { ICONS } from "@/constants";

export default function TestimonialCard({ testimonial }) {
  const { name, location, quote, avatar, rating } = testimonial;

  return (
    <figure className="flex h-full flex-col justify-between rounded-[10px] bg-white px-6 sm:px-8 sm:pt-8 pt-6 pb-5 lg:pe-12 border border-border-100  shadow-sm">
      <div className="flex flex-col justify-between h-full">
        <figcaption className="flex items-center justify-between">
          <div className="flex  gap-4">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ">
              <Image
                src={avatar}
                alt={`${name}'s profile photo`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-base font-semibold text-secondary leading-7.5">
                {name}
              </p>
              <p className="text-xs  text-text-body ">{location}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-sm  leading-[30px] text-secondary">
              {rating}
            </span>
            {ICONS.starIcon && (
              <Image
                src={ICONS.starIcon}
                alt="Star rating"
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            )}
          </div>
        </figcaption>

        <blockquote className="mt-3 text-sm leading-7.5 text-secondary">
          “{quote}”
        </blockquote>
      </div>
    </figure>
  );
}
