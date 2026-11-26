"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { createTimeline, stagger } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, CalendarDays, Copy, Flower2, Handshake, Heart, Home, MapPin, Music2, Navigation, Phone, Share2, UtensilsCrossed, X } from "lucide-react";
import { animateMotifDraw, GaneshaEmblem, PadmaDivider } from "@/components/Motifs";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { WEDDING_DATA as wedding } from "@/app/data/weddingData";

gsap.registerPlugin(ScrollTrigger);

const pageNames = ["परिचय", "कार्यक्रम", "स्थान व संपर्क"];
const whatsappMessage = encodeURIComponent("नमस्ते, ममता कुमारी और जितेन्द्र जी के विवाह निमंत्रण के बारे में जानकारी चाहिए।");
function getInvitationShareUrl() {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || window.location.origin);
  url.searchParams.set("invite", "ganesh-2026");
  return url.toString();
}
const ceremonyJourney = [
  { event: wedding.events[0], art: "ganesh-card.webp", icon: Flower2, className: "ganesh" },
  { event: wedding.events[1], art: "bandoli-card.webp", icon: Music2, className: "bandoli" },
  { event: wedding.events[2], art: "hero-mandap.jpg", icon: Handshake, className: "baraat" },
  { event: wedding.events[3], art: "hast-milap-card.webp", icon: Heart, className: "hast-milap" },
  { event: wedding.events[4], art: "priti-card.webp", icon: UtensilsCrossed, className: "priti" },
];
const galleryMoments = [
  { src: "/images/couple-clean.jpg", alt: "ममता कुमारी और जितेन्द्र जी की मूल तस्वीर", title: "ममता और जितेन्द्र", description: "इस शुभ अवसर पर आपका स्नेह और आशीर्वाद ही हमारी सबसे प्यारी स्मृति होगी।", portrait: true },
  { src: "/images/print-invitation-card.png", alt: "मूल शुभ विवाह निमंत्रण कार्ड", title: "मंगल निमंत्रण", description: "परिवार की ओर से स्नेह और सम्मान के साथ दिया गया आमंत्रण।", portrait: true },
  { src: "/images/hero-mandap.jpg", alt: "सजे हुए विवाह मंडप का चित्र", title: "मंगल मंडप", description: "जहाँ हम सब मिलकर विवाह की शुभ घड़ी मनाएँगे।", portrait: false },
];

