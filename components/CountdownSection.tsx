"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CalendarHeart, Sparkles } from "lucide-react";
import { WEDDING_DATA } from "@/app/data/weddingData";
import { GoldFiligreeDivider, TornPaperDivider } from "./Decoratives";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date(WEDDING_DATA.weddingIsoTarget).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownSection() {
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const initialUpdate = window.setTimeout(() => setTimeLeft(getTimeLeft()), 0);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => {
      window.clearTimeout(initialUpdate);
      clearInterval(timer);
    };
  }, []);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#F6E4BD", "#D4A64A", "#FFFDF8", "#E77C91"],
      });
    }
  };

  const dials = [
    { label: "दिन", value: timeLeft.days },
    { label: "घंटे", value: timeLeft.hours },
    { label: "मिनट", value: timeLeft.minutes },
    { label: "सेकंड", value: timeLeft.seconds },
  ];

  return (
    <section className="bg-burgundy-paper text-[#FFFDF8] pt-12 sm:pt-16 pb-0 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs sm:text-sm tracking-[0.2em] text-[#F6E4BD] uppercase">
            शुभ मुहूर्त
          </p>
          <h2 className="font-display-hi text-3xl sm:text-5xl text-[#FFFDF8] mt-1">
            तारीख़ सहेज कर रखें
          </h2>
          <GoldFiligreeDivider dark />
          <p className="text-sm sm:text-base text-[#F6E4BD]/85 max-w-md mx-auto">
            इस शाही मुहर पर टैप करें और हमारे शुभ विवाह की प्रतीक्षा घड़ी देखें।
          </p>
        </motion.div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.button
                key="seal-card"
                type="button"
                onClick={handleReveal}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.96 }}
                className="mx-auto w-full max-w-sm rounded-3xl bg-[#FFFDF8] text-[#2B1F1D] p-7 sm:p-9 border-2 border-[#D4A64A] shadow-2xl cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full wax-seal flex items-center justify-center border-2 border-[#F6E4BD]/60 text-[#F6E4BD]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#721022]">
                  शुभ तिथि देखने के लिए टैप करें
                </span>
                <span className="text-xs text-[#8A7568] tracking-wider uppercase">
                  TAP TO REVEAL DATE
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="revealed-countdown"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="mx-auto max-w-xl rounded-3xl bg-[#4A0814]/60 backdrop-blur-md border border-[#D4A64A]/55 p-6 sm:p-9 shadow-2xl"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-[#D4A64A]/20 border border-[#D4A64A]/50 px-4 py-1.5 text-xs sm:text-sm text-[#F6E4BD] mb-3">
                  <CalendarHeart className="w-4 h-4" />
                  <span>हस्त मिलाप शुभ लग्न</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold text-[#FFFDF8] font-cinzel tracking-wider">
                  {WEDDING_DATA.weddingDateDisplay}
                </h3>
                <p className="text-sm sm:text-base text-[#F6E4BD] mt-1 mb-6">
                  {WEDDING_DATA.weddingDateHindi} • सुबह 8:00 बजे
                </p>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-5">
                  {dials.map((d) => (
                    <div
                      key={d.label}
                      className="rounded-2xl bg-[#FFFDF8]/10 border border-[#F6E4BD]/30 py-3.5 sm:py-5 px-2 flex flex-col items-center justify-center"
                    >
                      <span className="text-2xl sm:text-4xl font-bold text-[#F6E4BD] font-cinzel tabular-nums">
                        {String(d.value).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#FFFDF8]/85 mt-1">
                        {d.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <TornPaperDivider fill="#FDF7E7" />
    </section>
  );
}
