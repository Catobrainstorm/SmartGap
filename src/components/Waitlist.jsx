import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

const Waitlist = () => {
  const container = useRef();
  const cardRef = useRef();
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, "waitlist"), {
        fullName: formData.fullName,
        email: formData.email,
        timestamp: serverTimestamp()
      });
      setStatus('success');
      setFormData({ fullName: '', email: '' });
      alert("Welcome to the Elite. You're on the list!");
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%", 
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(cardRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    tl.from(".wait-text-anim", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");
  }, { scope: container });

  return (
    <footer id="waitlist-section" ref={container} className="w-full px-4 md:px-12 mt-20 mb-0">
      <div 
        ref={cardRef}
        className="max-w-[1700px] mx-auto rounded-t-[40px] md:rounded-t-[100px] rounded-b-none pt-16 md:pt-24 pb-48 md:pb-60 px-6 md:px-24 text-center relative overflow-hidden"
        style={{ 
          backgroundColor: '#161C24',
          backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(34, 197, 94, 0.15) 0%, transparent 70%)'
        }}
      >
        <div className="wait-text-anim flex justify-center mb-8 md:mb-10">
          <img src="/assets/limited.png" alt="Limited Access" className="h-10 md:h-12 w-auto object-contain" />
        </div>

        <h2 className="wait-text-anim font-sentinel text-white text-[36px] md:text-[84px] font-medium leading-[1.1] tracking-tight mb-6">
          {status === 'success' ? "You're in." : "Join the waitlist"}
        </h2>

        <p className="wait-text-anim font-jakarta text-slate-400 text-[14px] md:text-[16px] mb-12 w-full md:whitespace-nowrap leading-relaxed">
          {status === 'success' 
            ? "Check your inbox soon. The journey is about to begin." 
            : "Join the waitlist for early access to the Smart Gap Programme. Be the first in."}
        </p>

        <form onSubmit={handleSubmit} className="max-w-xs md:max-w-xl mx-auto space-y-4 relative z-30 mb-16 md:mb-20">
           <input 
             required
             type="text" 
             placeholder="FullName" 
             value={formData.fullName}
             onChange={(e) => setFormData({...formData, fullName: e.target.value})}
             className="w-full bg-[#1C2531]/60 border border-slate-700 rounded-2xl px-6 pt-7 pb-3 text-white font-jakarta focus:outline-none focus:border-[#22C55E] transition-all placeholder:opacity-40 text-sm md:text-base" 
           />
           
           {/* EMAIL INPUT WITH ICON ON THE LEFT */}
           <div className="relative">
             <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
             </div>
             <input 
               required
               type="email" 
               placeholder="Email Address" 
               value={formData.email}
               onChange={(e) => setFormData({...formData, email: e.target.value})}
               /* Added pl-14 to give space for the icon on the left */
               className="w-full bg-[#1C2531]/60 border border-slate-700 rounded-2xl pl-14 pr-6 py-5 md:py-6 text-white font-jakarta focus:outline-none focus:border-[#22C55E] transition-all text-sm md:text-base" 
             />
           </div>
          
          <button 
            disabled={status === 'loading'}
            type="submit" 
            className="w-full bg-gradient-to-r from-[#1EB551] to-[#2BCC56] text-white font-jakarta font-bold py-4 md:py-5 rounded-2xl shadow-2xl shadow-green-900/40 hover:brightness-110 active:scale-[0.98] transition-all text-sm md:text-base relative z-30 block disabled:opacity-50"
          >
            {status === 'loading' ? 'Processing...' : 'Secure your spot'}
          </button>
        </form>

        <div className="absolute bottom-8 left-0 w-full z-30">
          <p className="font-jakarta text-[11px] md:text-[13px] text-slate-500/60 uppercase tracking-[0.15em]">
            &copy; {currentYear} All Rights Reserved. Smartan House.
          </p>
        </div>

        <div className="absolute bottom-[-2%] md:bottom-[-5%] left-1/2 -translate-x-1/2 w-[150%] md:w-[110%] opacity-[0.08] pointer-events-none select-none z-0">
          <img src="/assets/logo.webp" alt="SmartGap Watermark" className="w-full h-auto object-contain" />
        </div>
      </div>
    </footer>
  );
};

export default Waitlist;