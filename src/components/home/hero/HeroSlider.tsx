"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { id: 1, image: "/images/image_6.png" },
  { id: 2, image: "/images/image_4.png" },
  { id: 3, image: "/images/image_3.png" },
  { id: 4, image: "/images/image_5.png" },
];

export default function HeroSlider(): React.JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="relative w-full h-95 sm:h-107.5 rounded-3xl overflow-hidden shadow-2xl group bg-slate-950">
      
      {/* Clean Edge-to-Edge Background Image */}
      <div className="absolute inset-0 z-0">
        {!imageError[currentSlide] ? (
          <Image
            src={SLIDES[currentSlide].image}
            alt="PrepareJob Tech Interview Success"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={currentSlide === 0}
            onError={() => handleImageError(currentSlide)}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-6 text-center">
            <span className="text-xs text-slate-500 font-mono">[ Preview unavailable ]</span>
          </div>
        )}
      </div>

      {/* Floating Minimal Bottom Navigation Bar  */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-slate-950/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-lg">
        
        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? "w-6 bg-indigo-500" : "w-1.5 bg-slate-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide Controls Only */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
            className="size-7 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors border border-white/5"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
            className="size-7 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 flex items-center justify-center transition-colors border border-white/5"
            aria-label="Next slide"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}