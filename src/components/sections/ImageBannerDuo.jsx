import Image from "next/image";
import { galleryImages } from "@/data/carRental";

export default function ImageBannerDuo() {
  return <section aria-label="Car rental offers" className="bg-surface-250 px-6 py-10 lg:px-8 lg:py-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{galleryImages.map((image) => <article key={image.src} className="group relative min-h-[260px] overflow-hidden rounded-2xl"><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-secondary/25" /></article>)}</div></section>;
}
