import Image from "next/image";
import Container from "../shared/Container";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=85",
    alt: "White SUV driving through a city",
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85",
    alt: "Sports car on an open road",
  },
];

export default function ImageBannerDuo() {
  return (
    <section
      aria-label="Car rental offers"
      className="bg-surface-250 py-14 lg:py-16"
    >
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {galleryImages.map((image) => (
            <article
              key={image.src}
              className="group cursor-pointer relative aspect-16/9 sm:aspect-16/10 w-full overflow-hidden rounded-[20px] bg-surface-150 shadow-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-secondary/10 transition-opacity duration-300 group-hover:opacity-0" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
