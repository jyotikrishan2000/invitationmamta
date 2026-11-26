"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TornPaperDivider({
  fill = "#FAF3EA",
  flip = false,
}: {
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 44"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-10 block"
      >
        <path
          d="M0,44 L0,22 L38,14 L76,26 L124,10 L170,24 L215,12 L268,28 L312,15 L364,25 L418,11 L472,27 L526,14 L580,26 L634,9 L688,24 L742,13 L796,28 L852,12 L904,25 L958,10 L1012,24 L1068,14 L1120,27 L1164,15 L1200,22 L1200,44 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export function GaneshaEmblem({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.7"
      />
      {/* Stylized auspicious Swastik / Kalash / Om inspired minimal crest */}
      <path
        d="M40 16C34 16 30 20 30 25C30 29 33 32 36 33C31 35 28 40 28 46C28 53 33 58 40 58C45 58 49 55 50 51"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M40 16C46 16 50 20 50 25C50 29 47 32 43 34C48 36 52 40 52 45C52 49 48 52 44 50C41 49 40 46 41 43"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="40" cy="11" r="2.5" fill="currentColor" />
      <path
        d="M25 63C31 66 49 66 55 63"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GoldFiligreeDivider({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-[#E7C67A]" : "text-[#9A7228]";
  const line = dark ? "bg-[#E7C67A]/40" : "bg-[#9A7228]/35";
  return (
    <div className={`flex items-center justify-center gap-3 my-3 ${color}`}>
      <span className={`h-[1px] w-14 sm:w-24 ${line}`} />
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
      <span className={`h-[1px] w-14 sm:w-24 ${line}`} />
    </div>
  );
}

export function FloatingPetals() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  const petals = [
    { left: "8%", delay: 0, dur: 9, size: 12 },
    { left: "24%", delay: 2.2, dur: 11, size: 10 },
    { left: "46%", delay: 1.1, dur: 10, size: 13 },
    { left: "68%", delay: 3.4, dur: 12, size: 11 },
    { left: "86%", delay: 0.7, dur: 9.5, size: 12 },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-20"
      aria-hidden="true"
    >
      {petals.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, idx % 2 === 0 ? 22 : -22, 0],
            opacity: [0, 0.55, 0.55, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: p.left, width: p.size, height: p.size * 1.35 }}
          className="absolute top-0 rounded-full bg-gradient-to-br from-[#E77C91]/60 to-[#9E1B32]/50 blur-[0.3px]"
        />
      ))}
    </div>
  );
}
