import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const container = useRef();
  const pencilRef = useRef();
  const darkCardRef = useRef();

  useGSAP(() => {
    // 1. Heading Reveal
    gsap.from(".philosophy-title", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".philosophy-title",
        start: "top 85%",
      }
    });

    // 2. Dark Card Reveal
    gsap.fromTo(darkCardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: darkCardRef.current,
          start: "top bottom-=100",
        }
      }
    );

    // 3. ILLUSTRATION PARALLAX
    gsap.to(pencilRef.current, {
      y: -150, 
      rotate: 4,
      scrollTrigger: {
        trigger: darkCardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-white overflow-visible pb-20 lg:pb-32">
      
      {/* --- SECTION 1: Static Dash Area --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 lg:pt-32 relative z-30">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="lg:pl-10">
            <h2 className="philosophy-title font-sentinel text-[48px] lg:text-[72px] text-[#000000] font-medium leading-[1.1] tracking-tight">
              Intentional, <br />
              Fun, & Effective
            </h2>
            <p className="font-jakarta text-slate-500 text-[16px] mt-6 max-w-sm leading-relaxed">
              The gamified platform that gives you clarity, skills, and direction built 
              for young Nigerians ready to become someone they're proud of.
            </p>
          </div>

          <div className="relative mt-12 lg:mt-0 lg:translate-y-64 pointer-events-none">
            <img 
              src="/assets/dash.webp" 
              alt="Dashboard" 
              className="w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.12)] lg:scale-125 origin-top-right"
            />
          </div>
        </div>
      </div>

      {/* --- SECTION 2: Dark Card --- */}
      <div className="w-full px-4 lg:px-24 mt-40 lg:mt-56">
        <div 
          ref={darkCardRef}
          /* items-start used to pull content to the top */
          className="max-w-[2100px] mx-auto rounded-[30px] relative overflow-hidden md:overflow-visible min-h-[600px] lg:min-h-[950px] flex items-start" 
          style={{ 
            backgroundColor: '#161616',
            backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.04) 0%, transparent 50%)'
          }}
        >
          {/* pt-12 and lg:pt-20 pulls the text closer to the top edge */}
          <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 w-full pt-12 lg:pt-20">
            
            <div className="flex flex-col justify-start items-start relative z-20">
              <div className="mb-8">
                <img 
                  src="/assets/built.png" 
                  alt="What we built" 
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </div>
              
              <h2 className="font-sentinel text-white text-[32px] md:text-[42px] lg:text-[68px] font-medium leading-[1.1] tracking-tight">
                A Structured Philosophy <br />
                and Growth System.
              </h2>
              
              <p 
                /* leading-relaxed reduces the line spacing from the previous version */
                className="font-jakarta text-[15px] lg:text-[17px] leading-relaxed max-w-2xl mt-6 lg:mt-8"
                style={{ color: '#A9A9A9' }}
              >
                Most people are overwhelmed, distracted, and guessing their way through life. 
                SmartGap fixes that. You move through structured modules that build how you 
                think, how you work, and how you make decisions. SmartGap is not a course, 
                it's a personalized, gamified platform that gives you clarity, direction, and the 
                tools to build a life on purpose.
              </p>
            </div>

            <div className="absolute bottom-[-100px] lg:bottom-[-750px] right-[-20px] lg:right-[-200px] z-0 lg:z-40 pointer-events-none">
              <img 
                ref={pencilRef}
                src="/assets/illustrate-1.webp" 
                alt="Growth Illustration" 
                className="w-[350px] lg:w-[750px] h-auto drop-shadow-2xl opacity-20 lg:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;