"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/shared/Container";
import TestimonialCard from "./TestimonialCard";
import { ICONS } from "@/constants";

const testimonials = [
  {
    id: 1,
    name: "Viezh Robert",
    location: "Warsaw, Poland",
    quote:
      "Wow... I am very happy to use this service, it turned out to be more than my expectations and so far there have been no problems. Best car rental always the best.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    rating: "4.5",
  },
  {
    id: 2,
    name: "Yessica Christy",
    location: "Shanxi, China",
    quote:
      "I like it because I like to travel far and still can make my vehicle rental easy without additional fees.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
    rating: "4.5",
  },
  {
    id: 3,
    name: "Kim Young Jou",
    location: "Seoul, South Korea",
    quote:
      "This is very helpful to my trip. Vehicles are always super clean and ready on time. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    rating: "4.5",
  },
  {
    id: 4,
    name: "Michael Chen",
    location: "London, UK",
    quote:
      "Seamless process from pickup to drop off. Customer service responded instantly when I asked to extend my duration.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    rating: "4.8",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    location: "Madrid, Spain",
    quote:
      "Affordable rates and transparent pricing with zero hidden charges. Will definitely use them again on my next trip.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
    rating: "5.0",
  },
];

export default function Testimonials() {
  const trackRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const maxPageIndex = Math.max(0, testimonials.length - itemsPerView);
  const pageCount = maxPageIndex + 1;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerView(3);
      else if (width >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update button disabled states and active pagination index accurately
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;

    // Disabled status checks with tolerance
    setCanPrev(scrollLeft > 5);
    setCanNext(scrollLeft < maxScroll - 5);

    // Active page index calculation
    if (maxScroll > 0) {
      const progress = scrollLeft / maxScroll;
      const index = Math.round(progress * maxPageIndex);
      setActivePage(index);
    } else {
      setActivePage(0);
    }
  }, [maxPageIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });

    return () => track.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollToPage = (pageIndex) => {
    const track = trackRef.current;
    if (!track) return;

    const targetIndex = Math.min(Math.max(pageIndex, 0), maxPageIndex);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const targetLeft = (targetIndex / maxPageIndex) * maxScroll;

    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  return (
    <section
      id="testimonial"
      aria-labelledby="testimonials-title"
      aria-label="Customer Testimonials"
      className="bg-white py-20 lg:py-28 overflow-hidden"
    >
      <Container>
        <SectionHeader
          id="testimonials-title"
          title="Trusted by Thousands of Happy Customer"
          description="A high-performing web-based car rental system for any rent-a-car company and website"
        />

        {/* Scrollable Track */}
        <div
          ref={trackRef}
          className="mt-14 flex gap-6 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="shrink-0 grow-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Navigation & Pagination Controls */}
        <div className="mt-12 flex items-center justify-between">
          {/* Pagination Indicators */}
          <div
            aria-label="Testimonial pagination dots"
            className="flex items-center gap-2.5"
          >
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to page ${index + 1}`}
                onClick={() => scrollToPage(index)}
                className={`transition-all duration-300 ${
                  activePage === index
                    ? "h-3.5 w-11 rounded-full bg-primary"
                    : "h-3.5 w-3.5 rounded-full bg-surface-200 hover:bg-surface-300"
                }`}
              />
            ))}
          </div>

          {/* Directional Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="Previous testimonials"
              disabled={!canPrev}
              onClick={() => scrollToPage(activePage - 1)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-primary transition-all ${
                !canPrev
                  ? "opacity-30 cursor-not-allowed border-gray-300"
                  : "hover:bg-primary/10 active:scale-95 cursor-pointer"
              }`}
            >
              <Image
                src={ICONS.arrowBackIcon}
                alt="Previous"
                width={20}
                height={20}
                className={`h-5 w-5 object-contain ${!canPrev ? "grayscale opacity-50" : ""}`}
              />
            </button>

            <button
              type="button"
              aria-label="Next testimonials"
              disabled={!canNext}
              onClick={() => scrollToPage(activePage + 1)}
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all ${
                !canNext
                  ? "opacity-30 cursor-not-allowed bg-gray-300"
                  : "hover:opacity-90 active:scale-95 cursor-pointer"
              }`}
            >
              <Image
                src={ICONS.arrowForwardIcon}
                alt="Next"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
