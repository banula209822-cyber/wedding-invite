"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, Sparkles, Music, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveRSVPToDb } from './actions'; // අර හදපු action එක import කරනවා

export default function UltimateWeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [rsvpData, setRsvpData] = useState({ name: '', guests: '1', kids: '0', hotel: 'polhena' });
  const [isSending, setIsSending] = useState(false);
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

  const sendRSVP = async () => {
    if (!rsvpData.name) {
      alert("කරුණාකර ඔබේ නම ඇතුළත් කරන්න.");
      return;
    }

    setIsSending(true);

    try {
      // 1. Database එකට Save කිරීම (පට්ටම වැදගත් කෑල්ල)
      const dbResult = await saveRSVPToDb(rsvpData);
      
      // 2. Google Form එකට යැවීම
      const formURL = "https://docs.google.com/forms/d/e/1_Hnro3p2o8i7xDOZdt7G2xlFsSTBZTsSeaOUHuNoVnPY/formResponse";
      const formData = new FormData();
      formData.append("entry.65316672", rsvpData.name);   
      formData.append("entry.991259989", rsvpData.guests); 
      formData.append("entry.704811431", rsvpData.kids);
      formData.append("entry.384687127", rsvpData.hotel);

      fetch(formURL, { method: "POST", mode: "no-cors", body: formData })
        .catch(err => console.log("Form error:", err));

      // 3. WhatsApp Message එක
      const phoneNumber = "94703515466"; 
      const message = `අපේ මගුල් ගෙදර ඇවිත් යන්න එන්න... ආරාධනාවයි ❤️ %0A%0A*RSVP විස්තර:* %0Aනම: ${rsvpData.name} %0Aවැඩිහිටියන්: ${rsvpData.guests} %0Aළමයින්: ${rsvpData.kids} %0Aහෝටලය: ${rsvpData.hotel}`;
      
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      
      if (dbResult.success) {
        alert("ස්තූතියි! ඔබගේ RSVP විස්තර සාර්ථකව ලැබුණා.");
      } else {
        alert("විස්තර ලැබුණා, නමුත් database එකේ පොඩි අවුලක්. කරුණාකර WhatsApp පණිවිඩය එවන්න.");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("පොඩි අවුලක් වුණා. ආයෙත් උත්සාහ කරන්න.");
    } finally {
      setIsSending(false);
    }
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

            <div className="h-[90vh] w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/couple.jpg')" }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#faf8f5]" />
              <div className="absolute bottom-10 left-0 right-0 text-center text-white">
                <h2 className="text-4xl md:text-6xl font-light italic drop-shadow-2xl">The Beginning of Forever</h2>
              </div>
            </div>

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

            <div className="py-24 max-w-2xl mx-auto px-6 text-center">
              <div className="bg-white p-10 md:p-20 rounded-[60px] shadow-2xl border border-stone-50">
                <Heart className="mx-auto text-rose-200 mb-8" fill="currentColor" size={45} />
                <h2 className="text-3xl font-light mb-12 tracking-widest uppercase">RSVP</h2>
                
                <div className="space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-5">Guest Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})} 
                      className="w-full bg-stone-50 rounded-full px-8 py-5 outline-none text-stone-800" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-5">Adults</label>
                      <input 
                        type="number" 
                        min="1"
                        value={rsvpData.guests}
                        placeholder="No. of Adults" 
                        onChange={(e) => setRsvpData({...rsvpData, guests: e.target.value})} 
                        className="w-full bg-stone-50 rounded-full px-8 py-5 outline-none text-stone-800" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-5">Kids</label>
                      <input 
                        type="number" 
                        min="0"
                        value={rsvpData.kids}
                        placeholder="No. of Kids" 
                        onChange={(e) => setRsvpData({...rsvpData, kids: e.target.value})} 
                        className="w-full bg-stone-50 rounded-full px-8 py-5 outline-none text-stone-800" 
                      />
                    </div>
                  </div>

                  <button 
                    onClick={sendRSVP} 
                    disabled={isSending}
                    className="w-full mt-8 bg-stone-900 text-white rounded-full py-5 font-bold tracking-widest uppercase text-[10px] hover:bg-stone-800 transition-all disabled:opacity-50"
                  >
                    {isSending ? "Sending..." : "Confirm & Send RSVP"}
                  </button>
                </div>
              </div>
            </div>

            <div className="py-24 text-center bg-stone-900 text-white px-6">
              <MapPin className="mx-auto text-[#d4af37] mb-8" size={40} />
              <h2 className="text-3xl font-light uppercase tracking-[0.3em] mb-4">The Venue</h2>
              <div className="mb-10">
                <select 
                  value={rsvpData.hotel}
                  onChange={(e) => setRsvpData({...rsvpData, hotel: e.target.value})}
                  className="bg-stone-800 border border-[#d4af37] rounded-full px-6 py-2 text-stone-200 outline-none cursor-pointer"
                >
                  <option value="polhena">Polhena Grand Resort</option>
                  <option value="custom">Other Hotel</option>
                </select>
              </div>
              <p className="text-stone-400 italic mb-10">Polhena Grand Resort & Banquet, Matara</p>
              <a href="https://maps.app.goo.gl/..." target="_blank" className="inline-block px-14 py-5 border border-[#d4af37] text-[#d4af37] rounded-full text-[10px] font-bold tracking-widest hover:bg-[#d4af37]">GET DIRECTIONS</a>
            </div>

            <footer className="py-20 text-center opacity-30 text-[9px] uppercase tracking-[0.6em]">Designed for Janani & Denuwan | 2026</footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}