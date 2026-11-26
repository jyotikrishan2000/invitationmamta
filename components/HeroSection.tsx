"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CalendarDays, MapPin, ChevronDown } from "lucide-react";
import { WEDDING_DATA } from "@/app/data/weddingData";
import { GaneshaEmblem, TornPaperDivider } from "./Decoratives";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-seq", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
        });

        if (archRef.current) {
          gsap.to(archRef.current, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-burgundy-paper"
    >
      {/* Ambient Royal Gold Bokeh */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(231,196,117,0.3) 0%, transparent 28%), radial-gradient(circle at 82% 24%, rgba(231,196,117,0.24) 0%, transparent 30%), radial-gradient(circle at 50% 82%, rgba(200,150,62,0.2) 0%, transparent 36%)",
        }}
      />

      {/* Top Invocation & Ganesh Emblem */}
      <div className="hero-seq relative z-10 pt-6 sm:pt-9 px-4 text-center">
        <GaneshaEmblem className="w-10 h-10 sm:w-12 sm:h-12 text-[#E7C475] mx-auto mb-1" />
        <p className="text-[11px] sm:text-sm text-[#FFF3CE]/95 tracking-wide leading-relaxed">
          {WEDDING_DATA.invocations}
        </p>
      </div>

      {/* Center: Gold Jharokha Arch + couple-clean.jpg + Sequential Reveal */}
      <div className="relative z-10 px-4 sm:px-6 max-w-3xl mx-auto my-auto py-3 flex flex-col items-center text-center">
        {/* Jharokha Arch Frame */}
        <div
          ref={archRef}
          className="hero-seq relative w-48 h-64 sm:w-64 sm:h-80 rounded-t-[130px] rounded-b-3xl p-1.5 bg-gradient-to-b from-[#F6E4BD] via-[#C8963E] to-[#8A5A19] shadow-[0_22px_65px_rgba(15,2,4,0.7)]"
        >
          <div className="relative w-full h-full rounded-t-[124px] rounded-b-[20px] overflow-hidden border border-[#FFF3CE]/60 bg-[#FFFBF0]">
            <Image
              src="/images/couple-clean.jpg"
              alt={WEDDING_DATA.coupleLine}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 640px) 192px, 256px"
            />
          </div>
        </div>

        <h1 className="hero-seq font-display-hi text-4xl sm:text-6xl text-gold-gradient mt-4 leading-tight">
          {WEDDING_DATA.title}
        </h1>

        <p className="hero-seq text-lg sm:text-2xl font-bold text-[#FFFBF0] mt-1.5 leading-snug">
          {WEDDING_DATA.coupleLine}
        </p>

        <div className="hero-seq mt-2.5 inline-flex items-center rounded-full bg-[#3E060D]/80 border border-[#E7C475]/55 px-5 py-1.5 text-xs sm:text-sm font-semibold text-[#FFF3CE]">
          3 दिसम्बर 2026 • {WEDDING_DATA.venueShort}
        </div>

        {/* Accessible Primary Action Buttons on First Screen */}
        <div className="hero-seq mt-5 flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
          <a
            href="#schedule"
            className="flex-1 min-w-[136px] inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E7C475] to-[#C8963E] text-[#3B0B11] px-5 py-2.5 text-sm sm:text-base font-bold shadow-lg hover:brightness-105 transition"
          >
            <CalendarDays className="w-4 h-4 shrink-0" />
            <span>कार्यक्रम</span>
          </a>
          <a
            href="#venue"
            className="flex-1 min-w-[136px] inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E7C475] bg-[#3E060D]/70 text-[#FFF3CE] px-5 py-2.5 text-sm sm:text-base font-bold shadow-lg hover:bg-[#5E0B15] transition"
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>विवाह स्थल</span>
          </a>
        </div>
      </div>

      {/* Scroll Cue + Torn Paper Edge */}
      <div className="relative z-10">
        <a
          href="#parchment-scroll"
          className="flex flex-col items-center gap-0.5 pb-3 text-[#E7C475] text-xs tracking-widest cursor-pointer"
        >
          <span>नीचे स्क्रॉल करें</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
        <TornPaperDivider fill="#FDF7E7" />
      </div>
    </section>
  );
}
