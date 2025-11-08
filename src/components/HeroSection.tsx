"use client";

import React, { useRef } from "react";

interface HeroSectionProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  animationComplete: boolean;
  videoLoaded: boolean;
}

export default function HeroSection({
  videoRef,
  animationComplete,
  videoLoaded,
}: HeroSectionProps) {
  return (
    <section className="flex items-center justify-center min-h-screen w-full">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        style={{
          display: animationComplete ? "block" : "none",
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      >
        <source src="/Faça seu evento conosco Base Vídeo BG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Static background for before video loads */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/espaços/bar1.JPG')",
          display: animationComplete && videoLoaded ? "none" : "block",
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      />

{/* Logo Centered - Desktop and Mobile */}
      <div className="container mx-auto px-6 py-20 relative z-10 flex items-center justify-center h-full">
        {/* Logo Centered */}
        <div>
          <img
            src="/VedeLogoWhite.png"
            alt="Vedê Bar Logo"
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] object-contain"
            style={{
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.8))"
            }}
          />
        </div>
      </div>
    </section>
  );
} 