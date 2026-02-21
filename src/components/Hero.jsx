import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the ScrollToPlugin so GSAP can handle window scrolling
gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const container = useRef();
  const starRef = useRef();
  const guideRef = useRef();

  // Snappy scroll function (0.4s for elite responsiveness)
  const scrollToWaitlist = () => {
    gsap.to(window, {
      duration: 0.2,
      scrollTo: { y: "#waitlist-section", autoKill: false },
      ease: "power2.out"
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // 1. Set Initial States
    gsap.set(".char", { y: "110%", opacity: 0 });
    gsap.set(starRef.current, { y: 400, x: -50, scale: 0.5, opacity: 0, rotate: -45 });
    gsap.set(guideRef.current, { scale: 0, opacity: 0 });
    gsap.set(".hero-p", { opacity: 0, y: 20 });
    gsap.set(".hero-btn-wrapper", { opacity: 0, y: 30, scale: 0.95 });

    // 2. The Reveal Sequence
    tl.to(".char", {
      y: 0,
      opacity: 1,
      stagger: 0.02,
      duration: 1,
      delay: 0.3
    })
    .to(starRef.current, {
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out"
    }, "-=0.8")
    .to(guideRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.7")
    .to(".hero-p", { opacity: 0.8, y: 0, duration: 0.6 }, "-=0.4")
    .to(".hero-btn-wrapper", { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      duration: 0.8, 
      ease: "power3.out" 
    }, "-=0.4");

    // 3. Floating Animation for the Star
    gsap.to(starRef.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2 
    });

    // 4. Mouse Parallax Effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xMove = (clientX / window.innerWidth - 0.5) * 20;
      const yMove = (clientY / window.innerHeight - 0.5) * 20;
      gsap.to(starRef.current, { x: xMove, duration: 1, ease: "power2.out" });
      gsap.to(guideRef.current, { x: -xMove, y: -yMove, duration: 1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: container });

  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  return (
    <section 
      ref={container} 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-white"
    >
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] lg:w-[50%] h-[50%] bg-[#E8F0FF] blur-[100px] lg:blur-[120px] rounded-full opacity-60 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[60%] lg:w-[40%] h-[40%] bg-[#F5EFFF] blur-[100px] lg:blur-[120px] rounded-full opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 text-center z-10 pt-20">
        <h1 className="font-sentinel text-[44px] md:text-[80px] lg:text-[105px] font-medium leading-[1.1] lg:leading-[0.85] tracking-tight mb-8 lg:mb-16 text-[#000000]">
          <div className="overflow-hidden h-fit">{splitText("Raised")}</div>
          <div className="relative inline-block">
            <span className="relative z-20 overflow-hidden inline-block">{splitText("With")}</span>
            
            <img 
              ref={starRef}
              src="/assets/hero-star.webp" 
              className="absolute -left-8 top-0 w-12 lg:left-45 lg:w-38 z-30 pointer-events-none" 
              alt="Star"
            />

            <div className="relative inline-block ml-4 lg:ml-12">
              <span className="overflow-hidden inline-block">{splitText("Structure.")}</span>
              <img 
                ref={guideRef}
                src="/assets/hero-guide.webp" 
                className="absolute -top-10 left-4 w-32 lg:-top-15 lg:left-55 lg:w-[190px] z-10 opacity-90 pointer-events-none"
                alt="Guide UI"
              />
            </div>
          </div>
        </h1>
        
        <p className="hero-p font-jakarta text-[#000000] text-[14px] lg:text-[16px] mt-10 lg:mt-20 mb-10 opacity-80 max-w-[280px] lg:max-w-none mx-auto">
          A structured journey designed to shape how you think, build, and lead
        </p>

        {/* CLICKABLE IMAGE BUTTON */}
        <div className="flex justify-center">
          <button 
            onClick={scrollToWaitlist}
            className="hero-btn-wrapper appearance-none border-none bg-transparent p-0 cursor-pointer active:scale-95 transition-all duration-200 ease-out"
          >
            <img 
              src="/assets/waitlist.png" 
              alt="Join the waitlist" 
              className="w-[220px] md:w-[280px] h-auto drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;