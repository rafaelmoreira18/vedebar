"use client";

import React from "react";

export default function MapsSection() {
  return (
    <section
      className="maps-section py-32 animated-section relative min-h-screen flex items-center"
      style={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Image with zoom effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/espaços/bar1.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "scale(1.1)",
        }}
      />

      {/* Dark overlay for better text visibility */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                fontWeight: 400,
                textShadow: "0 4px 20px rgba(0,0,0,0.8)"
              }}
            >
              Nossa Localização
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-white mb-4" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
              Rua das Figueiras, 1206 - Santo André, SP
            </p>
            <p className="text-lg md:text-xl text-white/90" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
              09080-300
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-2 overflow-hidden backdrop-blur-sm bg-opacity-95">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.7394444444445!2d-46.5388888!3d-23.6666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce42f8b3f9f3f9%3A0x1234567890abcdef!2sRua%20das%20Figueiras%2C%201206%20-%20Santo%20Andr%C3%A9%2C%20SP%2C%2009080-300!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                width="100%"
                height="500"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vedê Bar Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 