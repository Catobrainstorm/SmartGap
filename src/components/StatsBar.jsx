import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, label: "Weeks to Transform" },
  { value: 20, label: "Core Modules" },
  { value: 5, label: "Pathways", prefix: "0" },
  { value: 1, label: "Generation Built", prefix: "0" }
];

const StatsBar = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 95%",
      }
    });

    tl.fromTo(container.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    stats.forEach((_, index) => {
      const numRef = `.num-${index}`;
      
      tl.fromTo(numRef, 
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power4.out" }, 
        "-=0.25"
      );

      tl.fromTo(numRef,
        { innerText: 0 },
        {
          innerText: stats[index].value,
          duration: 0.6,
          snap: { innerText: 1 },
          ease: "expo.out",
        },
        "<" 
      );
    });

    tl.from(".stat-label", {
      opacity: 0,
      y: 5,
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.out"
    }, "-=0.4");

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="w-full border-y-2 border-[#E2E8F0] py-12 md:py-16 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-4 items-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center group">
            
            <div className="relative">
                <h3 className="relative font-sentinel text-[32px] md:text-[40px] font-medium flex items-baseline text-black leading-none">
                  {stat.prefix && (
                    <span>{stat.prefix}</span>
                  )}
                  <span className={`stat-number num-${index}`}>
                    0
                  </span>
                </h3>
            </div>
            
            {/* Removed 'uppercase' - now follows the casing in the stats array */}
            <p className="stat-label font-jakarta text-[12px] md:text-[14px] text-black font-medium mt-3 opacity-90 tracking-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;