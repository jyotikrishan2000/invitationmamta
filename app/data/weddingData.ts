export interface WeddingEvent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  isoStart: string;
  isoEnd: string;
  accent: string;
}

export const WEDDING_DATA = {
  invocations: "|| नागणेची माता नमः ||  || श्री गणेशाय नमः ||  || ॐ नमः शिवाय ||",
  invocationNames: ["॥ नागणेची माता नमः ॥", "॥ श्री गणेशाय नमः ॥", "॥ ॐ नमः शिवाय ॥"],
  sanskritShloka:
    "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
  title: "शुभ विवाह",
  hashtag: "#ममतासंगजितेन्द्र",
  bride: {
    prefix: "सौ. कां.",
    name: "ममता कुमारी",
    parents: "सुपुत्री श्रीमती बबीता देवी एवं श्री रामाजी राठौड़",
    address: "मेघवालों का वास, ऐलाना, जालोर",
  },
  groom: {
    prefix: "चि.",
    name: "जितेन्द्र जी",
    parents: "सुपुत्र श्रीमती मंजू देवी एवं श्री फूलचंद जी परमार",
    address: "बागरा, जालोर (राज.)",
  },
  coupleLine: "सौ. कां. ममता कुमारी संग चि. जितेन्द्र जी",
  weddingDateDisplay: "03.12.2026",
  weddingDateHindi: "गुरुवार, 03 दिसम्बर 2026",
  weddingIsoTarget: "2026-12-03T08:00:00+05:30",
  baraatDetails:
    "बारात श्री फूलचंद जी सुपुत्र श्री मोड़ा जी परमार, निवासी बागरा (जालोर) वालों के यहाँ से आएगी!",
  venueDetails:
    "श्री रामाजी सुपुत्र स्व. श्री सोगा जी राठौड़, मेघवालों का वास, ऐलाना, जालोर",
  venueShort: "ऐलाना, जालोर (राजस्थान)",
  mapsQueryUrl: "https://maps.app.goo.gl/9E27zsXjpJVj4QgcA",
  contacts: [
    { label: "संपर्क 1", number: "9982648548", whatsapp: "919982648548" },
    { label: "संपर्क 2", number: "9106035651", whatsapp: "919106035651" },
  ],
  closingMessage: "राठौड़ परिवार आपका हार्दिक स्वागत करता है!",
  familyInvitations: [
    {
      id: "sweet-welcome",
      title: "मिठी मनुहार",
      introduction: "हम भी करें आपका स्वागत",
      names: ["गरिमा", "आराध्या", "किरण", "पूजा", "कंचन", "खुशबू", "संजु", "प्रियंका"],
    },
    {
      id: "maternal-family",
      title: "ननिहाल पक्ष",
      introduction: "समस्त मेस्ड परिवार — आलासन, जालोर",
      names: ["श्री लक्ष्मणजी", "सवजी", "लालारामजी", "ओमप्रकाशजी", "प्रवीण", "विकास", "विवान"],
    },
    {
      id: "nephews-family",
      title: "भांजे पक्ष",
      introduction: "सपरिवार स्नेहिल आमंत्रण",
      names: ["हितेश", "किशन", "निखिल", "मयंक"],
    },
    {
      id: "jamai-family",
      title: "जमाई पक्ष",
      introduction: "परिवार की बेटियों और जमाईजनों का स्नेहिल आमंत्रण",
      names: ["छन्नीदेवी — महेन्द्रजी रांगी, सायला", "रेखा देवी — बूटा रामजी पुंछल, धनानी", "गोमतीदेवी — रणछोड़जी बोकावत, मोकणी"],
    },
    {
      id: "special-invitation",
      title: "विशेष प्रार्थी",
      introduction: "सादर पधारने का विशेष आग्रह",
      names: ["राधा देवी — भगवानारामजी चुंडावत, उम्मेदाबाद", "पंकु देवी — पारसा रामजी परिहार, खरल"],
    },
    {
      id: "divine-blessings",
      title: "दिव्य आशीष",
      introduction: "पूज्यजनों का आशीर्वाद",
      names: ["सोथी देवी — सोगाजी राठौड़"],
    },
  ],
  events: [
    {
      id: "vinayak-pujan",
      number: "01",
      title: "गणेश स्थापना एवं विनायक पूजन",
      subtitle: "मंगल गणपति स्थापना एवं पूजन",
      date: "01.12.2026",
      day: "मंगलवार",
      time: "सुबह 9:30 बजे",
      venue: "राठौड़ निवास, मेघवालों का वास, ऐलाना, जालोर",
      isoStart: "20261201T093000",
      isoEnd: "20261201T113000",
      accent: "गणेश वंदना",
    },
    {
      id: "bandoli",
      number: "02",
      title: "बंदोली",
      subtitle: "मांगलिक गीत एवं नृत्य उत्सव",
      date: "02.12.2026",
      day: "बुधवार",
      time: "रात्रि 9:00 बजे",
      venue: "राठौड़ निवास, मेघवालों का वास, ऐलाना, जालोर",
      isoStart: "20261202T210000",
      isoEnd: "20261202T233000",
      accent: "उत्सव संध्या",
    },
    {
      id: "baraat-swagat",
      number: "03",
      title: "बारात स्वागत",
      subtitle: "वर पक्ष का भव्य स्वागत एवं मिलनी",
      date: "03.12.2026",
      day: "गुरुवार",
      time: "सुबह 6:00 बजे",
      venue: "शुभ विवाह स्थल, मेघवालों का वास, ऐलाना, जालोर",
      isoStart: "20261203T060000",
      isoEnd: "20261203T073000",
      accent: "स्वागत वेला",
    },
    {
      id: "hast-milap",
      number: "04",
      title: "हस्त मिलाप",
      subtitle: "पाणिग्रहण संस्कार एवं सप्तपदी",
      date: "03.12.2026",
      day: "गुरुवार",
      time: "सुबह 8:00 बजे",
      venue: "शुभ विवाह स्थल, मेघवालों का वास, ऐलाना, जालोर",
      isoStart: "20261203T080000",
      isoEnd: "20261203T103000",
      accent: "शुभ लग्न",
    },
    {
      id: "pritibhoj",
      number: "05",
      title: "सभा एवं प्रीतिभोज",
      subtitle: "स्नेह मिलन एवं स्वरुचि भोज",
      date: "03.12.2026",
      day: "गुरुवार",
      time: "सुबह 11:00 बजे",
      venue: "शुभ विवाह स्थल, मेघवालों का वास, ऐलाना, जालोर",
      isoStart: "20261203T110000",
      isoEnd: "20261203T150000",
      accent: "आतिथ्य सत्कार",
    },
  ] satisfies WeddingEvent[],
};
