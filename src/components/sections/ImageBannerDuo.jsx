import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function ImageBannerDuo() {
  return <section aria-label="Car rental offers" className="bg-surface-250 px-6 py-10 lg:px-8 lg:py-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2"><div className="overflow-hidden rounded-lg bg-white"><PlaceholderImage className="h-auto w-full" /></div><div className="overflow-hidden rounded-lg bg-white"><PlaceholderImage className="h-auto w-full" /></div></div></section>;
}
