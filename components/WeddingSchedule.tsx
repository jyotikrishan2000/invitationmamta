"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, MapPin } from "lucide-react";
import { WEDDING_DATA } from "@/app/data/weddingData";
import { GoldFiligreeDivider, TornPaperDivider } from "./Decoratives";

gsap.registerPlugin(ScrollTrigger);

export function WeddingSchedule() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".schedule-card", {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="schedule"
      ref={sectionRef}
      className="bg-damask-ivory pt-12 sm:pt-16 pb-0 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#9A6B21] uppercase">
            शुभ अवसर
          </p>
          <h2 className="font-display-hi text-3xl sm:text-5xl text-[#5E0B15] mt-1">
            मांगलिक कार्यक्रम
          </h2>
          <GoldFiligreeDivider />
        </div>

        {/* 5 Separate Cards — 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {WEDDING_DATA.events.map((ev) => (
            <article
              key={ev.id}
              className="schedule-card rounded-3xl bg-[#FFFBF0] border-2 border-[#C8963E]/55 p-5 sm:p-6 shadow-[0_14px_38px_rgba(94,11,21,0.1)] flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#C8963E]/25 pb-2.5 mb-3">
                  <span className="inline-block rounded-full bg-[#5E0B15]/10 px-3 py-0.5 text-xs font-semibold text-[#5E0B15]">
                    {ev.accent}
                  </span>
                  <span className="text-xs font-cinzel font-bold text-[#9A6B21]">
                    {ev.number}
                  </span>
                </div>

                <h3 className="font-display-hi text-2xl sm:text-3xl text-[#5E0B15]">
                  {ev.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B4A3E] mt-1">
                  {ev.subtitle}
                </p>
              </div>

              <div className="space-y-2.5 rounded-2xl bg-[#FDF7E7] border border-[#C8963E]/30 p-4 text-sm text-[#3B0B11]">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#5E0B15] shrink-0" />
                  <span>
                    <strong>दिनांक:</strong> {ev.date} ({ev.day})
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#5E0B15] shrink-0" />
                  <span>
                    <strong>समय:</strong> {ev.time}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#5E0B15] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong>स्थान:</strong> {ev.venue}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <TornPaperDivider fill="#5E0B15" />
    </section>
  );
}
