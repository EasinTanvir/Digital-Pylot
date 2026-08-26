"use client";

import { useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { ArrowIcon } from "@/components/ui/Icons";

const testimonials = [
  ["Viezh Robert", "Warsaw, Poland", "photo-1500648767791-00dcc994a43e"], ["Sofia Malik", "London, United Kingdom", "photo-1494790108377-be9c29b29330"], ["James Wilson", "Manchester, United Kingdom", "photo-1507003211169-0a1dd7228f2d"], ["Maya Thompson", "Bristol, United Kingdom", "photo-1534528741775-53994a69daeb"], ["Daniel King", "Leeds, United Kingdom", "photo-1519345182560-3f2917c472ef"],
].map(([name, location, photo], index) => ({ name, location, quote: "Booking was effortless and the car was spotless. I had everything I needed for a great trip from start to finish.", avatar: `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=160&q=85`, index }));

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const shown = testimonials.slice(page, page + 3);
  const dragStart = useRef(0);
  const move = (offset) => setPage((current) => offset < -40 ? Math.min(testimonials.length - 3, current + 1) : offset > 40 ? Math.max(0, current - 1) : current);
  return <section id="testimonial" aria-labelledby="testimonials-title" className="bg-white px-6 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeader id="testimonials-title" title="Trusted by Thousands of Happy Customer" description="A high-performing web-based car rental system for any rent-a-car company and website" /><ul onPointerDown={(event) => { dragStart.current = event.clientX; }} onPointerUp={(event) => move(event.clientX - dragStart.current)} className="mt-12 grid touch-pan-y gap-5 md:grid-cols-3">{shown.map((testimonial) => <li key={testimonial.index}><TestimonialCard testimonial={testimonial} /></li>)}</ul><div className="mt-7 flex items-center justify-between"><div aria-label="Testimonial pagination" className="flex gap-2">{[0, 1, 2].map((dot) => <button key={dot} type="button" aria-label={`Go to testimonials page ${dot + 1}`} onClick={() => setPage(dot)} className={`h-2 rounded-full ${page === dot ? "w-6 bg-primary" : "w-2 bg-border-200"}`} />)}</div><div className="flex gap-4"><button type="button" aria-label="Previous testimonials" onClick={() => setPage(Math.max(0, page - 1))} className="text-xl text-secondary"><ArrowIcon direction="left" /></button><button type="button" aria-label="Next testimonials" onClick={() => setPage(Math.min(testimonials.length - 3, page + 1))} className="text-xl text-secondary"><ArrowIcon /></button></div></div></div></section>;
}
