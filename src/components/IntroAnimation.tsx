"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";

interface IntroAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function IntroAnimation({ isVisible, onComplete }: IntroAnimationProps) {
  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const tl = gsap.timeline();

    // Logo animation - centered
    tl.fromTo(".logo-animation", {
      opacity: 0,
      scale: 0.5,
      y: 50
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(".logo-animation", {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, "-=0.2");

    // Quick fade out
    tl.to({}, { duration: 1 })
      .to(".logo-animation", {
        opacity: 0,
        y: -30,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.in"
      })
      .call(() => {
        onComplete();
      });

    return () => {
      tl.kill();
    };
  }, [isVisible, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      {/* Logo - Centered */}
      <div className="logo-animation">
        <img
          src="/VedeLogoWhite.png"
          alt="Vedê Bar Logo"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
        />
      </div>
    </div>
  );
} 