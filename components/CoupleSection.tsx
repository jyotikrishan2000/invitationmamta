"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Heart } from "lucide-react";
import { WEDDING_DATA } from "@/app/data/weddingData";
import { GoldFiligreeDivider, TornPaperDivider } from "./Decoratives";

gsap.registerPlugin(ScrollTrigger);

export function CoupleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".couple-card", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-damask-ivory pt-6 pb-0 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20 text-center">
        <div className="couple-card">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#9A6B21] uppercase">
            वर एवं वधू परिचय
          </p>
          <h2 className="font-display-hi text-3xl sm:text-5xl text-[#5E0B15] mt-1">
            दो दिल, एक पावन बंधन
          </h2>
          <GoldFiligreeDivider />
        </div>

        {/* Real Couple Portrait Frame */}
        <div className="couple-card relative w-64 h-88 sm:w-76 sm:h-[420px] mx-auto my-6 rounded-t-full rounded-b-3xl overflow-hidden border-[3px] border-[#C8963E] shadow-[0_20px_50px_rgba(94,11,21,0.22)] bg-[#FFFBF0]">
          <Image
            src="/images/couple-clean.jpg"
            alt={WEDDING_DATA.coupleLine}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 256px, 304px"
          />
        </div>

        {/* Two-column Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mt-6 items-stretch">
          <div className="couple-card rounded-3xl bg-[#FFFBF0] border-2 border-[#C8963E]/55 p-6 sm:p-8 shadow-lg flex flex-col justify-center">
            <span className="inline-block mx-auto mb-2 rounded-full bg-[#2D6A3E]/10 border border-[#2D6A3E]/35 px-4 py-1 text-xs font-bold text-[#2D6A3E]">
              वधू
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#5E0B15]">
              {WEDDING_DATA.bride.prefix} {WEDDING_DATA.bride.name}
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-[#3B0B11] leading-relaxed">
              {WEDDING_DATA.bride.parents}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-[#8A5A19]">
              {WEDDING_DATA.bride.address}
            </p>
          </div>

          <div className="couple-card rounded-3xl bg-[#FFFBF0] border-2 border-[#C8963E]/55 p-6 sm:p-8 shadow-lg flex flex-col justify-center">
            <span className="inline-block mx-auto mb-2 rounded-full bg-[#5E0B15]/10 border border-[#5E0B15]/30 px-4 py-1 text-xs font-bold text-[#5E0B15]">
              वर
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#5E0B15]">
              {WEDDING_DATA.groom.prefix} {WEDDING_DATA.groom.name}
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-[#3B0B11] leading-relaxed">
              {WEDDING_DATA.groom.parents}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-[#8A5A19]">
              {WEDDING_DATA.groom.address}
            </p>
          </div>
        </div>

        <p className="couple-card mt-8 inline-flex items-center gap-2 text-sm sm:text-base italic text-[#5E0B15]">
          <Heart className="w-4 h-4 fill-[#5E0B15]" />
          <span>“सात जन्मों का पवित्र साथ, स्नेह और विश्वास की मंगल शुरुआत।”</span>
        </p>
      </div>

      <TornPaperDivider fill="#5E0B15" />
    </section>
  );
}
