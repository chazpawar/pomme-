'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Spincock from "./bottom/spincock";


export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* 
   * ANIMATION SEQUENCE:
   * PHASE 1 (0-600px): DIET letters appear with blur effect
   * PHASE 2 (600-1100px): White text moves up and fades out  
   * PHASE 3 (1200-2000px): Coke image appears at bottom
   */

  // Calculate individual letter progress - PHASE 1: Letters appear first
  const getLetterProgress = (index: number, totalLetters: number) => {
    // Phase 1: Letters appear early in scroll (0-600px)
    const letterStart = (index / totalLetters) * 400; // Each letter starts earlier
    const letterEnd = letterStart + 150; // Each letter animates over 150px
    return Math.max(0, Math.min(1, (scrollY - letterStart) / (letterEnd - letterStart)));
  };

  // Calculate white text scroll animation - PHASE 2: After DIET letters are complete
  const getWhiteTextTransform = () => {
    // Phase 2: White text moves up after DIET letters are fully visible (600-1100px)
    const scrollProgress = Math.max(0, (scrollY - 600) / 500); // Start at 600px scroll, complete by 1100px
    const translateY = scrollProgress * -100; // Move up by 100vh
    const opacity = Math.max(0, 1 - scrollProgress * 2); // Fade out faster
    return { translateY, opacity };
  };



  // Calculate image position - PHASE 3: Image appears after white text is gone
  const getImagePosition = () => {
    // Phase 3: Image appears after white text has moved up (1200px onwards)
    const imageScrollStart = 1200; // Start after white text is gone
    const imageScrollEnd = 2000; // Fully positioned over 800px of scroll
    
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - imageScrollStart) / (imageScrollEnd - imageScrollStart)));
    
    // Image starts hidden below viewport and moves to bottom center when fully scrolled
    const translateY = (1 - scrollProgress) * 400 - 200; // Start 400px below viewport, move up 200px
    const opacity = Math.min(1, scrollProgress * 1.5); // Fade in gradually
    const scale = 0.7 + (scrollProgress * 0.3); // Scale from 70% to 100%
    
    return {
      opacity,
      scale,
      translateY: translateY
    };
  };

  // Check if text should be behind image (when they hit center)
  const shouldTextBeBehind = () => {
    // Check if image is visible and letters are hitting the center
    const imageVisible = imagePosition.opacity > 0.1; // Image has started appearing
    
    // Check if any letter has reached decent visibility (center hit)
    const lettersAtCenter = dietLetters.some((_, index) => 
      getLetterProgress(index, dietLetters.length) > 0.5
    );
    
    // Text goes behind immediately when both conditions are met
    return imageVisible && lettersAtCenter;
  };

  // Check if image and text have fully merged at bottom (for final transformation)
  const isFullyMerged = () => {
    // When image is at full opacity and scale, and letters are fully visible
    const imageAtBottom = imagePosition.opacity >= 0.9 && imagePosition.scale >= 0.9;
    const allLettersComplete = dietLetters.every((_, index) => 
      getLetterProgress(index, dietLetters.length) >= 0.9
    );
    return imageAtBottom && allLettersComplete;
  };
  
  const dietLetters = ["D", "i", "e", "t"];
  
  const whiteTextTransform = getWhiteTextTransform();
  const imagePosition = getImagePosition();
  const textBehindImage = shouldTextBeBehind();
  const fullyMerged = isFullyMerged();

    return (
    <>
      <div 
        className="min-h-[400vh] transition-colors duration-1000"
        style={{
          backgroundColor: fullyMerged ? '#000000' : '#DC2626' // Black when merged, red otherwise
        }}
      >
      <div className="flex flex-col items-center justify-center h-screen p-8 sticky top-0 relative overflow-hidden">
        
        {/* White text that scrolls up */}
        <div 
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-center max-w-6xl relative z-20"
          style={{
            transform: `translateY(${whiteTextTransform.translateY}vh)`,
            opacity: whiteTextTransform.opacity,
            transition: 'none'
          }}
        >
          <span className="opacity-0 animate-fade-in text-4xl md:text-6xl lg:text-8xl text-white uppercase tracking-wider" style={{fontFamily: 'Impact, Arial Black, sans-serif', animationDelay: '0ms'}}>
            With
          </span>
          <span className="opacity-0 animate-fade-in text-4xl md:text-6xl lg:text-8xl text-white uppercase tracking-wider" style={{fontFamily: 'Impact, Arial Black, sans-serif', animationDelay: '400ms'}}>
            great
          </span>
          <span className="opacity-0 animate-fade-in text-4xl md:text-6xl lg:text-8xl text-white uppercase tracking-wider" style={{fontFamily: 'Impact, Arial Black, sans-serif', animationDelay: '800ms'}}>
            power
          </span>
          <span className="opacity-0 animate-fade-in text-4xl md:text-6xl lg:text-8xl text-white uppercase tracking-wider" style={{fontFamily: 'Impact, Arial Black, sans-serif', animationDelay: '1200ms'}}>
            comes
          </span>
          <span className="opacity-0 animate-fade-in text-4xl md:text-6xl lg:text-8xl text-white uppercase tracking-wider" style={{fontFamily: 'Impact, Arial Black, sans-serif', animationDelay: '1600ms'}}>
            COKE
          </span>
         
        </div>
        
        {/* Coke Image - positioned at bottom of viewport when scrolled to bottom */}
        <div 
          className="absolute bottom-0 left-1/2"
          style={{
            transform: `translate(-50%, ${imagePosition.translateY}px) scale(${imagePosition.scale})`,
            opacity: imagePosition.opacity,
            transition: 'none',
            transformOrigin: 'center bottom',
            zIndex: textBehindImage ? 20 : 10 // Higher z-index when text should be behind
          }}
        >
          <Image
            src={fullyMerged ? "/3d/coke2.png" : "/3d/coke1.png"}
            alt="Coca Cola Bottle"
            width={400}
            height={600}
            className="object-contain transition-all duration-1000"
            priority
          />
        </div>
        
        {/* DIET letters that overlay on the image */}
        <div 
          className="absolute inset-0 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-center pointer-events-none"
          style={{
            zIndex: textBehindImage ? 15 : 30 // Lower z-index when behind image
          }}
        >
          {dietLetters.map((letter, index) => {
            const letterProgress = getLetterProgress(index, dietLetters.length);
            return (
              <span 
                key={index}
                className="text-10xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] tracking-wider transition-colors duration-1000"
                style={{
                  fontFamily: "'Loki Cola', sans-serif", 
                  fontWeight: 'normal',
                  opacity: letterProgress,
                  filter: `blur(${Math.max(0, 12 - letterProgress * 12)}px)`,
                  transform: `scale(${0.7 + letterProgress * 0.3})`,
                  transition: 'none',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                  color: fullyMerged ? '#DC2626' : '#000000' // Red when merged, black otherwise
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
       
      </div>
      
      {/* Spincock Component */}
      <Spincock />
    </>
    );
}
