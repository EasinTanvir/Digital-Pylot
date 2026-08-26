"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { ArrowIcon } from "@/components/ui/Icons";

const testimonials = Array.from({ length: 5 }, (_, index) => ({ name: "Viezh Robert", location: "Warsaw, Poland", quote: "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.", index }));

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const shown = testimonials.slice(page, page + 3);
  return <section id="testimonial" aria-labelledby="testimonials-title" className="bg-white px-6 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeader id="testimonials-title" title="Trusted by Thousands of Happy Customer" description="A high-performing web-based car rental system for any rent-a-car company and website" /><ul className="mt-12 grid gap-5 md:grid-cols-3">{shown.map((testimonial) => <li key={testimonial.index}><TestimonialCard testimonial={testimonial} /></li>)}</ul><div className="mt-7 flex items-center justify-between"><div aria-label="Testimonial pagination" className="flex gap-2">{[0, 1, 2, 3].map((dot) => <button key={dot} type="button" aria-label={`Go to testimonials page ${dot + 1}`} onClick={() => setPage(Math.min(dot, testimonials.length - 3))} className={`h-2 rounded-full ${page === dot ? "w-6 bg-secondary" : "w-2 bg-border-200"}`} />)}</div><div className="flex gap-4"><button type="button" aria-label="Previous testimonials" onClick={() => setPage(Math.max(0, page - 1))} className="text-xl text-secondary"><ArrowIcon direction="left" /></button><button type="button" aria-label="Next testimonials" onClick={() => setPage(Math.min(testimonials.length - 3, page + 1))} className="text-xl text-secondary"><ArrowIcon /></button></div></div></div></section>;
}
