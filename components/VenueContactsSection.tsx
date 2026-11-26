"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, MessageCircle, ExternalLink } from "lucide-react";
import { WEDDING_DATA } from "@/app/data/weddingData";
import { GoldFiligreeDivider, TornPaperDivider } from "./Decoratives";

gsap.registerPlugin(ScrollTrigger);

export function VenueContactsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".venue-card", {
          y: 26,
          opacity: 0,
          duration: 0.75,
          stagger: 0.15,
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
      id="venue"
      ref={sectionRef}
      className="bg-burgundy-paper text-[#FFFBF0] pt-12 sm:pt-16 pb-0 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm tracking-[0.2em] text-[#E7C475] uppercase">
            पधारने का पता एवं संपर्क
          </p>
          <h2 className="font-display-hi text-3xl sm:text-5xl text-[#FFFBF0] mt-1">
            विवाह स्थल एवं संपर्क
          </h2>
          <GoldFiligreeDivider dark />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 items-stretch">
          {/* Card 1: Baraat & Venue Address + Google Maps Button */}
          <div className="venue-card rounded-3xl bg-[#3E060D]/75 backdrop-blur-md border-2 border-[#E7C475]/55 p-6 sm:p-8 shadow-2xl flex flex-col justify-between gap-5">
            <div className="space-y-5">
              <div>
                <span className="inline-block rounded-full bg-[#E7C475]/20 border border-[#E7C475]/45 px-3.5 py-1 text-xs font-semibold text-[#E7C475] mb-2">
                  बारात आगमन
                </span>
                <p className="text-sm sm:text-base text-[#FFFBF0]/95 leading-relaxed">
                  {WEDDING_DATA.baraatDetails}
                </p>
              </div>

              <div className="h-[1px] bg-[#E7C475]/25" />

              <div>
                <span className="inline-block rounded-full bg-[#E7C475]/20 border border-[#E7C475]/45 px-3.5 py-1 text-xs font-semibold text-[#E7C475] mb-2">
                  शुभ विवाह स्थल
                </span>
                <p className="text-sm sm:text-base text-[#FFFBF0] font-medium leading-relaxed flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#E7C475] shrink-0 mt-0.5" />
                  <span>{WEDDING_DATA.venueDetails}</span>
                </p>
              </div>
            </div>

            <a
              href={WEDDING_DATA.mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-gradient-to-r from-[#E7C475] to-[#C8963E] text-[#3B0B11] py-3.5 px-5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:brightness-105 transition shadow-lg"
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Google Maps पर खोलें</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>

          {/* Card 2: Call & WhatsApp Buttons for Both Invitation Numbers */}
          <div className="venue-card rounded-3xl bg-[#FFFBF0] text-[#3B0B11] border-2 border-[#C8963E] p-6 sm:p-8 shadow-2xl flex flex-col justify-between gap-5">
            <div>
              <span className="inline-block rounded-full bg-[#5E0B15]/10 border border-[#5E0B15]/25 px-3.5 py-1 text-xs font-semibold text-[#5E0B15] mb-2">
                आमंत्रण संपर्क सूत्र
              </span>
              <h3 className="font-display-hi text-2xl sm:text-3xl text-[#5E0B15]">
                राठौड़ परिवार संपर्क
              </h3>
              <p className="text-xs sm:text-sm text-[#6B4A3E] mt-1">
                किसी भी जानकारी या मार्गदर्शन के लिए नीचे दिए गए नंबरों पर कॉल या
                WhatsApp करें:
              </p>
            </div>

            <div className="space-y-4">
              {WEDDING_DATA.contacts.map((c, idx) => (
                <div
                  key={c.number}
                  className="rounded-2xl bg-[#FDF7E7] border border-[#C8963E]/45 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#9A6B21]">
                      संपर्क {idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#5E0B15] font-cinzel tracking-wider">
                      {c.number}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={`tel:+91${c.number}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#5E0B15] text-[#FFFBF0] py-2.5 px-3 text-xs sm:text-sm font-semibold hover:bg-[#46070F] transition"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>Call करें</span>
                    </a>
                    <a
                      href={`https://wa.me/${c.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1B7A43] text-white py-2.5 px-3 text-xs sm:text-sm font-semibold hover:bg-[#156235] transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TornPaperDivider fill="#FDF7E7" />
    </section>
  );
}
