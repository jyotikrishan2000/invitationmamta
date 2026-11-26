"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";
import { WEDDING_DATA } from "@/app/data/weddingData";

interface CoverRevealProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function CoverReveal({ isOpen, onOpen }: CoverRevealProps) {
  const handleReveal = () => {
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.65 },
      colors: ["#E7C475", "#5E0B15", "#FDF7E7", "#2D6A3E", "#F59E0B"],
    });
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="cover-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy-paper p-3 sm:p-6 overflow-y-auto"
        >
          {/* Outer burnished gold border */}
          <div className="fixed inset-2.5 sm:inset-5 border border-[#E7C475]/45 rounded-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onClick={handleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleReveal();
            }}
            className="relative w-full max-w-sm sm:max-w-2xl cursor-pointer rounded-[26px] overflow-hidden border-2 border-[#E7C475] shadow-[0_28px_80px_rgba(20,2,5,0.75)] bg-[#FFFBF0]"
          >
            {/* Mobile: Real Vertical Couple Card */}
            <div className="block sm:hidden relative w-full aspect-[9/15]">
              <Image
                src="/images/couple-clean.jpg"
                alt={WEDDING_DATA.coupleLine}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#3E060D]/90 via-[#3E060D]/45 to-transparent" />
            </div>

            {/* Desktop: Real Landscape Couple Card */}
            <div className="hidden sm:block relative w-full aspect-[3/2]">
              <Image
                src="/images/couple-clean.jpg"
                alt={WEDDING_DATA.coupleLine}
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 640px) 672px"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#3E060D]/85 via-[#3E060D]/40 to-transparent" />
            </div>

            {/* Floating Tap-to-Open Royal Wax Seal CTA */}
            <div className="absolute inset-x-0 bottom-4 sm:bottom-5 flex flex-col items-center gap-1.5 px-4 z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2.5 rounded-full wax-seal px-7 py-3 text-sm sm:text-base font-bold text-[#FFFBF0] border-2 border-[#E7C475]"
              >
                <Sparkles className="w-4 h-4 text-[#E7C475]" />
                <span>निमंत्रण खोलें</span>
              </motion.div>
              <p className="text-[11px] sm:text-xs text-[#FFF3CE] font-medium drop-shadow">
                {WEDDING_DATA.weddingDateDisplay} • देखने के लिए टैप करें
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
