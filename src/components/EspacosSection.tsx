"use client";

import React, { useState } from 'react';

interface EspacoItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const espacos: EspacoItem[] = [
  {
    id: 1,
    src: "/espaços/bar1.JPG",
    alt: "Espaço Vedê 1",
    title: "Espaço 1"
  },
  {
    id: 2,
    src: "/espaços/bar2.jpg",
    alt: "Espaço Vedê 2",
    title: "Espaço 2"
  },
  {
    id: 3,
    src: "/espaços/bar4.jpg",
    alt: "Espaço Vedê 3",
    title: "Espaço 3"
  },
  {
    id: 4,
    src: "/espaços/bar5.jpg",
    alt: "Espaço Vedê 4",
    title: "Espaço 4"
  },
];

export default function EspacosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % espacos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + espacos.length) % espacos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-32 bg-black animated-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontWeight: 400 }}>
            Nossos Espaços
          </h2>
          <div className="w-16 h-1 bg-white mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Ambientes únicos pensados para proporcionar experiências inesquecíveis
          </p>
        </div>

        {/* Minimalist Carousel - Instagram Feed Format */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Main carousel container */}
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {espacos.map((espaco) => (
                  <div key={espaco.id} className="w-full flex-shrink-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={espaco.src}
                        alt={espaco.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows - minimal design */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6 text-white transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center group"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6 text-white transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots indicator - minimalist */}
            <div className="flex justify-center mt-8 space-x-3">
              {espacos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-white rounded-full'
                      : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
