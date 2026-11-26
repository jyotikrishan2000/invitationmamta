"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown, CalendarDays, ChevronLeft, ChevronRight,
  Copy, MapPin, Menu, Phone, RotateCcw, Share2, Sparkles, X
} from "lucide-react";
import { WEDDING_DATA as wedding } from "@/app/data/weddingData";
import {
  AntiqueCornerFlourish,
  GaneshaEmblem,
  PadmaDivider,
  SacredMandala,
  DiyaLamp
} from "./Motifs";
import { BlessingsWall } from "./BlessingsWall";

function RoyalOrnament({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 50" fill="none" aria-hidden="true">
      <path d="M5 25h73m84 0h73M35 21l4 4-4 4m170-8-4 4 4 4" stroke="currentColor" strokeWidth="1" />
      <path d="M120 43c-2-10-10-14-10-22 0-5 5-9 10-14 5 5 10 9 10 14 0 8-8 12-10 22Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M120 40c-10-7-23-8-26-20 10 0 19 6 26 20Zm0 0c10-7 23-8 26-20-10 0-19 6-26 20Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M97 25c-8-1-12-8-17-11 0 7 4 12 13 14m50-3c8-1 12-8 17-11 0 7-4 12-13 14" stroke="currentColor" strokeWidth="1" />
      <circle cx="120" cy="24" r="2" fill="currentColor" />
      <circle cx="81" cy="25" r="2" fill="currentColor" /><circle cx="159" cy="25" r="2" fill="currentColor" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  { src: "/images/couple-clean.jpg", alt: "ममता और जितेन्द्र जी की मूल तस्वीर", caption: "हमारी एक साथ तस्वीर" },
  { src: "/images/hero-mandap.jpg", alt: "सजा हुआ विवाह मंडप", caption: "उत्सव की तैयारी" },
  { src: "/images/opening-envelope.png", alt: "शुभ विवाह का पारंपरिक निमंत्रण", caption: "शुभ निमंत्रण" },
];

function calendarUtc(localDateTime: string) {
  const iso = `${localDateTime.slice(0, 4)}-${localDateTime.slice(4, 6)}-${localDateTime.slice(6, 8)}T${localDateTime.slice(9, 11)}:${localDateTime.slice(11, 13)}:${localDateTime.slice(13, 15)}+05:30`;
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(".000", "");
}

function calendarUrl(event: (typeof wedding.events)[number]) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} · ममता और जितेन्द्र जी`,
    dates: `${calendarUtc(event.isoStart)}/${calendarUtc(event.isoEnd)}`,
    ctz: "Asia/Kolkata",
    details: event.subtitle,
    location: event.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function Countdown() {
  const [remaining, setRemaining] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, new Date(wedding.weddingIsoTarget).getTime() - Date.now());
      setRemaining([
        Math.floor(distance / 86400000),
        Math.floor(distance / 3600000) % 24,
        Math.floor(distance / 60000) % 60,
        Math.floor(distance / 1000) % 60,
      ]);
    };
    const initial = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, []);

  return (
    <div className="royal-countdown" aria-label="विवाह तक शेष समय">
      {remaining.map((value, index) => (
        <div key={index} className="royal-countdown-item">
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{["दिन", "घंटे", "मिनट", "सेकंड"][index]}</span>
        </div>
      ))}
    </div>
  );
}

export default function RoyalInvitation() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [eventIndex, setEventIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [feedback, setFeedback] = useState("");
  const [qrCard, setQrCard] = useState<{ url: string; image: string } | null>(null);

  const coverRef = useRef<HTMLDivElement>(null);
  const coverButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLButtonElement>(null);
  const eventTabsRef = useRef<HTMLDivElement>(null);
  const eventPageRef = useRef<HTMLElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const wasLightboxOpen = useRef(false);
  const opening = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (opened) heroTitleRef.current?.focus();
      else coverButtonRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [opened]);

  useEffect(() => {
    if (lightboxOpen) {
      lightboxCloseRef.current?.focus();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      wasLightboxOpen.current = true;
      return () => { document.body.style.overflow = previous; };
    }
    if (wasLightboxOpen.current) galleryRef.current?.focus();
    wasLightboxOpen.current = false;
  }, [lightboxOpen]);

  useEffect(() => {
    if (!opened) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previous; };
    }
  }, [opened]);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setOpened(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!opened) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".royal-reveal").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 36 }, {
          autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
      gsap.to(".royal-hero-photo img", {
        yPercent: 5, ease: "none",
        scrollTrigger: { trigger: ".royal-hero", start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const sectionIds = ["home", "sanctum", "invitation", "couple", "date", "memories", "events", "blessings", "venue"];
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(1, window.scrollY / scrollable)})`;
      const threshold = window.innerHeight * 0.34;
      const current = sectionIds.reduce((found, id) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= threshold ? id : found;
      }, "home");
      setActiveSection((previous) => previous === current ? previous : current);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [opened]);

  useEffect(() => {
    if (!opened || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !galleryRef.current) return;
    const tween = gsap.fromTo(galleryRef.current, { autoAlpha: 0.55, scale: 1.02 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out" });
    return () => { tween.kill(); };
  }, [galleryIndex, opened]);

  useEffect(() => {
    if (!opened || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !eventPageRef.current) return;
    const tween = gsap.fromTo(eventPageRef.current, { autoAlpha: 0.6, x: 18 }, { autoAlpha: 1, x: 0, duration: 0.48, ease: "power2.out" });
    return () => { tween.kill(); };
  }, [eventIndex, opened]);

  useEffect(() => {
    const tabs = eventTabsRef.current;
    const selected = tabs?.querySelector<HTMLButtonElement>("button[aria-pressed='true']");
    if (!tabs || !selected || tabs.scrollWidth <= tabs.clientWidth) return;
    tabs.scrollTo({ left: selected.offsetLeft - tabs.offsetLeft - (tabs.clientWidth - selected.clientWidth) / 2, behavior: "smooth" });
  }, [eventIndex]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SITE_URL?.trim() || window.location.href.split("#")[0];
    let cancelled = false;
    QRCode.toDataURL(url, { width: 180, margin: 2, color: { dark: "#4a1025", light: "#fff8ea" } })
      .then((image) => { if (!cancelled) setQrCard({ url, image }); })
      .catch(() => { if (!cancelled) setQrCard(null); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!menuOpen && !lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); setLightboxOpen(false); }
      if (lightboxOpen && event.key === "ArrowRight") setGalleryIndex((index) => (index + 1) % gallery.length);
      if (lightboxOpen && event.key === "ArrowLeft") setGalleryIndex((index) => (index - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, lightboxOpen]);

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(""), 4000);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  function openInvitation() {
    if (opening.current) return;
    opening.current = true;

    // Pushpa Vrishti (Rose petal & golden confetti shower)
    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.65 },
      colors: ["#C29B48", "#8C2B3F", "#F7DFAD", "#D4AF37", "#551D2D"],
      scalar: 1.2,
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !coverRef.current) {
      setOpened(true);
      opening.current = false;
      return;
    }
    const root = coverRef.current;
    gsap.timeline({ onComplete: () => { setOpened(true); opening.current = false; window.scrollTo(0, 0); } })
      .to(root.querySelector(".royal-envelope-button"), { scale: 1.06, autoAlpha: 0, duration: 0.45, ease: "power2.in" })
      .to(root.querySelector(".royal-cover-panel-left"), { xPercent: -100, duration: 0.85, ease: "power3.inOut" }, "-=0.12")
      .to(root.querySelector(".royal-cover-panel-right"), { xPercent: 100, duration: 0.85, ease: "power3.inOut" }, "<");
  }

  function replayOpening() {
    window.scrollTo({ top: 0, behavior: "instant" });
    opening.current = false;
    setDateRevealed(false);
    setGalleryIndex(0);
    setEventIndex(0);
    setMenuOpen(false);
    setOpened(false);
  }

  async function shareInvitation() {
    const url = process.env.NEXT_PUBLIC_SITE_URL?.trim() || window.location.href.split("#")[0];
    try {
      if (navigator.share) {
        await navigator.share({ title: "ममता और जितेन्द्र जी का शुभ विवाह", text: wedding.weddingDateHindi, url });
      } else {
        await navigator.clipboard.writeText(url);
        setFeedback("निमंत्रण का लिंक कॉपी हो गया");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFeedback("लिंक शेयर नहीं हो सका");
    }
  }

  const activeEvent = wedding.events[eventIndex];
  const activePhoto = gallery[galleryIndex];

  return (
    <div className="royal-site">
      {/* 1. Ceremonial 3D Wax Seal & Envelope Cover */}
      {!opened && (
        <div className="royal-cover" ref={coverRef} role="dialog" aria-modal="true" aria-label="विवाह निमंत्रण खोलें">
          <div className="royal-cover-panel royal-cover-panel-left" />
          <div className="royal-cover-panel royal-cover-panel-right" />
          <button
            ref={coverButtonRef}
            type="button"
            className="royal-envelope-button"
            onClick={openInvitation}
            aria-label="ममता और जितेन्द्र जी का शुभ विवाह निमंत्रण खोलें"
          >
            <span className="royal-envelope-art">
              <Image
                src="/images/opening-envelope.png"
                alt="पारंपरिक राजसी निमंत्रण पत्र"
                fill
                priority
                unoptimized
                sizes="(max-width: 760px) 100vw, 520px"
              />
              {/* 3D Embossed Wax Seal */}
              <span className="royal-envelope-seal" aria-hidden="true">
                <span className="royal-wax-seal mx-auto">
                  <span className="royal-wax-seal-crest">M✦J</span>
                </span>
              </span>
            </span>
            <span className="royal-envelope-nameplate">
              <span className="royal-envelope-nameplate-eyebrow">THE WEDDING INVITATION OF</span>
              <strong>ममता <i>&amp;</i> जितेन्द्र जी</strong>
              <span className="royal-envelope-nameplate-date">03 · 12 · 2026</span>
              <span className="text-[11px] text-[#e7cb9b] mt-1 flex items-center gap-1">
                <Sparkles size={12} className="text-[#C29B48]" /> मुहर पर क्लिक करके निमंत्रण खोलें
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Header & Monogram Navigation */}
      <header className="royal-header" inert={!opened || lightboxOpen}>
        <a className="royal-monogram" href="#home" onClick={() => setMenuOpen(false)} aria-label="शुरुआत पर जाएँ">
          M <span>✦</span> J
        </a>
        <nav id="royal-nav" className={menuOpen ? "royal-nav is-open" : "royal-nav"} aria-label="मुख्य नेविगेशन">
          <a href="#sanctum" className={activeSection === "sanctum" ? "is-current" : ""} onClick={() => setMenuOpen(false)}>मंगलाचरण</a>
          <a href="#invitation" className={activeSection === "invitation" ? "is-current" : ""} onClick={() => setMenuOpen(false)}>निमंत्रण</a>
          <a href="#couple" className={activeSection === "couple" ? "is-current" : ""} onClick={() => setMenuOpen(false)}>परिवार</a>
          <a href="#events" className={activeSection === "events" ? "is-current" : ""} onClick={() => setMenuOpen(false)}>कार्यक्रम</a>
          <a href="#memories" className={activeSection === "memories" ? "is-current" : ""} onClick={() => setMenuOpen(false)}>झलकियाँ</a>
          <a href="#blessings" className={activeSection === "blessings" ? "is-current" : ""} onClick={() => setMenuOpen(false)}>आशीर्वाद</a>
          <a href="#venue" className={activeSection === "venue" ? "is-current" : ""} onClick={() => setMenuOpen(false)}>स्थल</a>
        </nav>
        <div className="royal-header-actions">
          <button type="button" onClick={shareInvitation} aria-label="निमंत्रण शेयर करें" title="शेयर करें">
            <Share2 size={18} />
          </button>
          <button
            type="button"
            className="royal-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="royal-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <span ref={progressRef} className="royal-reading-progress" aria-hidden="true" />
      </header>

      <main inert={!opened || lightboxOpen}>
        {/* Hero Section */}
        <section id="home" className="royal-hero" aria-labelledby="royal-title">
          <RoyalOrnament className="royal-hero-ornament" />
          <div className="royal-hero-inner">
            <div className="royal-hero-copy">
              <div className="royal-hero-intro">
                <p className="royal-eyebrow">THE WEDDING INVITATION OF</p>
                <h1 id="royal-title" ref={heroTitleRef} tabIndex={-1}>
                  ममता <span>संग</span><br />जितेन्द्र जी
                </h1>
                <RoyalOrnament className="royal-hero-divider" />
                <p className="royal-hero-date">
                  गुरुवार, 03 दिसम्बर 2026 <span>·</span> ऐलाना, जालोर
                </p>
              </div>
              <div className="royal-hero-details">
                <p className="royal-hero-lead">
                  दो परिवार, एक पावन अवसर और जीवन भर का अटूट साथ। इस मंगल उत्सव में आपकी गरिमामयी उपस्थिति हमारे लिए अनमोल आशीर्वाद होगी।
                </p>
                <div className="royal-hero-actions">
                  <a className="royal-button royal-button-gold" href="#events">
                    कार्यक्रम देखें <CalendarDays size={17} />
                  </a>
                  <a className="royal-button royal-button-outline" href="#venue">
                    विवाह स्थल <MapPin size={17} />
                  </a>
                </div>
              </div>
            </div>
            {/* Couple Photo in Jharokha Rajasthani Arch Frame */}
            <div className="royal-hero-photo royal-jharokha-frame">
              <Image
                src="/images/couple-clean.jpg"
                alt="ममता और जितेन्द्र जी की मूल तस्वीर"
                fill
                priority
                sizes="(max-width: 800px) 90vw, 47vw"
              />
              <span className="royal-hero-photo-caption">03 · 12 · 2026</span>
            </div>
          </div>
          <a className="royal-scroll-cue" href="#sanctum">
            नीचे देखें <ArrowDown size={16} />
          </a>
        </section>

        {/* 2. Meditative Sacred Sanctum & Mangalacharan */}
        <section id="sanctum" className="royal-sanctum" aria-labelledby="sanctum-title">
          <div className="royal-mandala-bg" aria-hidden="true">
            <SacredMandala className="w-full h-full text-[#C29B48]" />
          </div>
          <div className="royal-sanctum-glow" aria-hidden="true" />
          <div className="royal-container relative z-10 royal-reveal">
            <div className="royal-invocations-badge">
              <DiyaLamp className="w-5 h-5 text-[#F6C25B]" />
              <span>{wedding.invocations}</span>
              <DiyaLamp className="w-5 h-5 text-[#F6C25B]" />
            </div>
            <GaneshaEmblem className="w-20 h-20 text-[#C29B48] mx-auto mb-4" />
            <h2 id="sanctum-title" className="royal-title text-[#fff6e3] mb-4">
              मंगल <em>मंगलाचरण</em>
            </h2>
            <PadmaDivider className="w-64 h-8 text-[#C29B48] mx-auto mb-6" />
            <blockquote className="royal-shloka max-w-2xl mx-auto text-[#fdedd2] text-xl sm:text-2xl font-normal leading-relaxed">
              {wedding.sanskritShloka}
            </blockquote>
            <p className="text-sm text-[#e0c4a4] max-w-xl mx-auto mt-4 font-light tracking-wide">
              हे विघ्नहर्ता, सूर्य के समान तेजवान गणेश जी! हमारे समस्त कार्यों को बिना किसी विघ्न के सदैव पूर्ण करें।
            </p>
          </div>
        </section>

        {/* Invitation Text Section */}
        <section id="invitation" className="royal-section royal-invitation">
          <div className="royal-container royal-center royal-reveal">
            <p className="royal-eyebrow">WITH BLESSINGS &amp; LOVE</p>
            <h2 className="royal-title">शुभ <em>विवाह</em></h2>
            <PadmaDivider className="w-56 h-8 text-[#C29B48] mx-auto my-4" />
            <p className="royal-invitation-text">
              श्रीमती बबीता देवी एवं श्री रामाजी राठौड़ अपनी सुपुत्री <strong>ममता कुमारी</strong> के शुभ विवाह के पावन अवसर पर आपको सपरिवार सादर आमंत्रित करते हैं। आपका स्नेह, आत्मीय उपस्थिति और आशीर्वाद इस वैवाहिक उत्सव को पूर्णता प्रदान करेगा।
            </p>
            <p className="royal-signature">राठौड़ एवं परमार परिवार</p>
          </div>
        </section>

        {/* Couple & Heritage Lineage Section */}
        <section id="couple" className="royal-section royal-couple">
          <div className="royal-container">
            <div className="royal-section-heading royal-reveal">
              <p className="royal-eyebrow">TWO FAMILIES, ONE CELEBRATION</p>
              <h2 className="royal-title">परिवार का <em>परिचय</em></h2>
              <PadmaDivider className="w-56 h-8 text-[#C29B48] mx-auto my-3" />
            </div>
            <div className="royal-family-grid">
              <article className="royal-family-card royal-reveal relative">
                <AntiqueCornerFlourish className="w-5 h-5 text-[#C29B48] absolute top-2 left-2" />
                <AntiqueCornerFlourish className="w-5 h-5 text-[#C29B48] absolute top-2 right-2 rotate-90" />
                <span className="royal-family-label">वधू पक्ष</span>
                <h3>{wedding.bride.prefix} {wedding.bride.name}</h3>
                <p>{wedding.bride.parents}</p>
                <small>{wedding.bride.address}</small>
              </article>
              <div className="royal-family-mark" aria-hidden="true">✦</div>
              <article className="royal-family-card royal-reveal relative">
                <AntiqueCornerFlourish className="w-5 h-5 text-[#C29B48] absolute top-2 left-2" />
                <AntiqueCornerFlourish className="w-5 h-5 text-[#C29B48] absolute top-2 right-2 rotate-90" />
                <span className="royal-family-label">वर पक्ष</span>
                <h3>{wedding.groom.prefix} {wedding.groom.name}</h3>
                <p>{wedding.groom.parents}</p>
                <small>{wedding.groom.address}</small>
              </article>
            </div>
          </div>
        </section>

        {/* Shubh Tithi & Astronomical Countdown */}
        <section id="date" className="royal-section royal-date-section">
          <div className="royal-container royal-center royal-reveal">
            <p className="royal-eyebrow">A DATE TO REMEMBER</p>
            <h2 className="royal-title">शुभ <em>तिथि</em></h2>
            <button
              type="button"
              className={dateRevealed ? "royal-date-seal is-open" : "royal-date-seal"}
              onClick={() => setDateRevealed(true)}
              aria-expanded={dateRevealed}
            >
              <span className="royal-date-seal-icon" aria-hidden="true">✥</span>
              <span>{dateRevealed ? "मुहर खुल गई" : "तिथि देखने के लिए मुहर खोलें"}</span>
            </button>
            <div className={dateRevealed ? "royal-date-content is-visible" : "royal-date-content"} aria-hidden={!dateRevealed}>
              <strong>03 <span>/</span> 12 <span>/</span> 2026</strong>
              <p>गुरुवार · सुबह 8:00 बजे लग्न वेला · ऐलाना, जालोर</p>
              <Countdown />
            </div>
          </div>
        </section>

        {/* Royal Gallery & Captured Moments */}
        <section id="memories" className="royal-section royal-gallery-section">
          <div className="royal-container">
            <div className="royal-section-heading royal-reveal">
              <p className="royal-eyebrow">CAPTURED MOMENTS</p>
              <h2 className="royal-title">कुछ ख़ास <em>झलकियाँ</em></h2>
              <PadmaDivider className="w-56 h-8 text-[#C29B48] mx-auto my-3" />
              <p>उन अनमोल पलों की झलक, जिन्हें हम आपके साथ साझा करना चाहते हैं।</p>
            </div>
            <div className="royal-gallery royal-reveal">
              <button
                ref={galleryRef}
                type="button"
                className="royal-gallery-main"
                onClick={() => setLightboxOpen(true)}
                aria-label={`${activePhoto.caption} बड़ी तस्वीर में देखें`}
              >
                <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="(max-width: 800px) 90vw, 66vw" />
                <span>तस्वीर देखें</span>
              </button>
              <div className="royal-gallery-side">
                <span>{String(galleryIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
                <h3>{activePhoto.caption}</h3>
                <p>स्नेह, परंपरा और उत्सव की यादें।</p>
                <div className="royal-gallery-controls">
                  <button type="button" onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)} aria-label="पिछली तस्वीर">
                    <ChevronLeft />
                  </button>
                  <button type="button" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)} aria-label="अगली तस्वीर">
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="royal-gallery-thumbs" aria-label="तस्वीर चुनें">
              {gallery.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className={index === galleryIndex ? "is-active" : ""}
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`${index + 1}: ${photo.caption}`}
                  aria-pressed={index === galleryIndex}
                >
                  <span className="royal-gallery-thumb-image">
                    <Image src={photo.src} alt="" fill sizes="96px" />
                  </span>
                  <span>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    {photo.caption}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Royal Panchang: Wedding Functions Book */}
        <section id="events" className="royal-section royal-events-section">
          <div className="royal-container">
            <div className="royal-section-heading royal-reveal">
              <p className="royal-eyebrow">WEDDING FUNCTIONS</p>
              <h2 className="royal-title">मांगलिक <em>कार्यक्रम</em></h2>
              <PadmaDivider className="w-56 h-8 text-[#C29B48] mx-auto my-3" />
              <p>हर रस्म और वेला में आपका स्नेह हमारे लिए पूज्यनीय आशीर्वाद है।</p>
            </div>
            <div className="royal-event-book royal-reveal">
              <div ref={eventTabsRef} className="royal-event-tabs" aria-label="कार्यक्रम चुनें">
                {wedding.events.map((event, index) => (
                  <button
                    key={event.id}
                    type="button"
                    className={index === eventIndex ? "is-active" : ""}
                    onClick={() => setEventIndex(index)}
                    aria-pressed={index === eventIndex}
                  >
                    <span>{event.number}</span>
                    <strong>{event.title}</strong>
                    <small>{event.date}</small>
                  </button>
                ))}
              </div>
              <article ref={eventPageRef} className="royal-event-page" aria-live="polite">
                <div className="royal-event-top">
                  <span>समारोह {activeEvent.number}</span>
                  <span>✦ {activeEvent.accent}</span>
                </div>
                <h3>{activeEvent.title}</h3>
                <p className="royal-event-description">{activeEvent.subtitle}</p>
                <dl>
                  <div>
                    <dt>तिथि</dt>
                    <dd>{activeEvent.day}, {activeEvent.date}</dd>
                  </div>
                  <div>
                    <dt>समय</dt>
                    <dd>{activeEvent.time}</dd>
                  </div>
                  <div>
                    <dt>स्थान</dt>
                    <dd>{activeEvent.venue}</dd>
                  </div>
                  <div>
                    <dt>परिधान</dt>
                    <dd>पारंपरिक राजस्थानी परिधान / शाही वस्त्र</dd>
                  </div>
                </dl>
                <div className="royal-event-actions">
                  <a href={calendarUrl(activeEvent)} target="_blank" rel="noopener noreferrer">
                    <CalendarDays size={17} /> कैलेंडर में सहेजें
                  </a>
                  <a href={wedding.mapsQueryUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin size={17} /> रास्ता देखें
                  </a>
                </div>
              </article>
            </div>
            <div className="royal-event-pagination">
              <button type="button" disabled={eventIndex === 0} onClick={() => setEventIndex(eventIndex - 1)}>
                <ChevronLeft size={17} /> पिछला
              </button>
              <span>{String(eventIndex + 1).padStart(2, "0")} / {String(wedding.events.length).padStart(2, "0")}</span>
              <button type="button" disabled={eventIndex === wedding.events.length - 1} onClick={() => setEventIndex(eventIndex + 1)}>
                अगला <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Blessings Wall */}
        <BlessingsWall />

        {/* Venue & Navigation Concierge */}
        <section id="venue" className="royal-section royal-venue-section">
          <div className="royal-venue-image">
            <Image src="/images/hero-mandap.jpg" alt="विवाह मंडप" fill sizes="(max-width: 800px) 100vw, 48vw" />
          </div>
          <div className="royal-venue-copy royal-reveal">
            <p className="royal-eyebrow">FIND YOUR WAY</p>
            <h2 className="royal-title">विवाह <em>स्थल</em></h2>
            <PadmaDivider className="w-56 h-8 text-[#C29B48] my-3" />
            <p className="royal-venue-name">मेघवालों का वास, ऐलाना</p>
            <p>{wedding.venueDetails}, राजस्थान</p>
            <a className="royal-button royal-button-wine" href={wedding.mapsQueryUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={17} /> Google Maps पर रास्ता देखें
            </a>
            <div className="royal-venue-contacts">
              <span>सहायता एवं संपर्क हेतु:</span>
              {wedding.contacts.map((contact) => (
                <a key={contact.number} href={`tel:+91${contact.number}`}>
                  <Phone size={16} /> +91 {contact.number}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Invitation & QR Suite */}
        <section className="royal-section royal-closing">
          <div className="royal-container royal-center royal-reveal">
            <span className="royal-closing-flower" aria-hidden="true">❦</span>
            <p className="royal-eyebrow">WITH LOVE FROM OUR FAMILIES</p>
            <h2>आपका हार्दिक <em>स्वागत है</em></h2>
            <p>{wedding.closingMessage}</p>
            <div className="royal-closing-names">MAMTA <span>&amp;</span> JITENDRA JI</div>
            <div className="royal-closing-actions">
              <button type="button" onClick={shareInvitation}>
                <Share2 size={17} /> निमंत्रण शेयर करें
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(qrCard?.url || window.location.href.split("#")[0]);
                    setFeedback("निमंत्रण का लिंक कॉपी हो गया");
                  } catch {
                    setFeedback("लिंक कॉपी नहीं हो सका");
                  }
                }}
              >
                <Copy size={17} /> लिंक कॉपी करें
              </button>
            </div>
            {qrCard && (
              <div className="royal-qr">
                <Image src={qrCard.image} alt="विवाह वेबसाइट का QR code" width={128} height={128} unoptimized />
                <span>QR कोड स्कैन करें एवं परिवारजनों से शेयर करें</span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="royal-footer" inert={!opened || lightboxOpen}>
        <span>M <i>✦</i> J</span>
        <p>03 दिसम्बर 2026 · ऐलाना, जालोर (राजस्थान)</p>
        <button type="button" onClick={replayOpening}>
          <RotateCcw size={15} /> निमंत्रण फिर खोलें
        </button>
      </footer>

      {feedback && <div className="royal-feedback" role="status">{feedback}</div>}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="royal-lightbox" role="dialog" aria-modal="true" aria-label="बड़ी तस्वीर">
          <button ref={lightboxCloseRef} className="royal-lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="तस्वीर बंद करें">
            <X />
          </button>
          <button type="button" onClick={() => setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length)} aria-label="पिछली तस्वीर">
            <ChevronLeft />
          </button>
          <div className="royal-lightbox-image">
            <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="90vw" />
          </div>
          <button type="button" onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)} aria-label="अगली तस्वीर">
            <ChevronRight />
          </button>
          <p>{activePhoto.caption}</p>
        </div>
      )}
    </div>
  );
}
