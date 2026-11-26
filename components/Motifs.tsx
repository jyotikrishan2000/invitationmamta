"use client";

import React from "react";
import { animate, createDrawable, stagger } from "animejs";

/**
 * Animate SVG strokes with Anime.js v4 createDrawable
 */
export function animateMotifDraw(svgElement: SVGElement, duration = 1200) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const drawables = svgElement.querySelectorAll<SVGGeometryElement>("path[stroke], line[stroke], circle[stroke]");
  if (!drawables.length) return;

  return animate(createDrawable(drawables), {
    draw: ["0 0", "0 1"],
    duration,
    ease: "inOutQuad",
    delay: stagger(80),
  });
}

/**
 * High-Level Vector Cultural & Meditative Motifs
 * Designed with senior graphic design standards for Royal Indian Wedding UI
 */

export function AntiqueCornerFlourish({ className = "w-6 h-6 text-[#C29B48]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 38V12C2 6.477 6.477 2 12 2H38"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6 34V14C6 9.582 9.582 6 14 6H34"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        opacity="0.8"
      />
      <circle cx="2" cy="38" r="1.5" fill="currentColor" />
      <circle cx="38" cy="2" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function PadmaDivider({ className = "w-56 h-8 text-[#C29B48]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 36" fill="none" className={className} aria-hidden="true" data-draw-motif="true">
      <line x1="8" y1="18" x2="88" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <line x1="152" y1="18" x2="232" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="88" cy="18" r="2" fill="currentColor" />
      <circle cx="152" cy="18" r="2" fill="currentColor" />
      {/* Central Lotus (Padma) */}
      <path
        d="M120 4C115 11 114 17 120 25C126 17 125 11 120 4Z"
        fill="#8C2B3F"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M120 25C110 23 103 16 102 10C109 11 115 16 120 25Z"
        fill="#B84A62"
        opacity="0.85"
      />
      <path
        d="M120 25C130 23 137 16 138 10C131 11 125 16 120 25Z"
        fill="#B84A62"
        opacity="0.85"
      />
      <path
        d="M120 25C106 25 96 20 95 15C104 16 113 21 120 25Z"
        fill="#D48B9A"
        opacity="0.65"
      />
      <path
        d="M120 25C134 25 144 20 145 15C136 16 127 21 120 25Z"
        fill="#D48B9A"
        opacity="0.65"
      />
      <circle cx="120" cy="30" r="2" fill="currentColor" />
    </svg>
  );
}

export function GaneshaEmblem({ className = "w-16 h-16 text-[#C29B48]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true" data-draw-motif="true">
      {/* Concentric aura circle */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />

      {/* Auspicious Ganesha Calligraphic Silhouette */}
      <path
        d="M50 18C44 18 40 22 40 27C40 30 42 32 45 33C38 35 33 42 33 50C33 56 36 62 41 65C43 66 45 64 45 62C45 60 43 58 43 54C43 49 46 46 50 46C53 46 55 48 55 52C55 58 51 64 56 69C60 73 67 71 67 65C67 62 64 60 62 61C60 62 61 65 59 65C57 65 58 59 59 54C61 48 64 44 64 38C64 31 58 26 52 25C55 24 57 22 57 20C57 18 54 18 50 18Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.95"
      />
      {/* Crown Trishul / Tilak mark */}
      <circle cx="50" cy="12" r="2.5" fill="currentColor" />
      <path d="M47 14L50 9L53 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Auspicious base curves */}
      <path d="M35 78Q50 86 65 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SacredMandala({ className = "w-72 h-72 text-[#C29B48]/15" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
      <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="16" stroke="currentColor" strokeWidth="1" />

      {/* 8-Pointed Star Petals */}
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.85">
        <path d="M100 20 L108 55 L145 35 L125 70 L160 80 L130 100 L160 120 L125 130 L145 165 L108 145 L100 180 L92 145 L55 165 L75 130 L40 120 L70 100 L40 80 L75 70 L55 35 L92 55 Z" />
      </g>

      {/* Inner Petal Radiance */}
      <g fill="currentColor" opacity="0.4">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <circle
            key={i}
            cx={100 + 40 * Math.cos((angle * Math.PI) / 180)}
            cy={100 + 40 * Math.sin((angle * Math.PI) / 180)}
            r="2.5"
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="4" fill="currentColor" />
    </svg>
  );
}

export function DiyaLamp({ className = "w-6 h-6 text-[#E5A84B]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      {/* Lamp Base */}
      <path
        d="M4 18C4 24 10 27 16 27C22 27 28 24 28 18H4Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Pedestal */}
      <path d="M12 27H20V29H12V27Z" fill="currentColor" />
      {/* Auspicious Flame */}
      <path
        d="M16 5C14 9 12 11 12 14C12 16.2 13.8 18 16 18C18.2 18 20 16.2 20 14C20 11 18 9 16 5Z"
        fill="#F6C25B"
        opacity="0.95"
      />
      <circle cx="16" cy="14" r="1.8" fill="#FFF6D6" />
    </svg>
  );
}
