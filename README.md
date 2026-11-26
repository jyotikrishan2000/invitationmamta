# ममता कुमारी और जितेन्द्र जी — विवाह निमंत्रण

Next.js 16 पर बनी मोबाइल अनुकूल विवाह निमंत्रण वेबसाइट। सामग्री `app/data/weddingData.ts` में है।

प्रिंट कार्ड की मूल प्रति `public/Wedding-Invitation.pdf` में है। वेबसाइट के “स्नेह भरा निमंत्रण” भाग में उसी PDF से बनाई गई साफ़ तस्वीर दिखाई देती है; कार्ड पर क्लिक करने से पूरा PDF खुलता है।

## Local development

```bash
npm ci
npm run dev
```

`http://localhost:3000` खोलें। अंतिम जाँच के लिए `npm run lint` और `npm run build` चलाएँ।

## Public link and social preview

GitHub पर कोड पुश करना वेबसाइट को सार्वजनिक रूप से होस्ट नहीं करता। इसे Vercel या किसी अन्य Next.js होस्ट पर प्रकाशित करें। सार्वजनिक Production URL `.env.production` में `NEXT_PUBLIC_SITE_URL` के रूप में सेट है। Domain बदलने पर इस public URL को अपडेट करके फिर deploy करें। Vercel पर यह variable न हो तो `VERCEL_PROJECT_PRODUCTION_URL` या `VERCEL_URL` इस्तेमाल होता है।

मुखपृष्ठ की Open Graph और Twitter metadata Production URL और `public/images/ganesh-social-preview-2026.png` को साझा कार्ड में इस्तेमाल करती है। मोबाइल पर **शेयर करें** सिस्टम शेयर मेनू खोलता है, **WhatsApp** पूरा वेबसाइट लिंक भेजता है, और **लिंक कॉपी करें** Instagram Story के Link sticker में इस्तेमाल किया जा सकता है। तीनों विकल्प Production domain पर `?invite=ganesh-2026` वाला URL देते हैं, जिससे सोशल ऐप पुराने लिंक के cached preview की जगह नया Ganesh cover fetch कर सकें। साझा URL खोलने पर वेबसाइट का मुख्य पृष्ठ खुलता है।

सोशल ऐप पुराने लिंक प्रीव्यू को cache कर सकते हैं। नई deployment के बाद preview बदलने में समय लग सकता है।

## Animation and mobile interaction

`app/page.tsx` में cover opening और book page transitions Anime.js से चलते हैं। Cover खुलने के बाद section reveals GSAP ScrollTrigger से शुरू होते हैं; mobile और `prefers-reduced-motion` के लिए `gsap.matchMedia()` अलग व्यवहार रखता है। Couple photo banner स्थिर है। किताब और फोटो gallery में केवल स्पष्ट horizontal swipe से पृष्ठ या तस्वीर बदलती है; arrow buttons और keyboard arrows भी काम करते हैं। कार्यक्रम की route timeline `app/data/weddingData.ts` की पाँच मूल रस्मों से बनती है।
