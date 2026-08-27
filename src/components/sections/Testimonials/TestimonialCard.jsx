import Image from "next/image";
import { ICONS } from "@/constants";

export default function TestimonialCard({ testimonial }) {
  const { name, location, quote, avatar, rating } = testimonial;

  return (
    <figure className="flex h-full flex-col justify-between rounded-[20px] bg-white p-6 sm:p-8 border border-border-100 shadow-sm">
      <div className="flex flex-col justify-between h-full">
        <figcaption className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-150">
              <Image
                src={avatar}
                alt={`${name}'s profile photo`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-base font-bold text-secondary">{name}</p>
              <p className="text-xs text-text-body">{location}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-secondary">{rating}</span>
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

        <blockquote className="mt-6 text-sm leading-relaxed text-secondary/80">
          “{quote}”
        </blockquote>
      </div>
    </figure>
  );
}
