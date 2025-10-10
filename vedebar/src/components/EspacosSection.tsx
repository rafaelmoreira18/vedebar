'use client';

import React, { useState, useEffect } from 'react';

interface EspacoItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const espacos: EspacoItem[] = [
  {
    id: 1,
    src: "/espaços/balcaoPrincipal.jpg",
    alt: "Balcão Principal",
    title: "Balcão Principal"
  },
 
  {
    id: 2,
    src: "/espaços/Lounge.jpg",
    alt: "Lounge",
    title: "Lounge"
  },
  {
    id: 3,
    src: "/espaços/VistaPanoramica.jpg",
    alt: "Vista Panorâmica",
    title: "Vista Panorâmica"
  },
  {
    id: 4,
    src: "/espaços/EspacoVede.jpg",
    alt: "Espaço Vedê",
    title: "Espaço Vedê"
  },
];

// Mobile Instagram Embed (Photos Only)
function MobileInstagramEmbed() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="md:hidden w-full px-4 instagram-embed-container">
      <style jsx global>{`
        .instagram-embed-container .instagram-media {
          max-height: 700px !important;
          overflow: hidden !important;
          padding: 0 !important;
          margin: 0 auto !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Hide ALL headers - multiple selectors to catch different structures */
        .instagram-embed-container header,
        .instagram-embed-container .Header,
        .instagram-embed-container [class*="Header"],
        .instagram-embed-container [class*="header"] {
          display: none !important;
        }

        /* Hide profile info */
        .instagram-embed-container a[href*="instagram.com"]:not(img),
        .instagram-embed-container [class*="Profile"],
        .instagram-embed-container [class*="profile"] {
          display: none !important;
        }

        /* Hide caption, likes, comments */
        .instagram-embed-container .EmbeddedMediaCaption,
        .instagram-embed-container .EmbeddedMediaCaptionPlaceholder,
        .instagram-embed-container .Caption,
        .instagram-embed-container .CaptionUsername,
        .instagram-embed-container .CaptionComments,
        .instagram-embed-container [class*="Caption"],
        .instagram-embed-container [class*="caption"] {
          display: none !important;
        }

        /* Hide footer and any links */
        .instagram-embed-container footer,
        .instagram-embed-container .Footer,
        .instagram-embed-container [class*="Footer"],
        .instagram-embed-container [class*="footer"] {
          display: none !important;
        }

        /* Keep only the image carousel */
        .instagram-embed-container img {
          display: block !important;
        }

        /* Remove white borders */
        .instagram-embed-container iframe {
          border: none !important;
        }

        /* Disable all clicks and remove pointer cursor */
        .instagram-embed-container * {
          pointer-events: none !important;
          cursor: default !important;
        }

        /* Re-enable pointer events only for carousel navigation */
        .instagram-embed-container button,
        .instagram-embed-container [role="button"] {
          pointer-events: auto !important;
        }
      `}</style>

      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0' }}>
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/p/DBuU2RWydoj/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          style={{
            background: 'transparent',
            border: 'none',
            borderRadius: '0',
            margin: '0 auto',
            maxWidth: '100%',
            minWidth: '100%',
            padding: 0,
            width: '100%',
            boxShadow: 'none'
          }}
        >
        </blockquote>
        {/* Overlay to hide top portion with header */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: '#000',
          zIndex: 10
        }}></div>
      </div>
    </div>
  );
}

export default function EspacosSection() {
  return (
    <section className="py-32 bg-black animated-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: "Georgia, serif" }}>
            Nossos Espaços
          </h2>
          <div className="w-16 h-1 bg-white mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Ambientes únicos pensados para proporcionar experiências inesquecíveis
          </p>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 gap-6 max-w-7xl mx-auto">
          {espacos.map((espaco) => (
            <div key={espaco.id} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl">
                <img
                  src={espaco.src}
                  alt={espaco.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                
                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center px-4" style={{ fontFamily: "Georgia, serif" }}>
                    {espaco.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Instagram Carousel (Photos Only) */}
        <MobileInstagramEmbed />
      </div>
    </section>
  );
} 