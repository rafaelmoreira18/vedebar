"use client";

import React from "react";

interface ExperienceSectionProps {
  reservationsVideoRef: React.RefObject<HTMLVideoElement | null>;
  animationComplete: boolean;
  reservationsVideoLoaded: boolean;
}

export default function ExperienceSection({
  reservationsVideoRef,
  animationComplete,
  reservationsVideoLoaded,
}: ExperienceSectionProps) {
  const handleWhatsAppClick = () => {
    const phoneNumber = "5511976250998"; // Formato internacional: +55 11 97625-0998
    const message = encodeURIComponent("Olá! Gostaria de fazer uma reserva");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={reservationsVideoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        style={{ 
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      >
        <source src="/Bg site.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Static background for before video loads */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/espaços/bar1.JPG')",
          display: animationComplete && reservationsVideoLoaded ? "none" : "block",
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      />

      <div className="container mx-auto px-6 py-20 text-center relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-6xl text-white tracking-tight leading-tight mb-12"
            style={{
              fontFamily: "Playfair Display, serif",
              textShadow: "0 8px 32px rgba(0,0,0,0.8)",
              fontWeight: 400,
              fontStyle: "italic"
            }}>
            VIVA A EXPERIÊNCIA VEDÊ
          </h1>

          {/* CTA Button */}
          <button
            onClick={handleWhatsAppClick}
            className="text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{
              backgroundColor: 'var(--bar-green)',
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bar-green-dark)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bar-green)')}
          >
            Faça sua Reserva
          </button>
        </div>
      </div>
    </section>
  );
} 