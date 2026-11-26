"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, CalendarDays, Copy, Home, MapPin, Phone, Share2, X } from "lucide-react";
import { animateMotifDraw, GaneshaEmblem, PadmaDivider } from "@/components/Motifs";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WEDDING_DATA as wedding } from "@/app/data/weddingData";

const pageNames = ["परिचय", "कार्यक्रम", "स्थान व संपर्क"];
const whatsappMessage = encodeURIComponent("नमस्ते, ममता कुमारी और जितेन्द्र जी के विवाह निमंत्रण के बारे में जानकारी चाहिए।");
const featuredCeremonies = [
  { event: wedding.events[0], title: "गणेश स्थापना", art: "ganesh-card.webp", className: "ganesh" },
  { event: wedding.events[1], title: "बंदोली", art: "bandoli-card.webp", className: "bandoli" },
  { event: wedding.events[3], title: "हस्त मिलाप", art: "hast-milap-card.webp", className: "hast-milap" },
  { event: wedding.events[4], title: "सभा एवं प्रीतिभोज", art: "priti-card.webp", className: "priti" },
];

function Countdown() {
  const [remaining, setRemaining] = useState<[number, number, number, number] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const difference = Math.max(0, new Date(wedding.weddingIsoTarget).getTime() - Date.now());
      setRemaining([
        Math.floor(difference / 86400000),
        Math.floor(difference / 3600000) % 24,
        Math.floor(difference / 60000) % 60,
        Math.floor(difference / 1000) % 60,
      ]);
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const units = containerRef.current.querySelectorAll(".countdown-unit");
    if (units.length) {
      animate(units, {
        scale: [0.92, 1],
        opacity: [0, 1],
        delay: stagger(70),
        duration: 500,
        ease: "out(3)",
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="countdown" aria-label="विवाह तक शेष समय">
      {(remaining ?? [null, null, null, null]).map((value, index) => (
        <div className="countdown-unit" key={index}>
          <strong>{value === null ? "--" : String(value).padStart(2, "0")}</strong>
          <span>{["दिन", "घंटे", "मिनट", "सेकंड"][index]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [page, setPage] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [shareFeedback, setShareFeedback] = useState("");
  const touchStart = useRef<number | null>(null);
  const openingButton = useRef<HTMLButtonElement>(null);
  const progressBar = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return () => { window.history.scrollRestoration = previousRestoration; };
  }, []);

  useLayoutEffect(() => {
    if (!entered) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [entered]);

  useEffect(() => {
    if (entered) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [entered]);

  useEffect(() => {
    if (!entering) return;
    const cover = document.querySelector<HTMLElement>(".opening-cover");
    const card = openingButton.current;
    if (!cover || !card) return;

    const tl = createTimeline({
      onComplete: () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setEntered(true);
      },
    });

    // Step 1: Royal scroll anticipation & tactile lift
    tl.add(card, {
      y: [0, -12],
      scale: [1, 1.025],
      duration: 380,
      ease: "out(2)",
    })
    // Step 2: Unrolling paper / scroll collapse upward
    .add(card, {
      opacity: [1, 0],
      y: [-12, -54],
      scaleY: [1.025, 0.14],
      duration: 680,
      ease: "inOut(3)",
    }, "+=60")
    // Step 3: Royal cover dissolve
    .add(cover, {
      opacity: [1, 0],
      duration: 520,
      ease: "out(2)",
    }, "-=120");

    return () => { tl.revert(); };
  }, [entering]);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const motifs = document.querySelectorAll<SVGElement>("[data-draw-motif]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        animateMotifDraw(entry.target as SVGElement);
      });
    }, { threshold: 0.2 });
    motifs.forEach((m) => observer.observe(m));
    return () => observer.disconnect();
  }, [entered]);

  useEffect(() => {
    if (!entered) return;
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? window.scrollY / distance : 0;
      if (progressBar.current) progressBar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [entered]);

  useEffect(() => {
    if (!entered || !("IntersectionObserver" in window)) return;
    const sections = ["top", "invitation", "ceremonies", "venue"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-15% 0px -60% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [entered]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => { element.classList.add("reveal-ready"); observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!chatOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setChatOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [chatOpen]);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const content = document.querySelector<HTMLElement>(".book-page");
    if (!content) return;
    const tl = createTimeline({ defaults: { ease: "out(3)" } });
    tl.add(content, {
      opacity: [0, 1],
      x: [page === 0 ? -15 : 15, 0],
      scale: [0.985, 1],
      duration: 500,
    });
    const rows = content.querySelectorAll<HTMLElement>(".book-event");
    if (rows.length) {
      tl.add(rows, {
        opacity: [0, 1],
        x: [-12, 0],
        delay: stagger(45, { start: 50 }),
        duration: 420,
      }, "-=300");
    }
    const familyPairs = content.querySelectorAll<HTMLElement>(".family-pair article");
    if (familyPairs.length) {
      tl.add(familyPairs, {
        opacity: [0, 1],
        y: [12, 0],
        delay: stagger(60, { start: 60 }),
        duration: 450,
      }, "-=300");
    }
    return () => { tl.revert(); };
  }, [entered, page]);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const onMobile = window.matchMedia("(max-width: 700px)").matches;
    const cards = document.querySelectorAll<HTMLElement>(".family-invite-card");
    const animations: ReturnType<typeof animate>[] = [];
    cards.forEach((card) => card.classList.add("anime-ready"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target as HTMLElement;
        observer.unobserve(card);
        animations.push(animate(card, { opacity: [0, 1], y: [onMobile ? 12 : 20, 0], duration: onMobile ? 540 : 820, ease: "out(3)" }));
        const names = card.querySelectorAll<HTMLElement>(".family-person");
        animations.push(animate(names, { opacity: [0, 1], y: [6, 0], delay: stagger(onMobile ? 35 : 55, { start: onMobile ? 90 : 170 }), duration: onMobile ? 360 : 540, ease: "out(3)" }));
      });
    }, { threshold: 0.18 });
    cards.forEach((card) => observer.observe(card));
    return () => { observer.disconnect(); animations.forEach((animation) => animation.revert()); cards.forEach((card) => card.classList.remove("anime-ready")); };
  }, [entered]);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const onMobile = window.matchMedia("(max-width: 700px)").matches;
    const grid = document.querySelector<HTMLElement>(".ceremony-grid");
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>(".ceremony-card");
    const animations: ReturnType<typeof animate>[] = [];

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      animations.push(animate(cards, {
        opacity: [0, 1],
        y: [onMobile ? 18 : 30, 0],
        scale: [0.96, 1],
        delay: stagger(onMobile ? 65 : 100, { start: 80 }),
        duration: onMobile ? 550 : 750,
        ease: "out(3)",
      }));
    }, { threshold: 0.15 });

    observer.observe(grid);

    const hoverCleanups: (() => void)[] = [];
    if (!onMobile) {
      cards.forEach((card) => {
        const onEnter = () => {
          animate(card, {
            y: -6,
            duration: 250,
            ease: "out(2)",
          });
        };
        const onLeave = () => {
          animate(card, {
            y: 0,
            duration: 250,
            ease: "out(2)",
          });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      observer.disconnect();
      animations.forEach((anim) => anim.revert());
      hoverCleanups.forEach((cleanup) => cleanup());
    };
  }, [entered]);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const section = document.querySelector<HTMLElement>(".blessings-section");
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>(".blessing-invocation");
    const art = section.querySelector<HTMLElement>(".original-invitation-art");
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      animate(items, { opacity: [0, 1], y: [16, 0], delay: stagger(125, { start: 150 }), duration: 760, ease: "out(3)" });
      if (art) animate(art, { opacity: [0, 1], y: [32, 0], rotate: [-2, 0], duration: 1050, ease: "out(3)" });
    }, { threshold: 0.18 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [entered]);

  useEffect(() => {
    if (!entered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const toggle = document.querySelector<HTMLElement>(".whatsapp-toggle");
    if (!toggle) return;
    const pulse = animate(toggle, {
      scale: [1, 1.05, 1],
      duration: 1200,
      ease: "inOut(2)",
      loop: true,
      loopDelay: 3500,
    });
    return () => { pulse.revert(); };
  }, [entered]);

  const enterInvitation = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }
    setEntering(true);
  };

  const onCardTouchEnd = (endX: number) => {
    if (touchStart.current === null) return;
    const distance = endX - touchStart.current;
    if (Math.abs(distance) > 55) setPage((current) => Math.min(2, Math.max(0, current + (distance < 0 ? 1 : -1))));
    touchStart.current = null;
  };

  const copyInvitationLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback("निमंत्रण का लिंक कॉपी हो गया।");
    } catch {
      setShareFeedback("इस ब्राउज़र में लिंक कॉपी नहीं हो सका।");
    }
  };

  const shareInvitation = async () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    if (!navigator.share) {
      await copyInvitationLink();
      return;
    }
    try {
      await navigator.share({ title: "ममता कुमारी और जितेन्द्र जी का शुभ विवाह", text: "03 दिसम्बर 2026 · ऐलाना, जालोर — सादर निमंत्रण", url });
      setShareFeedback("");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyInvitationLink();
    }
  };

  const shareOnWhatsApp = () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    const message = `ममता कुमारी और जितेन्द्र जी के शुभ विवाह में सादर आमंत्रित हैं। ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
    {!entered && (
      <div className={`opening-cover${entering ? " is-opening" : ""}`} role="dialog" aria-modal="true" aria-label="विवाह निमंत्रण खोलें">
        <div className="opening-sparkles" aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => <span key={index} style={{ left: `${5 + ((index * 37) % 90)}%`, top: `${10 + ((index * 23) % 76)}%`, animationDelay: `${index * -.47}s` }}>✦</span>)}
        </div>
        <p className="opening-overline">ROYAL WEDDING INVITATION</p>
        <button ref={openingButton} type="button" className="opening-card" onClick={enterInvitation} aria-label="ममता कुमारी और जितेन्द्र जी का विवाह निमंत्रण खोलें" disabled={entering}>
          <span className="opening-copy">
            <span className="opening-invocation">॥ श्री गणेशाय नमः ॥</span>
            <span className="opening-welcome">पधारो सा</span>
            <span className="opening-heading">शुभ विवाह</span>
            <span className="opening-names"><span>Mamta Kumari</span><i>&amp;</i><span>Jitendra Ji</span></span>
            <span className="opening-hindi">ममता कुमारी संग जितेन्द्र जी</span>
            <span className="opening-date">03 दिसम्बर 2026 <b>·</b> ऐलाना, जालोर</span>
            <span className="opening-action">निमंत्रण खोलें <ArrowDown size={19} /></span>
          </span>
        </button>
        <div className={`opening-progress-wrap${entering ? " is-active" : ""}`} role="status" aria-live="polite" aria-hidden={!entering}><span>निमंत्रण खुल रहा है…</span><span className="opening-progress-track"><span /></span></div>
        <p className="opening-bottom">राठौड़ एवं परमार परिवार</p>
      </div>
    )}
    <main className={`wedding-site${entered ? " is-entered" : ""}`} inert={!entered}>
      <span className="scroll-progress" ref={progressBar} aria-hidden="true" />
      <header className="topbar">
        <a href="#top" className="topbar-brand" aria-label="निमंत्रण की शुरुआत">M <span>✦</span> J</a>
        <nav aria-label="मुख्य नेविगेशन">
          <a href="#invitation">निमंत्रण</a>
          <a href="#ceremonies">कार्यक्रम</a>
          <a href="#venue">स्थान</a>
        </nav>
        <span className="topbar-date">03 · 12 · 2026</span>
        <span className="topbar-mobile-label">शुभ विवाह · 03.12.2026</span>
      </header>

      <section id="top" className="greeting-hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-copy">
          <p className="auspicious">॥ श्री गणेशाय नमः ॥</p>
          <GaneshaEmblem className="hero-ganesh" />
          <p className="hero-welcome">पधारो सा</p>
          <p className="hero-overline">राठौड़ एवं परमार परिवार का सादर आमंत्रण</p>
          <h1 id="hero-title"><span>Mamta Kumari</span><em>&amp;</em><span>Jitendra Ji</span></h1>
          <p className="hero-hindi">ममता कुमारी <span>संग</span> जितेन्द्र जी</p>
          <p className="hero-date">गुरुवार, 03 दिसम्बर 2026 <span>•</span> ऐलाना, जालोर</p>
        </div>
        <div className="hero-couple" aria-label="ममता कुमारी और जितेन्द्र जी की तस्वीर">
          <Image src="/images/couple-clean.jpg" alt="ममता कुमारी और जितेन्द्र जी की मूल तस्वीर" fill priority sizes="(max-width: 800px) 80vw, 37vw" />
        </div>
        <span className="hero-scroll-note">SCROLL TO CELEBRATE <ArrowDown size={13} /></span>
      </section>

      <section className="blessings-section" aria-labelledby="blessings-title">
        <div className="blessings-copy" data-reveal>
          <span className="eyebrow">मंगल आशीर्वाद</span>
          <GaneshaEmblem className="blessings-ganesh" />
          <h2 id="blessings-title">स्नेह भरा <em>निमंत्रण</em></h2>
          <p className="blessings-greeting">पधारो सा! हमारे घर की इस मंगल घड़ी में आपका और आपके परिवार का हृदय से स्वागत है।</p>
          <p className="blessings-message">नागणेची माता, श्री गणेश और भगवान शिव के आशीर्वाद से ममता कुमारी और जितेन्द्र जी विवाह के पवित्र बंधन में बंध रहे हैं। आप पधारकर इस उत्सव की शोभा बढ़ाएँ और नवदंपती को अपना स्नेह व आशीष दें।</p>
          <div className="blessings-invocations" aria-label="मंगल आवाहन">
            {wedding.invocationNames.map((name) => <span className="blessing-invocation" key={name}>{name}</span>)}
          </div>
          <span className="blessings-signature">राठौड़ परिवार की ओर से सादर आमंत्रण</span>
        </div>
        <a className="original-invitation-art" href="/Wedding-Invitation.pdf" target="_blank" rel="noopener noreferrer" aria-label="मूल विवाह निमंत्रण PDF में देखें या डाउनलोड करें">
          <Image src="/images/print-invitation-card.png" alt="ममता कुमारी और जितेन्द्र जी का मूल शुभ विवाह निमंत्रण" width={919} height={1400} sizes="(max-width: 760px) 86vw, 34vw" />
          <span>पूरा कार्ड देखें और PDF डाउनलोड करें <ArrowRight size={16} /></span>
        </a>
      </section>

      <section id="invitation" className="invitation-section" aria-labelledby="invitation-title">
        <div className="section-intro">
          <span className="eyebrow">A ROYAL INVITATION</span>
          <h2 id="invitation-title">शुभ <em>विवाह</em></h2>
          <p>स्नेह, आशीर्वाद और मंगल उत्सव के इस पावन अवसर पर आपका स्वागत है।</p>
        </div>
        <div className="invitation-book">
          <div className="scroll-rod" aria-hidden="true" />
          <div className="book-paper">
            <div className="book-topline"><GaneshaEmblem className="book-ganesh" /><span>॥ श्री गणेशाय नमः ॥</span></div>
            <div className="book-tabs" role="tablist" aria-label="निमंत्रण के पृष्ठ" onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              const next = Math.min(2, Math.max(0, page + (event.key === "ArrowRight" ? 1 : -1)));
              setPage(next);
              window.requestAnimationFrame(() => document.getElementById(`book-tab-${next}`)?.focus());
            }}>
              {pageNames.map((name, index) => (
                <button key={name} type="button" role="tab" id={`book-tab-${index}`} aria-selected={page === index} aria-controls="book-panel" tabIndex={page === index ? 0 : -1} onClick={() => setPage(index)}>{name}</button>
              ))}
            </div>
            <p className="book-swipe-hint">पृष्ठ बदलने के लिए बाएँ या दाएँ स्वाइप करें</p>
            <div
              id="book-panel"
              className="book-panel"
              role="tabpanel"
              aria-labelledby={`book-tab-${page}`}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") setPage((current) => Math.min(2, current + 1));
                if (event.key === "ArrowLeft") setPage((current) => Math.max(0, current - 1));
              }}
              onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
              onTouchEnd={(event) => onCardTouchEnd(event.changedTouches[0].clientX)}
            >
              {page === 0 && (
                <div className="book-page book-couple-page" key="couple">
                  <p className="card-kicker">मंगल परिणय • 03 दिसम्बर 2026</p>
                  <h3>ममता कुमारी <span>संग</span> जितेन्द्र जी</h3>
                  <PadmaDivider className="book-divider" />
                  <p className="card-message">आपको सपरिवार हमारे शुभ विवाह समारोह में सादर आमंत्रित करते हैं। आपकी उपस्थिति और आशीर्वाद हमारे लिए अनमोल हैं।</p>
                  <div className="family-pair">
                    <article><span>वधू पक्ष</span><h4>{wedding.bride.prefix} {wedding.bride.name}</h4><p>{wedding.bride.parents}</p><small>{wedding.bride.address}</small></article>
                    <span className="family-amp" aria-hidden="true">✦</span>
                    <article><span>वर पक्ष</span><h4>{wedding.groom.prefix} {wedding.groom.name}</h4><p>{wedding.groom.parents}</p><small>{wedding.groom.address}</small></article>
                  </div>
                  <p className="card-bottom-blessing">{wedding.closingMessage}</p>
                </div>
              )}
              {page === 1 && (
                <div className="book-page book-events-page" key="events">
                  <p className="card-kicker">मंगल कार्यक्रम</p>
                  <h3>उत्सव की <span>झलक</span></h3>
                  <div className="book-event-list">
                    {wedding.events.map((event) => (
                      <article className="book-event" key={event.id}>
                        <span className="event-index">{event.number}</span>
                        <div><h4>{event.title}</h4><p>{event.subtitle}</p><small>{event.venue}</small></div>
                        <div className="event-date"><strong>{event.day}, {event.date}</strong><span>{event.time}</span></div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
              {page === 2 && (
                <div className="book-page book-venue-page" key="venue">
                  <p className="card-kicker">पधारो सा</p>
                  <h3>आपका हार्दिक <span>स्वागत है</span></h3>
                  <p className="venue-feature">बारात एवं शुभ विवाह स्थल</p>
                  <p>{wedding.baraatDetails}</p>
                  <div className="venue-detail"><MapPin size={22} /><span>{wedding.venueDetails}, राजस्थान</span></div>
                  <a className="card-link" href={wedding.mapsQueryUrl} target="_blank" rel="noopener noreferrer">Google Maps पर रास्ता देखें <ArrowRight size={16} /></a>
                  <div className="venue-contacts"><span>सहायता एवं संपर्क</span>{wedding.contacts.map((contact) => <a key={contact.number} href={`tel:+91${contact.number}`}><Phone size={16} /> +91 {contact.number}</a>)}</div>
                  <p className="card-bottom-blessing">राठौड़ एवं परमार परिवार</p>
                </div>
              )}
            </div>
            <div className="book-pagination">
              <button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} aria-label="पिछला पृष्ठ"><ArrowLeft size={19} /></button>
              <span>{String(page + 1).padStart(2, "0")} / 03</span>
              <button type="button" onClick={() => setPage((current) => Math.min(2, current + 1))} disabled={page === 2} aria-label="अगला पृष्ठ"><ArrowRight size={19} /></button>
            </div>
          </div>
          <div className="scroll-rod scroll-rod-bottom" aria-hidden="true" />
        </div>
      </section>

      <section className="family-invitations-section" aria-labelledby="family-invitations-title">
        <div className="section-intro" data-reveal>
          <span className="eyebrow">WITH BLESSINGS FROM OUR FAMILIES</span>
          <h2 id="family-invitations-title">सपरिवार <em>आमंत्रण</em></h2>
          <p>परिवार की ओर से पधारने और आशीर्वाद देने का स्नेहिल निमंत्रण।</p>
        </div>
        <div className="family-invitation-grid">
          {wedding.familyInvitations.map((group) => (
            <article className="family-invite-card" key={group.id}>
              <span className="family-invite-flower" aria-hidden="true">✺</span>
              <h3>{group.title}</h3>
              <p>{group.introduction}</p>
              <div className="family-name-list">
                {group.names.map((name) => <span className="family-person" key={name}>{name}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ceremonies" className="ceremonies-section" aria-labelledby="ceremonies-title">
        <div className="section-intro" data-reveal>
          <span className="eyebrow">OUR CELEBRATIONS</span>
          <h2 id="ceremonies-title">मंगल <em>कार्यक्रम</em></h2>
          <p>हर रस्म में आपका स्नेह और आशीर्वाद हमारे लिए अनमोल है।</p>
        </div>
        <div className="ceremony-grid">
          {featuredCeremonies.map(({ event, title, art, className }) => (
            <article key={event.id} className={`ceremony-card ceremony-${className}`} style={{ backgroundImage: `url(/images/${art})` }} data-reveal>
              <div className="ceremony-copy">
                <span className="ceremony-label">शुभ अवसर</span>
                <h3>{title}</h3>
                <p>{event.subtitle}</p>
                <div className="ceremony-divider" aria-hidden="true">✦</div>
                <strong>{event.day}, {event.date}</strong>
                <span>{event.time}</span>
                <small>{event.venue}</small>
              </div>
            </article>
          ))}
          <article className="ceremony-card ceremony-haldi" data-reveal>
            <div className="ceremony-copy">
              <span className="ceremony-label">मांगलिक रस्म</span>
              <h3>हल्दी</h3>
              <p>स्नेह और शुभकामनाओं से रंगी हल्दी की रस्म</p>
              <div className="ceremony-divider" aria-hidden="true">✦</div>
              <span>परिवार के साथ मंगल उत्सव</span>
            </div>
          </article>
        </div>
      </section>

      <section className="date-section" aria-labelledby="date-title">
        <div className="date-inner" data-reveal>
          <span className="eyebrow">COUNTING DOWN TO OUR DAY</span>
          <h2 id="date-title">शुभ घड़ी का इंतज़ार</h2>
          <p>{wedding.weddingDateHindi} · सुबह 8:00 बजे · {wedding.venueShort}</p>
          <Countdown />
        </div>
      </section>

      <section id="share" className="share-section" aria-labelledby="share-title">
        <div className="share-card" data-reveal>
          <span className="share-symbol" aria-hidden="true">✦</span>
          <span className="eyebrow">अपनों तक निमंत्रण पहुँचाएँ</span>
          <h2 id="share-title">इस खुशी को <em>साझा करें</em></h2>
          <p>WhatsApp पर भेजें या लिंक कॉपी करके Instagram Story के Link sticker में जोड़ें। लिंक खोलते ही पूरी विवाह वेबसाइट खुलेगी।</p>
          <div className="share-actions">
            <button type="button" onClick={shareInvitation}><Share2 size={20} /> शेयर करें</button>
            <button type="button" onClick={shareOnWhatsApp}><WhatsAppIcon size={21} /> WhatsApp</button>
            <button type="button" onClick={copyInvitationLink}><Copy size={20} /> लिंक कॉपी करें</button>
          </div>
          <p className="share-feedback" role="status" aria-live="polite">{shareFeedback}</p>
        </div>
      </section>

      <section id="venue" className="closing-section" aria-labelledby="closing-title">
        <div className="closing-art" aria-hidden="true" />
        <div className="closing-content" data-reveal><GaneshaEmblem className="closing-ganesh" /><span className="eyebrow">WITH LOVE FROM OUR FAMILIES</span><h2 id="closing-title">आपका हार्दिक<br /><em>स्वागत है</em></h2><p>ममता कुमारी और जितेन्द्र जी के इस मंगल उत्सव में पधारकर हमें आशीर्वाद दें।</p><a href={wedding.mapsQueryUrl} target="_blank" rel="noopener noreferrer" className="closing-map"><MapPin size={18} /> विवाह स्थल का रास्ता</a><span className="closing-signature">राठौड़ एवं परमार परिवार</span></div>
      </section>

      <footer className="site-footer"><span>M <i>✦</i> J</span><p>03 दिसम्बर 2026 · ऐलाना, जालोर (राजस्थान)</p><a href="#top">ऊपर जाएँ ↑</a></footer>

      <nav className="mobile-dock" aria-label="मोबाइल नेविगेशन">
        {[
          { id: "top", label: "शुरुआत", icon: Home },
          { id: "invitation", label: "निमंत्रण", icon: BookOpen },
          { id: "ceremonies", label: "कार्यक्रम", icon: CalendarDays },
          { id: "venue", label: "स्थान", icon: MapPin },
        ].map(({ id, label, icon: Icon }) => (
          <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>
            <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="whatsapp-widget">
        {chatOpen && <div className="whatsapp-panel" id="whatsapp-panel"><div className="whatsapp-panel-heading"><strong>WhatsApp पर संपर्क करें</strong><button type="button" onClick={() => setChatOpen(false)} aria-label="संपर्क विकल्प बंद करें"><X size={17} /></button></div>{wedding.contacts.map((contact, index) => <a key={contact.whatsapp} href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} /><span>संपर्क {index + 1}<small>+91 {contact.number}</small></span><ArrowRight size={17} /></a>)}</div>}
        <button className="whatsapp-toggle" type="button" aria-expanded={chatOpen} aria-controls="whatsapp-panel" onClick={() => setChatOpen((current) => !current)}><WhatsAppIcon size={23} /><span>WhatsApp</span></button>
      </div>
    </main>
    </>
  );
}
