"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, Sparkles, Music, VolumeX, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UltimateWeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("August 14, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [rsvpData, setRsvpData] = useState({ name: '', guests: '1', kids: '0' });
  const sendRSVP = () => {
    const phoneNumber = "94771234567"; 
    const message = `*Wedding RSVP*%0A*Name:* ${rsvpData.name}%0A*Adults:* ${rsvpData.guests}%0A*Kids:* ${rsvpData.kids}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleStart = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(e => console.log("Audio error:", e));
    }
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d4af37', '#ffffff'] });
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-800 font-serif overflow-x-hidden">
      <audio ref={audioRef} loop src="/wedding-song.mp3" />

      <AnimatePresence>
        {!isOpen ? (
          <motion.div 
            key="cover"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <div className="relative text-center space-y-8 p-10">
              <Sparkles size={45} className="text-[#d4af37] mx-auto animate-pulse" />
              <div className="space-y-4 text-white">
                <h2 className="tracking-[0.8em] text-[10px] uppercase opacity-50">Save Our Date</h2>
                <h1 className="text-6xl md:text-8xl font-light tracking-tighter">Janani <span className="text-[#d4af37]">&</span> Denuwan</h1>
                <p className="text-[#d4af37] tracking-[0.4em] text-xs font-bold uppercase">August 14 . 2026</p>
              </div>
              <button onClick={handleStart} className="mt-12 px-16 py-5 border border-[#d4af37] text-[#d4af37] rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-[#d4af37] hover:text-black transition-all">Open Invitation</button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={() => { if(isPlaying) audioRef.current?.pause(); else audioRef.current?.play(); setIsPlaying(!isPlaying); }} className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md shadow-2xl p-4 rounded-full">
              {isPlaying ? <Music className="text-[#d4af37] animate-bounce" size={20}/> : <VolumeX size={20}/>}
            </button>

            {/* Hero Image */}
            <div className="h-[90vh] w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/couple.jpg')" }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#faf8f5]" />
              <div className="absolute bottom-10 left-0 right-0 text-center text-white">
                <h2 className="text-4xl md:text-6xl font-light italic drop-shadow-2xl">The Beginning of Forever</h2>
              </div>
            </div>

            {/* Countdown */}
            <div className="max-w-4xl mx-auto py-24 px-6 text-center">
              <div className="grid grid-cols-4 gap-3 md:gap-6">
                {[
                  { label: 'Days', val: timeLeft.days },
                  { label: 'Hours', val: timeLeft.hours },
                  { label: 'Mins', val: timeLeft.minutes },
                  { label: 'Secs', val: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-5 md:p-8 rounded-[30px] shadow-sm border border-stone-100">
                    <p className="text-2xl md:text-5xl font-light">{item.val}</p>
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 mt-2">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Section - Updated Names with Spaces */}
            <div className="py-24 bg-stone-50">
              <div className="max-w-6xl mx-auto px-6">
                <h3 className="text-center text-2xl font-light tracking-[0.3em] uppercase mb-16">Our Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="rounded-[40px] overflow-hidden shadow-xl h-[500px]">
                    <img src="/couple-gallery 1.jpg" className="w-full h-full object-cover" alt="Gallery 1" />
                  </div>
                  <div className="rounded-[40px] overflow-hidden shadow-xl h-[500px] md:mt-16">
                    <img src="/couple-gallery 2.jpg" className="w-full h-full object-cover" alt="Gallery 2" />
                  </div>
                  <div className="rounded-[40px] overflow-hidden shadow-xl h-[500px]">
                    <img src="/couple-gallery 3.jpg" className="w-full h-full object-cover" alt="Gallery 3" />
                  </div>
                </div>
              </div>
            </div>

            {/* --- UPDATED RSVP SECTION WITH TEXT INPUTS --- */}
<div className="py-24 max-w-2xl mx-auto px-6 text-center">
  <div className="bg-white p-10 md:p-20 rounded-[60px] shadow-2xl border border-stone-50">
    <Heart className="mx-auto text-rose-200 mb-8" fill="currentColor" size={45} />
    <h2 className="text-3xl font-light mb-12 tracking-widest uppercase">RSVP</h2>
    
    <div className="space-y-6 text-left">
      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-5">Guest Name</label>
        <input 
          type="text" 
          placeholder="Your Name" 
          onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})} 
          className="w-full bg-stone-50 rounded-full px-8 py-5 outline-none text-stone-800" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Adults Input */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-5">Adults</label>
          <input 
            type="number" 
            min="1"
            placeholder="No. of Adults" 
            onChange={(e) => setRsvpData({...rsvpData, guests: e.target.value})} 
            className="w-full bg-stone-50 rounded-full px-8 py-5 outline-none text-stone-800" 
          />
        </div>
        
        {/* Kids Input */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-5">Kids</label>
          <input 
            type="number" 
            min="0"
            placeholder="No. of Kids" 
            onChange={(e) => setRsvpData({...rsvpData, kids: e.target.value})} 
            className="w-full bg-stone-50 rounded-full px-8 py-5 outline-none text-stone-800" 
          />
        </div>
      </div>

      <button 
        onClick={sendRSVP} 
        className="w-full py-6 bg-stone-900 text-[#d4af37] rounded-full font-bold uppercase text-[10px] tracking-widest mt-8 flex items-center justify-center gap-3"
      >
        <Send size={14} /> Confirm via WhatsApp
      </button>
    </div>
  </div>
</div>
            {/* Venue Section - Updated with Image */}
            <div className="max-w-4xl mx-auto px-6 mb-12">
              <img src="/hotel.jpg" className="w-full h-96 object-cover rounded-[40px] shadow-2xl border-4 border-white" alt="Polhena Reef Resort" />
            </div>

            <div className="py-24 text-center bg-stone-900 text-white px-6">
               <MapPin className="mx-auto text-[#d4af37] mb-8" size={40} />
               <h2 className="text-3xl font-light uppercase tracking-[0.3em] mb-4">The Venue</h2>
               <p className="text-stone-400 italic mb-10">Polhena Reef Resort, Polhena,Matara</p>
              <a 
  href="https://maps.app.goo.gl/r6V8Fk9A9T6N9K2U9" 
  target="_blank" 
  className="inline-block px-14 py-5 border border-[#d4af37] text-[#d4af37] rounded-full text-[10px] font-bold tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
>
  GET DIRECTIONS
</a>
            </div>

            <footer className="py-20 text-center opacity-30 text-[9px] uppercase tracking-[0.6em]">Designed for Janani & Denuwan | 2026</footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}