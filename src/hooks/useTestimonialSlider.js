"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useTestimonialSlider(totalItems) {
  const trackRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const maxPageIndex = Math.max(0, totalItems - itemsPerView);
  const pageCount = maxPageIndex + 1;

  // Handle responsive items per view
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

  // Update scroll boundaries & active page state
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;

    setCanPrev(scrollLeft > 5);
    setCanNext(scrollLeft < maxScroll - 5);

    if (maxScroll > 0) {
      const progress = scrollLeft / maxScroll;
      const index = Math.round(progress * maxPageIndex);
      setActivePage(index);
    } else {
      setActivePage(0);
    }
  }, [maxPageIndex]);

  // Attach scroll listener
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });

    return () => track.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  // Scroll handler function
  const scrollToPage = (pageIndex) => {
    const track = trackRef.current;
    if (!track) return;

    const targetIndex = Math.min(Math.max(pageIndex, 0), maxPageIndex);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const targetLeft = (targetIndex / maxPageIndex) * maxScroll;

    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  return {
    trackRef,
    activePage,
    pageCount,
    canPrev,
    canNext,
    scrollToPage,
  };
}
