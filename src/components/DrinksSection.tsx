"use client";

import React, { useState } from "react";

interface Drink {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface DrinksSectionProps {
  drinks: Drink[];
  onDrinkClick: (drink: Drink) => void;
}

export default function DrinksSection({ drinks, onDrinkClick }: DrinksSectionProps) {
  const [showAll, setShowAll] = useState(false);
  
  // Show different amounts based on screen size and state
  const getVisibleDrinks = () => {
    if (showAll) {
      return drinks.slice(0, 8); // Always max 8 drinks
    }
    return drinks.slice(0, 3); // Show first 3 drinks initially on mobile (1 per row)
  };

  const getDesktopDrinks = () => {
    return drinks.slice(0, 8); // Desktop always shows 4x2 = 8 drinks
  };

  return (
    <section className="drinks-section animated-section">
      {/* Compact title section with background */}
      <div className="py-16 backdrop-blur-sm" style={{ backgroundColor: '#000000' }}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontWeight: 400 }}>
              Nossa Carta
            </h2>
            <div className="w-16 h-1 bg-white mx-auto" />
          </div>
        </div>
      </div>

      {/* Full width image grid - responsive layout, no background */}
      <div className="w-full">
        {/* Desktop: Always 4x2 grid */}
        <div className="hidden md:grid grid-cols-4 gap-0 w-full">
          {getDesktopDrinks().map((drink, index) => (
            <div key={drink.id} className="drink-card group cursor-pointer h-full relative" onClick={() => onDrinkClick(drink)}>
              <div className="relative aspect-square overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  style={{
                    filter: 'sepia(15%) saturate(120%) hue-rotate(15deg) brightness(0.9) contrast(1.1)',
                    boxShadow: 'inset 0 0 60px rgba(139, 97, 63, 0.3)'
                  }}
                />
                
                {/* Ambient Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-amber-800/30"></div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-black/70 to-amber-800/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-4 text-center">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-2 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {drink.name}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-4 mb-3">
                    {drink.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 1 image per row full width */}
        <div className="md:hidden grid grid-cols-1 gap-0 w-full">
          {getVisibleDrinks().map((drink, index) => (
            <div key={drink.id} className="drink-card group cursor-pointer h-full relative" onClick={() => onDrinkClick(drink)}>
              <div className="relative aspect-square overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  style={{
                    filter: 'sepia(15%) saturate(120%) hue-rotate(15deg) brightness(0.9) contrast(1.1)',
                    boxShadow: 'inset 0 0 60px rgba(139, 97, 63, 0.3)'
                  }}
                />
                
                {/* Ambient Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-amber-800/30"></div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-black/70 to-amber-800/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-4 text-center">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-2 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                    {drink.name}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-4 mb-3">
                    {drink.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        
        {/* Mobile buttons */}
        <div className="md:hidden">
          {/* Ver mais button - show when not all drinks are visible */}
          {!showAll && drinks.length > 3 && (
            <div className="flex justify-center py-8" style={{ backgroundColor: '#000000' }}>
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: '#000000',
                  fontFamily: "Georgia, serif",
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                Ver mais
              </button>
            </div>
          )}

          {/* Mostrar menos button - show when all drinks are visible */}
          {showAll && (
            <div className="flex justify-center py-8" style={{ backgroundColor: '#000000' }}>
              <button
                onClick={() => setShowAll(false)}
                className="px-8 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: '#000000',
                  fontFamily: "Georgia, serif",
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                Mostrar menos
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 