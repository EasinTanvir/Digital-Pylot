import Image from "next/image";

export default function TestimonialCard({ testimonial }) {
  return <figure className="rounded-2xl border border-border-100 bg-white p-5 shadow-[0_10px_30px_rgba(17,19,35,0.06)]"><figcaption className="flex items-center gap-3"><Image src={testimonial.avatar} alt={`${testimonial.name} portrait`} width={40} height={40} className="h-10 w-10 rounded-full object-cover" /><div><p className="text-xs font-bold text-secondary">{testimonial.name}</p><p className="text-[10px] text-text-body">{testimonial.location}</p></div><p className="ml-auto text-[10px] font-bold text-secondary">4.5</p></figcaption><p aria-label="4.5 out of 5 stars" className="mt-3 text-[10px] tracking-wide text-primary">★★★★★</p><blockquote className="mt-3 text-xs leading-5 text-secondary">“{testimonial.quote}”</blockquote></figure>;
}
