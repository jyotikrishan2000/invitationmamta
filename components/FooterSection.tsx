"use client";

import { motion } from "framer-motion";
import { Share2, ArrowUp } from "lucide-react";
import { WEDDING_DATA } from "@/app/data/weddingData";
import { GoldFiligreeDivider } from "./Decoratives";

export function FooterSection() {
  const handleWhatsAppShare = () => {
    const shareUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const text = encodeURIComponent(
      `🙏 *${WEDDING_DATA.title}* 🙏\n${WEDDING_DATA.coupleLine}\n📅 दिनांक: ${WEDDING_DATA.weddingDateDisplay}\n📍 ${WEDDING_DATA.venueShort}\n\nपावन परिणय निमंत्रण देखने के लिए लिंक खोलें:\n${shareUrl}`
    );
    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <footer className="bg-damask-ivory py-14 sm:py-20 px-4 text-center relative overflow-hidden">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-full wax-seal flex items-center justify-center border-2 border-[#D4A64A] text-[#F6E4BD] font-display-hi text-2xl"
        >
          म & जि
        </motion.div>

        <h3 className="font-display-hi text-2xl sm:text-4xl text-[#721022] mt-2 leading-snug">
          {WEDDING_DATA.closingMessage}
        </h3>

        <GoldFiligreeDivider />

        <p className="text-sm sm:text-base font-semibold text-[#2B1F1D]">
          {WEDDING_DATA.coupleLine}
        </p>
        <p className="text-xs sm:text-sm text-[#8B3A4B]">
          {WEDDING_DATA.weddingDateHindi} • {WEDDING_DATA.venueShort}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-2 rounded-full bg-[#1B7A43] text-white px-6 py-3 text-sm font-semibold shadow-md hover:bg-[#156235] transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp ग्रुप में शेयर करें</span>
          </button>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#721022]/35 bg-[#FFFDF8] text-[#721022] px-5 py-3 text-sm font-semibold hover:bg-[#FAF3EA] transition cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>ऊपर जाएं</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
