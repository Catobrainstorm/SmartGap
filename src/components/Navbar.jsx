import React from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const scrollToWaitlist = () => {
    gsap.to(window, {
      duration: 0.2, // Fast and snappy
      scrollTo: { 
        y: "#waitlist-section", 
        autoKill: false 
      },
      ease: "power2.out" // This starts fast and decelerates smoothly
    });
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-8 md:py-12">
        <div className="flex items-center">
          <img 
            src="/assets/logo.webp" 
            alt="SmartGap" 
            className="h-6 md:h-7 w-auto object-contain" 
            fetchPriority="high" 
          />
        </div>

        <div className="flex items-center">
          <button 
            onClick={scrollToWaitlist}
            className="font-jakarta text-black text-[13px] md:text-[15px] font-semibold border border-black/15 px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            Join the waitlist
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;