import Image from "next/image";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=85", alt: "White SUV driving through a city" },
  { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85", alt: "Sports car on an open road" },
];

export default function ImageBannerDuo() {
  return <section aria-label="Car rental offers" className="bg-surface-250 px-6 py-10 lg:px-8 lg:py-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{galleryImages.map((image) => <article key={image.src} className="group relative min-h-[260px] overflow-hidden rounded-2xl"><Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-secondary/25" /></article>)}</div></section>;
}
