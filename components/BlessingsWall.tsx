"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Send } from "lucide-react";
import { PadmaDivider } from "./Motifs";

interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  time: string;
}

const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: "1",
    name: "कैलाश सिंह राठौड़",
    relation: "परिवार जन",
    message: "ममता और जितेन्द्र जी को पावन वैवाहिक जीवन की अनन्त शुभकामनाएँ। नागणेची माता सदैव कृपा बनाए रखें। 🌸",
    time: "आज",
  },
  {
    id: "2",
    name: "सोहन लाल परमार",
    relation: "वर पक्ष स्नेही",
    message: "सदा सुहागन रहो! दोनों परिवारों का यह संगम सुख, शांति और समृद्धि से परिपूर्ण हो। ✨",
    time: "आज",
  },
  {
    id: "3",
    name: "सुशीला देवी",
    relation: "मौसी जी",
    message: "ईश्वर आप दोनों की जोड़ी को हर बुरी नज़र से बचाए। बहुत-बहुत बधाई और शुभाशीष! 🪔",
    time: "कल",
  },
];

const QUICK_BLESSINGS = [
  "सदा सुहागन रहो 🌸",
  "सुख, शांति और समृद्धि ✨",
  "जीवन मंगलमय हो 🪔",
  "नागणेची माता का शुभाशीष 🌺",
  "राठौड़ व परमार परिवार को बधाई 💐",
];

export function BlessingsWall() {
  const [blessings, setBlessings] = useState<Blessing[]>(DEFAULT_BLESSINGS);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const triggerPushpaVrishti = () => {
    // Elegant traditional floral & gold leaf shower
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#C29B48", "#8C2B3F", "#F7DFAD", "#D4AF37", "#4A1224"],
      shapes: ["circle"],
      scalar: 1.2,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: name.trim() || "शुभचिंतक",
      relation: relation.trim() || "स्नेही",
      message: message.trim(),
      time: "अभी-अभी",
    };

    setBlessings([newBlessing, ...blessings]);
    setMessage("");
    setName("");
    setRelation("");
    setSubmitted(true);
    triggerPushpaVrishti();

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleQuickAdd = (text: string) => {
    setMessage((prev) => (prev ? `${prev} ${text}` : text));
  };

  return (
    <section id="blessings" className="royal-section royal-blessings-section" aria-labelledby="blessings-title">
      <div className="royal-container">
        <div className="royal-section-heading royal-reveal">
          <p className="royal-eyebrow">HEARTFELT BLESSINGS</p>
          <h2 id="blessings-title" className="royal-title">मंगल <em>आशीर्वाद</em></h2>
          <PadmaDivider className="w-56 h-8 text-[#C29B48] mx-auto my-4" />
          <p>नवदंपति ममता एवं जितेन्द्र जी के सुखद भविष्य के लिए अपना स्नेह एवं शुभाशीष समर्पित करें।</p>
        </div>

        <div className="royal-blessings-grid">
          {/* Form Card */}
          <div className="royal-blessing-card royal-reveal">
            <h3 className="text-xl font-medium text-[#4A1224] mb-2 flex items-center gap-2">
              <Heart size={20} className="text-[#C29B48] fill-[#C29B48]" />
              <span>शुभकामना संदेश भेजें</span>
            </h3>
            <p className="text-sm text-[#765947] mb-4">
              त्वरित आशीर्वाद चुनें या अपना व्यक्तिगत संदेश लिखें:
            </p>

            <div className="royal-quick-blessings" aria-label="त्वरित आशीर्वाद विकल्प">
              {QUICK_BLESSINGS.map((qb, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickAdd(qb)}
                  className="royal-blessing-chip"
                >
                  {qb}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="blessing-name" className="block text-xs font-semibold text-[#8C6B38] mb-1">
                    आपका शुभ नाम
                  </label>
                  <input
                    id="blessing-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. कैलाश सिंह"
                    className="w-full px-3 py-2 border border-[#d8c39f] bg-[#fffcf5] text-[#3c2029] rounded-none focus:outline-none focus:ring-1 focus:ring-[#C29B48]"
                  />
                </div>
                <div>
                  <label htmlFor="blessing-relation" className="block text-xs font-semibold text-[#8C6B38] mb-1">
                    संबंध / स्थान
                  </label>
                  <input
                    id="blessing-relation"
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="उदा. मित्र / जालोर"
                    className="w-full px-3 py-2 border border-[#d8c39f] bg-[#fffcf5] text-[#3c2029] rounded-none focus:outline-none focus:ring-1 focus:ring-[#C29B48]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="blessing-message" className="block text-xs font-semibold text-[#8C6B38] mb-1">
                  आपका शुभाशीष एवं मंगल कामनाएँ *
                </label>
                <textarea
                  id="blessing-message"
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="नवदंपति के लिए मंगल संदेश लिखें..."
                  className="w-full px-3 py-2 border border-[#d8c39f] bg-[#fffcf5] text-[#3c2029] rounded-none focus:outline-none focus:ring-1 focus:ring-[#C29B48]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="royal-button royal-button-wine"
                >
                  <Send size={16} /> शुभाशीष भेजें (पुष्प वर्षा)
                </button>
                {submitted && (
                  <span className="text-sm font-semibold text-[#4A1224] flex items-center gap-1 animate-pulse">
                    <Sparkles size={16} className="text-[#C29B48]" /> आपका आशीर्वाद प्राप्त हुआ!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Blessings Feed */}
          <div className="royal-blessing-card royal-reveal">
            <h3 className="text-xl font-medium text-[#4A1224] mb-3 flex items-center justify-between">
              <span>स्नेहीजनों के आशीर्वाद</span>
              <span className="text-xs font-normal text-[#8C6B38] bg-[#f7eedc] px-3 py-1 rounded-full border border-[#e5d2b3]">
                {blessings.length} संदेश
              </span>
            </h3>

            <div className="royal-blessings-list" tabIndex={0} aria-label="शुभकामना संदेशों की सूची">
              {blessings.map((b) => (
                <article key={b.id} className="royal-guest-blessing-item">
                  <div className="flex items-baseline justify-between mb-1">
                    <strong className="text-[#4A1224] font-medium text-base">
                      {b.name}
                    </strong>
                    <span className="text-xs text-[#9a764d]">
                      {b.relation} · {b.time}
                    </span>
                  </div>
                  <p className="text-sm text-[#5c3e44] leading-relaxed">
                    {b.message}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
