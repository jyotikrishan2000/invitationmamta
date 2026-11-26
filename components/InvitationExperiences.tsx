"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin } from "lucide-react";
import { WEDDING_DATA as wedding } from "@/app/data/weddingData";

const moments = [
  { image: "/images/couple-clean.jpg", title: "साथ की एक झलक", note: "हमारे विवाह की खुशी आपके साथ बाँट रहे हैं।" },
  { image: "/images/wedding-banner-desktop-ji.png", title: "हमारा निमंत्रण", note: "03 दिसम्बर 2026 — एक दिन जो हमेशा याद रहेगा।" },
  { image: "/images/hero-mandap.jpg", title: "उत्सव की तैयारी", note: "परिवार, परंपराएँ और अपनों के साथ बिताए जाने वाले पल।" },
];

function calendarUtc(localDateTime: string) {
  const localIso = `${localDateTime.slice(0, 4)}-${localDateTime.slice(4, 6)}-${localDateTime.slice(6, 8)}T${localDateTime.slice(9, 11)}:${localDateTime.slice(11, 13)}:${localDateTime.slice(13, 15)}+05:30`;
  return new Date(localIso).toISOString().replace(/[-:]/g, "").replace(".000", "");
}

export function InvitationMoments() {
  const [index, setIndex] = useState(0);
  const visual = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  function move(next: number) {
    if (busy.current || next === index) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !visual.current) {
      setIndex(next);
      return;
    }
    busy.current = true;
    gsap.to(visual.current, {
      opacity: 0, x: next > index ? -26 : 26, duration: .25, ease: "power2.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(visual.current, { opacity: 0, x: next > index ? 26 : -26 }, {
          opacity: 1, x: 0, duration: .4, ease: "power2.out", onComplete: () => { busy.current = false; },
        });
      },
    });
  }
  const moment = moments[index];
  return <section className="moments-section section-space" id="moments">
    <div className="section-inner">
      <div className="moments-head" data-reveal>
        <p className="section-kicker">CAPTURED MOMENTS</p>
        <h2 className="section-title">कुछ ख़ास <em>झलकियाँ</em></h2>
        <p>इस उत्सव की कुछ तस्वीरें और भावनाएँ।</p>
      </div>
      <div className="moments-stage">
        <div className="moments-visual" ref={visual}>
          <Image src={moment.image} alt={moment.title} fill sizes="(max-width: 760px) 100vw, 65vw" />
        </div>
        <div className="moments-caption">
          <span>{String(index + 1).padStart(2, "0")} / {String(moments.length).padStart(2, "0")}</span>
          <h3>{moment.title}</h3>
          <p>{moment.note}</p>
          <div className="moments-controls">
            <button type="button" onClick={() => move((index - 1 + moments.length) % moments.length)} aria-label="पिछली तस्वीर"><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => move((index + 1) % moments.length)} aria-label="अगली तस्वीर"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

export function FunctionsBook() {
  const [index, setIndex] = useState(0);
  const page = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const events = wedding.events;
  const event = events[index];

  function select(next: number) {
    if (busy.current || next === index || next < 0 || next >= events.length) return;
    if (!page.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(next);
      return;
    }
    busy.current = true;
    gsap.to(page.current, {
      rotateY: -12, opacity: 0, x: -18, duration: .22, ease: "power1.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(page.current, { rotateY: 12, opacity: 0, x: 18 }, {
          rotateY: 0, opacity: 1, x: 0, duration: .42, ease: "power2.out",
          onComplete: () => { busy.current = false; },
        });
      },
    });
  }
  return <section className="functions-section section-space" id="schedule">
    <div className="section-inner">
      <div className="functions-heading" data-reveal>
        <p className="section-kicker">WEDDING FUNCTIONS</p>
        <h2 className="section-title">विवाह के <em>कार्यक्रम</em></h2>
      </div>
      <div className="book-layout" data-reveal>
        <div className="book-index">
          {events.map((item, i) => <button type="button" key={item.id} className={i === index ? "active" : ""} aria-pressed={i === index} onClick={() => select(i)}>
            <span>{item.number}</span><strong>{item.title}</strong><small>{item.date}</small>
          </button>)}
        </div>
        <div className="book-frame">
          <div className="book-page" ref={page}>
            <span className="book-page-top">समारोह {event.number} <i>✦</i> {event.accent}</span>
            <h3>{event.title}</h3>
            <p className="book-description">{event.subtitle}</p>
            <div className="book-event-detail">
              <div><span>दिनांक</span><strong>{event.day}, {event.date}</strong></div>
              <div><span>समय</span><strong>{event.time}</strong></div>
              <div><span>स्थान</span><strong>{event.venue}</strong></div>
            </div>
            <div className="book-links">
              <a href={"https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(event.title + " · ममता और जितेन्द्र जी") + "&dates=" + calendarUtc(event.isoStart) + "/" + calendarUtc(event.isoEnd) + "&ctz=Asia%2FKolkata&details=" + encodeURIComponent(event.venue)} target="_blank" rel="noopener noreferrer"><CalendarDays size={16} /> कैलेंडर में सहेजें</a>
              <a href={wedding.mapsQueryUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> रास्ता देखें</a>
            </div>
          </div>
        </div>
      </div>
      <div className="book-pagination">
        <button type="button" onClick={() => select(index - 1)} disabled={index === 0}>पिछला</button>
        <span>{String(index + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => select(index + 1)} disabled={index === events.length - 1}>अगला</button>
      </div>
    </div>
  </section>;
}
