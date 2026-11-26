"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CalendarPlus,
  MapPin,
  Clock,
  BookOpen,
} from "lucide-react";
import { WEDDING_DATA, WeddingEvent } from "@/app/data/weddingData";
import { GoldFiligreeDivider, TornPaperDivider } from "./Decoratives";

function getGoogleCalendarUrl(ev: WeddingEvent) {
  const title = encodeURIComponent(`${ev.title} — ${WEDDING_DATA.coupleLine}`);
  const details = encodeURIComponent(
    `${ev.subtitle} | ${WEDDING_DATA.closingMessage}`
  );
  const location = encodeURIComponent(ev.venue);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${ev.isoStart}/${ev.isoEnd}&details=${details}&location=${location}&ctz=Asia/Kolkata`;
}

export function FunctionsBook() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const events = WEDDING_DATA.events;
  const activeEvent = events[index];

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex(nextIndex);
  };

  const prev = () => goTo(index === 0 ? events.length - 1 : index - 1);
  const next = () => goTo(index === events.length - 1 ? 0 : index + 1);

  return (
    <section className="bg-damask-ivory pt-12 sm:pt-16 pb-0 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#9A7228] uppercase">
            शुभ अवसर
          </p>
          <h2 className="font-display-hi text-3xl sm:text-5xl text-[#721022] mt-1">
            मांगलिक कार्यक्रम
          </h2>
          <GoldFiligreeDivider />
        </motion.div>

        <div className="mt-8 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!isBookOpen ? (
              /* Hardcover Storybook Cover */
              <motion.div
                key="book-cover"
                initial={{ opacity: 0, rotateY: -12 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 20, scale: 0.96 }}
                transition={{ duration: 0.55 }}
                onClick={() => setIsBookOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsBookOpen(true);
                }}
                className="cursor-pointer rounded-[28px] bg-burgundy-paper text-[#FFFDF8] p-7 sm:p-10 border-2 border-[#D4A64A] shadow-[0_24px_60px_rgba(74,8,20,0.35)] relative overflow-hidden"
              >
                <div className="absolute inset-3 rounded-[20px] border border-[#F6E4BD]/35 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <BookOpen className="w-10 h-10 text-[#F6E4BD]" />
                  <h3 className="font-display-hi text-3xl sm:text-4xl text-[#F6E4BD]">
                    विवाह कार्यक्रम पुस्तिका
                  </h3>

                  {/* Compact Schedule Overview on Cover */}
                  <div className="w-full mt-2 space-y-2 text-left bg-[#4A0814]/55 rounded-2xl p-4 sm:p-5 border border-[#D4A64A]/30">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex items-center justify-between text-xs sm:text-sm border-b border-[#F6E4BD]/15 last:border-none pb-1.5 last:pb-0 gap-2"
                      >
                        <span className="font-semibold text-[#FFFDF8]">
                          {ev.number}. {ev.title}
                        </span>
                        <span className="text-[#F6E4BD] shrink-0">
                          {ev.date} • {ev.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#F6E4BD] text-[#6B0F20] px-6 py-2.5 text-sm font-bold shadow-md">
                    विस्तार से देखने के लिए टैप करें
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Open Two-Page / Mobile Stacked Event Spread */
              <motion.div
                key="book-open"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-[28px] bg-[#FFFDF8] border-2 border-[#D4A64A]/70 shadow-[0_20px_60px_rgba(114,16,34,0.16)] overflow-hidden"
              >
                {/* Book Top Bar */}
                <div className="bg-[#721022] text-[#F6E4BD] px-5 py-3 flex items-center justify-between text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={() => setIsBookOpen(false)}
                    className="hover:underline cursor-pointer"
                  >
                    ← कवर पर वापस जाएं
                  </button>
                  <span className="font-cinzel tracking-widest font-semibold">
                    {activeEvent.number} / 0{events.length}
                  </span>
                </div>

                {/* Animated Event Page */}
                <div className="p-6 sm:p-10 min-h-[340px] flex flex-col justify-between">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeEvent.id}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -40 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="space-y-4"
                    >
                      <span className="inline-block rounded-full bg-[#FAF3EA] border border-[#C9A05A]/50 px-4 py-1 text-xs font-semibold text-[#9A7228]">
                        {activeEvent.accent}
                      </span>

                      <h3 className="font-display-hi text-3xl sm:text-4xl text-[#721022]">
                        {activeEvent.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5C4A42]">
                        {activeEvent.subtitle}
                      </p>

                      <div className="mt-4 rounded-2xl bg-[#FAF3EA] border border-[#C9A05A]/35 p-4 sm:p-5 space-y-2.5 text-sm sm:text-base text-[#2B1F1D]">
                        <div className="flex items-center justify-center gap-2 font-semibold text-[#721022]">
                          <Clock className="w-4 h-4 shrink-0" />
                          <span>
                            {activeEvent.day}, {activeEvent.date} •{" "}
                            {activeEvent.time}
                          </span>
                        </div>
                        <div className="flex items-start justify-center gap-2 text-[#5C4A42] text-xs sm:text-sm">
                          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#9A7228]" />
                          <span>{activeEvent.venue}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={WEDDING_DATA.mapsQueryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#721022] text-[#FFFDF8] px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[#5A0C1A] transition"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>लोकेशन देखें</span>
                        </a>
                        <a
                          href={getGoogleCalendarUrl(activeEvent)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#9A7228] text-[#721022] px-4 py-2 text-xs sm:text-sm font-medium hover:bg-[#FAF3EA] transition"
                        >
                          <CalendarPlus className="w-3.5 h-3.5" />
                          <span>कैलेंडर में जोड़ें</span>
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Pagination Controls */}
                  <div className="mt-7 pt-4 border-t border-[#C9A05A]/25 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prev}
                      className="inline-flex items-center gap-1 rounded-full border border-[#C9A05A]/60 px-4 py-2 text-xs sm:text-sm font-medium text-[#721022] hover:bg-[#FAF3EA] cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>पिछला</span>
                    </button>

                    <div className="flex gap-1.5">
                      {events.map((ev, i) => (
                        <button
                          key={ev.id}
                          type="button"
                          aria-label={ev.title}
                          onClick={() => goTo(i)}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            i === index
                              ? "w-6 bg-[#721022]"
                              : "w-2.5 bg-[#C9A05A]/45"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-1 rounded-full bg-[#721022] px-4 py-2 text-xs sm:text-sm font-medium text-[#FFFDF8] hover:bg-[#5A0C1A] cursor-pointer"
                    >
                      <span>अगला</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <TornPaperDivider fill="#5E0B15" />
    </section>
  );
}
