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

export default function Page() {
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
  const [animationVisible, setAnimationVisible] = useState(true); // Toggle for development
  const [selectedDrink, setSelectedDrink] = useState<typeof drinks[0] | null>(null);
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);

  const drinks = [
    {
      id: 1,
      name: "Aquariano",
      description: "gin beg tropical . gin london dry . limão . triple sec . xarope de violeta",
      image: "/bebidas/01.jpg"
    },
    {
      id: 2,
      name: "Tropical 43",
      description: "Licor 43 . Maracuja . Espumante Brut . Grenadine",
      image: "/bebidas/02.jpg"
    },
    {
      id: 3,
      name: "Hanami",
      description: "Vodka Haku . Purê de Yuzu . Missô . Bitter de Laranja . Flor de Sabugueiro",
      image: "/bebidas/03.jpg"
    },
    {
      id: 6,
      name: "Batuque",
      description: "Whisky Burbon . Brandy Jerez . Fireball . Purê de Pera . Limão . Mel",
      image: "/bebidas/06.jpg"
    },
    {
      id: 7,
      name: "Iça Manauara",
      description: "Cachaça de Jambu . Maracujá . Amora . Elixir de Pixuri . Espuma de Açaí",
      image: "/bebidas/07.jpg"
    },
    {
      id: 8,
      name: "Jabuti",
      description: "Gin . Jabuticaba . Limão Siciliano . Bitter Citrico",
      image: "/bebidas/08.jpg"
    },
    {
      id: 9,
      name: "Renascentista",
      description: "Makers Mark . Limão . Amora . Licor de Cassis . Angostura",
      image: "/bebidas/09.jpg"
    },
    {
      id: 10,
      name: "Jangadinha",
      description: "Spiced Rum . Gengibre . Hortelã . Limão . Bitter de laranja",
      image: "/bebidas/11.jpg"
    }
  ];

  const openDrinkModal = (drink: typeof drinks[0]) => {
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
    
    // Start videos when animation completes and videos are loaded
    if (videoLoaded && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    if (reservationsVideoLoaded && reservationsVideoRef.current) {
      reservationsVideoRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    // Initial setup
    gsap.set(mainContentRef.current, { opacity: 0 });

    if (!animationVisible) {
      // Skip animation if disabled
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

  // Start videos when both animation is complete and videos are loaded
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

    // Hero parallax effect
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

    // Sticky logo animation
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
        // Logo appears and stays white - now has good contrast with green background
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


    // Section animations
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


  const handleDrinkClick = (drink: typeof drinks[0]) => {
    setSelectedDrink(drink);
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Navigation Overlay - Always visible */}
      <NavigationOverlay isVisible={true} />

      {/* Intro Animation */}
      <IntroAnimation 
        isVisible={animationVisible && !animationComplete}
        onComplete={handleAnimationComplete}
      />

      {/* Sticky Logo */}
      <StickyLogo
        stickyLogoRef={stickyLogoRef}
        animationComplete={animationComplete}
      />

      {/* Main Content */}
      <main
        ref={mainContentRef}
        className="relative z-10 min-h-screen"
        style={{
          display: animationComplete ? "block" : "none"
        }}
      >
        {/* Hero Section */}
        <HeroSection 
          videoRef={videoRef}
          animationComplete={animationComplete}
          videoLoaded={videoLoaded}
        />

        {/* Drinks Collection */}
        <div id="drinks">
          <DrinksSection 
            drinks={drinks}
            onDrinkClick={openDrinkModal}
          />
        </div>

         {/* Nossos Espaços Section */}
         <EspacosSection />

         {/* Experience Section */}
         <div id="experience">
           <ExperienceSection
            reservationsVideoRef={reservationsVideoRef}
            animationComplete={animationComplete}
            reservationsVideoLoaded={reservationsVideoLoaded}
          />
         </div>


        {/* Google Maps Section */}
        <div id="maps">
          <MapsSection />
        </div>

        {/* Operating Hours Section */}
        <OperatingHoursSection />

        {/* Footer */}
        <div id="footer">
          <Footer />
        </div>
      </main>

      {/* Individual Drink Modal */}
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