"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WEDDING_DATA } from "@/app/data/weddingData";
import { GaneshaEmblem, GoldFiligreeDivider } from "./Decoratives";

gsap.registerPlugin(ScrollTrigger);

export function ParchmentScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(scrollRef.current, {
        scaleY: 0.78,
        opacity: 0,
        y: 32,
        duration: 0.95,
        ease: "power3.out",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="parchment-scroll"
      className="bg-damask-ivory py-14 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto">
        <div ref={scrollRef} className="relative">
          {/* Top Golden Scroll Roller */}
          <div className="h-5 sm:h-6 mx-1 rounded-full bg-gradient-to-r from-[#8A5A19] via-[#FFF3CE] to-[#8A5A19] shadow-md border border-[#C8963E]/70 flex items-center justify-between px-2">
            <span className="w-3 h-3 rounded-full bg-[#5E0B15] border border-[#FFF3CE]" />
            <span className="w-3 h-3 rounded-full bg-[#5E0B15] border border-[#FFF3CE]" />
          </div>

          {/* Unrolling Golden Parchment Body */}
          <div className="mx-3 sm:mx-5 bg-gradient-to-b from-[#FFFDF5] via-[#FDF7E7] to-[#F7E8C8] border-x-2 border-[#C8963E]/65 px-5 py-8 sm:px-10 sm:py-12 text-center shadow-[0_20px_55px_rgba(94,11,21,0.14)]">
            <GaneshaEmblem className="w-12 h-12 text-[#9A6B21] mx-auto mb-3" />

            <p className="text-xs sm:text-sm text-[#5E0B15] font-medium leading-relaxed max-w-md mx-auto">
              {WEDDING_DATA.sanskritShloka}
            </p>

            <GoldFiligreeDivider />

            <p className="text-sm sm:text-base text-[#3B0B11] leading-relaxed mt-3">
              परमपिता परमेश्वर की असीम अनुकम्पा से हमारी सुपुत्री एवं सुपुत्र के
              पावन परिणय उत्सव पर आप सपरिवार सादर आमंत्रित हैं।
            </p>

            <div className="my-6 space-y-2">
              <p className="text-sm sm:text-base font-medium text-[#5E0B15]">
                {WEDDING_DATA.bride.parents}
              </p>
              <h3 className="font-display-hi text-3xl sm:text-4xl text-[#5E0B15] py-1">
                {WEDDING_DATA.bride.prefix} {WEDDING_DATA.bride.name}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-[#9A6B21]">
                — संग —
              </p>
              <h3 className="font-display-hi text-3xl sm:text-4xl text-[#5E0B15] py-1">
                {WEDDING_DATA.groom.prefix} {WEDDING_DATA.groom.name}
              </h3>
              <p className="text-sm sm:text-base font-medium text-[#5E0B15]">
                {WEDDING_DATA.groom.parents}
              </p>
            </div>

            <GoldFiligreeDivider />

            <p className="text-sm sm:text-base font-bold text-[#2D6A3E] tracking-wide">
              {WEDDING_DATA.hashtag}
            </p>
          </div>

          {/* Bottom Golden Scroll Roller */}
          <div className="h-5 sm:h-6 mx-1 rounded-full bg-gradient-to-r from-[#8A5A19] via-[#FFF3CE] to-[#8A5A19] shadow-md border border-[#C8963E]/70 flex items-center justify-between px-2">
            <span className="w-3 h-3 rounded-full bg-[#5E0B15] border border-[#FFF3CE]" />
            <span className="w-3 h-3 rounded-full bg-[#5E0B15] border border-[#FFF3CE]" />
          </div>
        </div>
      </div>
    </section>
  );
}
