"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroAnimation from "../components/IntroAnimation";
import HeroSection from "../components/HeroSection";
import DrinksSection from "../components/DrinksSection";
import EspacosSection from "../components/EspacosSection";
import ExperienceSection from "../components/ExperienceSection";
import OperatingHoursSection from "../components/OperatingHoursSection";
import MapsSection from "../components/MapsSection";
import Footer from "../components/Footer";
import StickyLogo from "../components/StickyLogo";
import DrinkModal from "../components/DrinkModal";
import NavigationOverlay from "../components/NavigationOverlay";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Drink {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface ClientPageProps {
  initialDrinks: Drink[];
}

export default function ClientPage({ initialDrinks }: ClientPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reservationsVideoRef = useRef<HTMLVideoElement>(null);
  const stickyLogoRef = useRef<HTMLDivElement>(null);
  const drinkModalRef = useRef<HTMLDivElement>(null);
  const drinkModalContentRef = useRef<HTMLDivElement>(null);
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);

  const [animationComplete, setAnimationComplete] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [reservationsVideoLoaded, setReservationsVideoLoaded] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);

  // Use drinks from Sanity CMS (passed as props from server component)
  const drinks = initialDrinks;

  const openDrinkModal = (drink: Drink) => {
    setSelectedDrink(drink);
    setIsDrinkModalOpen(true);
    document.body.style.overflow = 'hidden';

    // Animate modal in
    gsap.set(drinkModalRef.current, { display: 'flex' });
    gsap.fromTo(drinkModalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(drinkModalContentRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
    );
  };

  const closeDrinkModal = () => {
    gsap.to(drinkModalContentRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power3.in"
    });
    gsap.to(drinkModalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => {
        setIsDrinkModalOpen(false);
        setSelectedDrink(null);
        document.body.style.overflow = 'auto';
        gsap.set(drinkModalRef.current, { display: 'none' });
      }
    });
  };

  useEffect(() => {
    const mainVideo = videoRef.current;
    const reservationsVideo = reservationsVideoRef.current;

    const mainCanPlay = () => setVideoLoaded(true);
    const reservationsCanPlay = () => setReservationsVideoLoaded(true);

    if (mainVideo) {
      mainVideo.preload = 'auto';
      mainVideo.addEventListener('canplaythrough', mainCanPlay);
      mainVideo.load();
    }

    if (reservationsVideo) {
      reservationsVideo.preload = 'auto';
      reservationsVideo.addEventListener('canplaythrough', reservationsCanPlay);
      reservationsVideo.load();
    }

    return () => {
      if (mainVideo) {
        mainVideo.removeEventListener('canplaythrough', mainCanPlay);
      }
      if (reservationsVideo) {
        reservationsVideo.removeEventListener('canplaythrough', reservationsCanPlay);
      }
    };
  }, []);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    gsap.to(mainContentRef.current, {
      opacity: 1,
      duration: 2,
      ease: "power2.out"
    });

    if (videoLoaded && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    if (reservationsVideoLoaded && reservationsVideoRef.current) {
      reservationsVideoRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    gsap.set(mainContentRef.current, { opacity: 0 });

    if (!animationVisible) {
      setAnimationComplete(true);
      gsap.set(mainContentRef.current, { opacity: 1 });
      if (videoLoaded && videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
      if (reservationsVideoLoaded && reservationsVideoRef.current) {
        reservationsVideoRef.current.play().catch(console.error);
      }
    }
  }, [animationVisible, videoLoaded, reservationsVideoLoaded]);

  useEffect(() => {
    if (animationComplete && videoLoaded && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    if (animationComplete && reservationsVideoLoaded && reservationsVideoRef.current) {
      reservationsVideoRef.current.play().catch(console.error);
    }
  }, [animationComplete, videoLoaded, reservationsVideoLoaded]);

  useEffect(() => {
    if (!animationComplete) return;

    const heroParallax = gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.set(stickyLogoRef.current, {
      opacity: 0,
      y: -50,
      scale: 0.8
    });

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom center",
      end: "bottom top",
      onEnter: () => {
        gsap.to(stickyLogoRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(stickyLogoRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.8,
          duration: 0.4,
          ease: "power3.in"
        });
      }
    });

    const sections = document.querySelectorAll('.animated-section');
    sections.forEach(section => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationComplete]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <NavigationOverlay isVisible={true} />

      <IntroAnimation
        isVisible={animationVisible && !animationComplete}
        onComplete={handleAnimationComplete}
      />

      <StickyLogo
        stickyLogoRef={stickyLogoRef}
        animationComplete={animationComplete}
      />

      <main
        ref={mainContentRef}
        className="relative z-10 min-h-screen"
        style={{
          display: animationComplete ? "block" : "none"
        }}
      >
        <HeroSection
          videoRef={videoRef}
          animationComplete={animationComplete}
          videoLoaded={videoLoaded}
        />

        <div id="drinks">
          <DrinksSection
            drinks={drinks}
            onDrinkClick={openDrinkModal}
          />
        </div>

        <EspacosSection />

        <div id="experience">
          <ExperienceSection
            reservationsVideoRef={reservationsVideoRef}
            animationComplete={animationComplete}
            reservationsVideoLoaded={reservationsVideoLoaded}
          />
        </div>

        <div id="maps">
          <MapsSection />
        </div>

        <OperatingHoursSection />

        <div id="footer">
          <Footer />
        </div>
      </main>

      <DrinkModal
        drinkModalRef={drinkModalRef}
        drinkModalContentRef={drinkModalContentRef}
        selectedDrink={selectedDrink}
        isDrinkModalOpen={isDrinkModalOpen}
        onClose={closeDrinkModal}
      />
    </div>
  );
}