function Countdown() {
  const [remaining, setRemaining] = useState<[number, number, number, number] | null>(null);

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

  return (
    <div className="countdown" aria-label="विवाह तक शेष समय">
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
  const [galleryIndex, setGalleryIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const galleryTouchStart = useRef<{ x: number; y: number } | null>(null);
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

  useLayoutEffect(() => {
    if (!entered) return;
    const site = document.querySelector<HTMLElement>(".wedding-site");
    if (!site) return;

    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 700px)",
    }, (context) => {
      if (!context.conditions?.motion) return;
      const mobile = Boolean(context.conditions.mobile);
      const offset = mobile ? 18 : 36;
      const reveal = (element: HTMLElement | null, delay = 0) => {
        if (!element || element.dataset.motionDone === "true") return;
        const isStop = element.classList.contains("ceremony-stop");
        gsap.fromTo(element,
          { autoAlpha: 0, y: offset, scale: isStop ? 0.97 : 1 },
          {
            autoAlpha: 1, y: 0, scale: 1, duration: mobile ? 0.58 : 0.8,
            delay, ease: "power3.out", clearProps: "opacity,visibility,transform",
            onComplete: () => { element.dataset.motionDone = "true"; },
            scrollTrigger: { trigger: element, start: mobile ? "top 94%" : "top 87%", once: true },
          },
        );
      };

      site.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element, index) => {
        const delay = !mobile && element.classList.contains("ceremony-stop") ? (index % 2) * 0.1 : 0;
        reveal(element, delay);
      });
      reveal(site.querySelector<HTMLElement>(".original-invitation-art"), mobile ? 0 : 0.12);
      reveal(site.querySelector<HTMLElement>(".invitation-book"), 0.08);
      site.querySelectorAll<HTMLElement>(".family-invite-card").forEach((card, index) => {
        reveal(card, mobile ? 0 : Math.min(index, 2) * 0.09);
      });

      const blessings = site.querySelector<HTMLElement>(".blessings-section");
      const invocations = blessings?.querySelectorAll<HTMLElement>(".blessing-invocation");
      if (blessings && invocations?.length) {
        gsap.fromTo(invocations, { autoAlpha: 0, y: 12 }, {
          autoAlpha: 1, y: 0, duration: 0.45, stagger: mobile ? 0.06 : 0.12,
          ease: "power2.out", clearProps: "opacity,visibility,transform",
          scrollTrigger: { trigger: blessings, start: "top 72%", once: true },
        });
      }

      const date = site.querySelector<HTMLElement>(".date-section");
      const units = date?.querySelectorAll<HTMLElement>(".countdown-unit");
      if (date && units?.length) {
        gsap.fromTo(units,
          { autoAlpha: 0, y: mobile ? 10 : 18 },
          {
            autoAlpha: 1, y: 0, duration: 0.55, stagger: mobile ? 0.06 : 0.1,
            ease: "power2.out", clearProps: "opacity,visibility,transform",
            scrollTrigger: { trigger: date, start: "top 80%", once: true },
          },
        );
      }

      const closing = site.querySelector<HTMLElement>(".closing-content");
      const closingItems = closing?.querySelectorAll<HTMLElement>(".closing-ganesh, .eyebrow, h2, p, .closing-map, .closing-signature");
      if (closing && closingItems?.length) {
        gsap.fromTo(closingItems, { autoAlpha: 0, y: mobile ? 8 : 16 }, {
          autoAlpha: 1, y: 0, duration: 0.5, stagger: mobile ? 0.05 : 0.08,
          ease: "power2.out", clearProps: "opacity,visibility,transform",
          scrollTrigger: { trigger: closing, start: "top 86%", once: true },
        });
      }

      const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => window.cancelAnimationFrame(refresh);
    }, site);

    return () => media.revert();
  }, [entered]);

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

  const enterInvitation = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntered(true);
      return;
    }
    setEntering(true);
  };

  const onCardTouchEnd = (endX: number, endY: number) => {
    if (touchStart.current === null) return;
    const distance = endX - touchStart.current.x;
    const verticalDistance = endY - touchStart.current.y;
    if (Math.abs(distance) > 55 && Math.abs(distance) > Math.abs(verticalDistance) * 1.25) {
      setPage((current) => Math.min(2, Math.max(0, current + (distance < 0 ? 1 : -1))));
    }
    touchStart.current = null;
  };

  const changeGallery = (direction: number) => {
    setGalleryIndex((current) => (current + direction + galleryMoments.length) % galleryMoments.length);
  };

  const onGalleryTouchEnd = (endX: number, endY: number) => {
    if (galleryTouchStart.current === null) return;
    const distance = endX - galleryTouchStart.current.x;
    const verticalDistance = endY - galleryTouchStart.current.y;
    if (Math.abs(distance) > 55 && Math.abs(distance) > Math.abs(verticalDistance) * 1.25) {
      changeGallery(distance < 0 ? 1 : -1);
    }
    galleryTouchStart.current = null;
  };

  const copyInvitationLink = async () => {
    const url = getInvitationShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback("निमंत्रण का लिंक कॉपी हो गया।");
    } catch {
      setShareFeedback("इस ब्राउज़र में लिंक कॉपी नहीं हो सका।");
    }
  };

  const shareInvitation = async () => {
    const url = getInvitationShareUrl();
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
    const url = getInvitationShareUrl();
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
              onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
              onTouchEnd={(event) => onCardTouchEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY)}
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

      <section id="memories" className="memory-section" aria-labelledby="memory-title">
        <div className="section-intro" data-reveal>
          <span className="eyebrow">BLESSED MOMENTS</span>
          <h2 id="memory-title">शुभ <em>झलकियाँ</em></h2>
          <p>हमारी तस्वीर और विवाह की कुछ मंगल झलकियाँ।</p>
        </div>
        <div className="memory-gallery" data-reveal>
          <div
            className="memory-visual"
            role="group"
            aria-label="तस्वीरें; बाएँ या दाएँ स्वाइप करें"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); changeGallery(1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); changeGallery(-1); }
            }}
            onTouchStart={(event) => { galleryTouchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
            onTouchEnd={(event) => onGalleryTouchEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY)}
          >
            <div className={`memory-image${galleryMoments[galleryIndex].portrait ? " is-portrait" : ""}`} key={galleryMoments[galleryIndex].src}>
              <Image src={galleryMoments[galleryIndex].src} alt={galleryMoments[galleryIndex].alt} fill sizes="(max-width: 700px) 90vw, 52vw" />
            </div>
          </div>
          <div className="memory-copy" aria-live="polite">
            <span className="memory-count">{String(galleryIndex + 1).padStart(2, "0")} / {String(galleryMoments.length).padStart(2, "0")}</span>
            <h3>{galleryMoments[galleryIndex].title}</h3>
            <p>{galleryMoments[galleryIndex].description}</p>
            <div className="memory-controls">
              <button type="button" onClick={() => changeGallery(-1)} aria-label="पिछली तस्वीर"><ArrowLeft size={21} /></button>
              <button type="button" onClick={() => changeGallery(1)} aria-label="अगली तस्वीर"><ArrowRight size={21} /></button>
            </div>
            <span className="memory-swipe-hint">तस्वीर बदलने के लिए स्वाइप करें</span>
          </div>
        </div>
      </section>

      <section id="ceremonies" className="ceremonies-section" aria-labelledby="ceremonies-title">
        <div className="section-intro" data-reveal>
          <span className="eyebrow">OUR CELEBRATIONS</span>
          <h2 id="ceremonies-title">उत्सव का <em>सफर</em></h2>
          <p>विनायक पूजन से प्रीतिभोज तक, हर पड़ाव में आपका स्नेह हमारे लिए अनमोल है।</p>
        </div>
        <div className="ceremony-route" aria-label="विवाह कार्यक्रम का क्रम">
          <span className="ceremony-route-line" aria-hidden="true" />
          {ceremonyJourney.map(({ event, art, icon: Icon, className }) => (
            <div className="ceremony-stop" key={event.id} data-reveal>
              <span className="ceremony-route-node" aria-hidden="true"><Icon size={27} strokeWidth={1.5} /></span>
              <article className={`ceremony-card ceremony-${className}`} style={{ backgroundImage: `url(/images/${art})` }}>
                <div className="ceremony-copy">
                  <span className="ceremony-label">पड़ाव {event.number} · {event.accent}</span>
                  <h3>{event.title}</h3>
                  <p>{event.subtitle}</p>
                  <div className="ceremony-divider" aria-hidden="true">✦</div>
                  <strong>{event.day}, {event.date}</strong>
                  <span>{event.time}</span>
                  <small>{event.venue}</small>
                  <a className="ceremony-direction" href={wedding.mapsQueryUrl} target="_blank" rel="noopener noreferrer"><Navigation size={15} /> रास्ता देखें</a>
                </div>
              </article>
            </div>
          ))}
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
