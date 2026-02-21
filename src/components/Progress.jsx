import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  "XP, levels & leaderboards",
  "Daily streaks that keep you consistent",
  "Achievement badges to collect",
  "Real projects for your portfolio",
  "Certificates signed by Smartandad"
];

const Progress = () => {
  const container = useRef();
  const imageRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%", 
        toggleActions: "play none none reverse"
      }
    });

    // 1. THE IMAGE LANDING
    tl.fromTo(imageRef.current, 
      { 
        x: -800, 
        rotateY: 45, 
        rotateZ: -10, 
        scale: 0.8, 
        opacity: 0 
      },
      { 
        x: 0, 
        rotateY: 0, 
        rotateZ: 0, 
        scale: 1, 
        opacity: 1, 
        duration: 1.8, 
        ease: "expo.out" 
      }
    );

    // 2. THE CONTENT MAGNETISM
    tl.from(".progress-title", {
      x: 100,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1,
      ease: "power4.out"
    }, "-=1");

    tl.from(".progress-text", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.7");

    // Re-targeted the new image asset for the "Suction" Effect
    tl.from(".feature-item", {
      x: 80,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.5");

    // 3. IDLE FLOATING
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.8 
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-24 md:py-32 px-6 bg-white overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: The 3D Progress Asset */}
        <div className="relative flex justify-center items-center order-2 md:order-1">
          <img 
            ref={imageRef}
            src="/assets/progress.webp" 
            alt="Growth Progress" 
            className="progress-image w-full max-w-[520px] h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.08)]" 
          />
        </div>

        {/* Right Side: Content */}
        <div className="order-1 md:order-2">
          
          {/* IMAGE REPLACED "THE EXPERIENCE" BADGE */}
          <div className="feature-item mb-8">
            <img 
              src="/assets/experience.png" 
              alt="The Experience" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="progress-title font-sentinel text-5xl md:text-[72px] font-medium leading-[1.05] mb-8 bg-gradient-to-r from-[#B066FE] via-[#FF5F9E] to-[#FF8E53] bg-clip-text text-transparent tracking-tight">
            Progress You <br /> 
            Can See & Feel
          </h2>

          {/* Paragraph */}
          <p className="progress-text font-jakarta text-slate-500 text-[16px] leading-relaxed mb-10 max-w-md">
            SmartGap makes growth addictive. Watch your XP climb, your streaks build, and your badges unlock as you become the person you’re meant to be.
          </p>
          
          {/* List items */}
          <ul className="space-y-6">
            {features.map((item, i) => (
              <li key={i} className="feature-item flex items-start gap-4 text-[#161616] font-jakarta font-medium text-[16px]">
                <div className="w-6 h-6 rounded-md border-[1.5px] border-slate-300 flex items-center justify-center bg-white shrink-0 mt-0.5">
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5L4.5 8L11 1" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Progress;