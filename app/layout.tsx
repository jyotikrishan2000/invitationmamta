import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Serif_Devanagari } from "next/font/google";
import "./invitation.css";

const latinDisplay = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-royal-latin", display: "swap" });
const devanagari = Noto_Serif_Devanagari({ subsets: ["devanagari"], variable: "--font-royal-devanagari", display: "swap" });
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  || process.env.VERCEL_PROJECT_PRODUCTION_URL
  || process.env.VERCEL_URL;
const siteUrl = new URL(configuredUrl
  ? /^https?:\/\//.test(configuredUrl) ? configuredUrl : `https://${configuredUrl}`
  : "http://localhost:3000");
const previewImage = new URL("/images/couple-clean.jpg", siteUrl);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4d0d1b",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: { canonical: siteUrl },
  title: "शुभ विवाह | ममता कुमारी संग जितेन्द्र जी — 03.12.2026",
  description:
    "राठौड़ एवं परमार परिवार की ओर से पावन परिणय निमंत्रण। दिनांक 03 दिसम्बर 2026, ऐलाना (जालोर)।",
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: siteUrl,
    siteName: "ममता कुमारी संग जितेन्द्र जी — शुभ विवाह",
    title: "शुभ विवाह | ममता कुमारी संग जितेन्द्र जी — 03.12.2026",
    description:
      "नागणेची माता नमः | राठौड़ परिवार आपका हार्दिक स्वागत करता है। दिनांक 03.12.2026 — ऐलाना, जालोर",
    images: [
      {
        url: previewImage,
        width: 682,
        height: 1024,
        alt: "ममता कुमारी और जितेन्द्र जी की मूल तस्वीर",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "शुभ विवाह | ममता कुमारी संग जितेन्द्र जी — 03.12.2026",
    description:
      "राठौड़ एवं परमार परिवार की ओर से सादर आमंत्रण | 03.12.2026, ऐलाना (जालोर)",
    images: [previewImage.toString()],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${latinDisplay.variable} ${devanagari.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
