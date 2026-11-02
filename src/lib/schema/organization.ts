/**
 * Brend entity ma'lumotlari: Organization + Person (asoschi).
 *
 * Sayt bo'ylab (layout'da) bir marta chiqariladi. Organization faqat BITTA —
 * `ORG_ID`; boshqa joylarda (LocalBusiness, WebSite, Article) unga faqat
 * `@id` orqali havola qilinadi. Asoschi ham `FOUNDER_ID` orqali.
 *
 * Faktlar (OAV havolalari, STIR, sanalar) faqat tasdiqlangan manbalardan.
 */

export const BASE_URL = "https://parkentplants.uz";
export const ORG_ID = `${BASE_URL}/#organization`;
export const FOUNDER_ID = `${BASE_URL}/#shuhrat-abrorov`;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Parkent Plants",
    legalName: "Norchontol fermer xo'jaligi",
    alternateName: [
      "Norchontol",
      "Норчонтол",
      "Norchontol ko'chatchilik xo'jaligi",
      "Норчонтол фермерское хозяйство",
      "Паркент Плантс",
    ],
    description:
      "Parkent Plants — Norchontol fermer xo'jaligining brendi. 2002-yildan beri Toshkent viloyatida mevali daraxt ko'chatlarini yetishtiradigan ko'chatzor (Parkent va Yuqori Chirchiq).",
    url: BASE_URL,
    logo: `${BASE_URL}/brand/icon-square.png`,
    foundingDate: "2002",
    taxID: "203992341",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressRegion: "Toshkent viloyati",
      addressLocality: "Parkent tumani, Boyqozon mahallasi",
    },
    // Shuhrat Abrorov — 2016-yildan sherik (2002-yildagi asoschi EMAS),
    // shuning uchun `founder` emas, `member` sifatida bog'lanadi.
    member: { "@id": FOUNDER_ID },
    sameAs: [
      "https://t.me/+Q2HYAuBIWn4wN2Vi",
      "https://www.instagram.com/shuhrat_abrorov/",
      "https://www.facebook.com/profile.php?id=61552782846741",
      "https://www.youtube.com/@shuhrat_abrorov",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+998-78-113-18-19",
        contactType: "customer service",
        areaServed: ["UZ", "TJ", "KG", "TM", "KZ"],
        availableLanguage: ["uz", "ru"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+998-99-557-38-00",
        contactType: "sales",
        contactOption: "TollFree",
        areaServed: ["UZ", "TJ", "KG", "TM", "KZ"],
      },
    ],
    subjectOf: [
      {
        "@type": "NewsArticle",
        headline:
          "Agro House intensiv bog'dorchilik bo'yicha bog'bonlar va fermerlar uchun seminar o'tkazdi",
        url: "https://kun.uz/news/2018/09/01/agro-house-intensiv-bogdorcilik-bujica-bogbonlar-va-fermerlar-ucun-seminar-utkazdi",
        datePublished: "2018-09-01",
        publisher: { "@type": "Organization", name: "Kun.uz" },
      },
      {
        "@type": "NewsArticle",
        headline:
          "Таджикские садоводы закупают в Узбекистане сертифицированные саженцы для закладки интенсивных садов",
        url: "https://east-fruit.com/novosti/tadzhikskie-sadovody-zakupayut-v-uzbekistane-sertifitsirovannye-sazhentsy-dlya-zakladki-intensivnykh-sadov/",
        datePublished: "2020-03-18",
        publisher: { "@type": "Organization", name: "EastFruit" },
      },
      {
        "@type": "NewsArticle",
        headline:
          "«Bularni qilmay turib, yuqori natijaga erisholmaymiz» — mutaxassislardan O'zbekistonda ko'chatchilikni rivojlantirish bo'yicha takliflar",
        url: "https://kun.uz/64028730",
        datePublished: "2021-12-31",
        publisher: { "@type": "Organization", name: "Kun.uz" },
      },
    ],
  };
}

export function getFounderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "Shuhrat Abrorov",
    alternateName: ["Шухрат Аброров", "Shukhrat Abrorov", "Shukrat Abrorov"],
    jobTitle: "Agronom, bog'dorchilik bo'yicha xalqaro konsultant",
    description:
      "O'zbekistonlik agronom va xalqaro bog'dorchilik konsultanti. 2016-yildan Parkent Plants (Norchontol) ko'chatchilik xo'jaligi sherigi. 5 qit'adagi 30+ davlat bog'lari tajribasi, 20 ga yaqin kitob muallifi, Fruit House Organics (2019) va Agronomlar maktabi (2023) asoschisi. O'zbekiston bo'ylab ~2 500 ga bog'larda konsultant.",
    url: `${BASE_URL}/uz/shuhrat-abrorov`,
    image: `${BASE_URL}/team/shuhrat/seminar.jpg`,
    birthDate: "1983-05-22",
    birthPlace: {
      "@type": "Place",
      name: "Marhamat tumani, Andijon viloyati, O'zbekiston",
    },
    nationality: { "@type": "Country", name: "Uzbekistan" },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Toshkent Davlat Agrar Universiteti",
        alternateName: "Tashkent State Agrarian University",
      },
    ],
    worksFor: [
      { "@id": ORG_ID },
      {
        "@type": "Organization",
        name: "Fruit House Organics",
        foundingDate: "2019",
        description: "Bog'dorchilik konsalting firmasi (hammuassis: Fabian Martel)",
      },
      {
        "@type": "EducationalOrganization",
        name: "Agronomlar maktabi",
        foundingDate: "2023",
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Agronom-konsultant",
      occupationLocation: { "@type": "Country", name: "Uzbekistan" },
    },
    knowsAbout: [
      "intensiv bog'dorchilik",
      "mevali ko'chat yetishtirish",
      "danakli mevalar",
      "gilos",
      "olma",
      "payvandtaglar",
      "tomchilatib sug'orish",
      "agronomlar ta'limi",
    ],
    sameAs: [
      "https://t.me/shuhrat_abrorov",
      "https://www.youtube.com/@shuhrat_abrorov",
      "https://www.instagram.com/shuhrat_abrorov/",
      "https://www.facebook.com/profile.php?id=61552782846741",
    ],
    subjectOf: [
      {
        "@type": "NewsArticle",
        headline:
          "Bog'dorchilikda tomchilatib sug'orish: nega ishlar sur'ati sust?",
        url: "https://kun.uz/news/2024/12/19/bogdorchilikda-tomchilatib-sugorish-nega-ishlar-surati-sust",
        datePublished: "2024-12-19",
        publisher: { "@type": "Organization", name: "Kun.uz" },
      },
      {
        "@type": "Article",
        headline: "Aussies host cherry grower from Uzbekistan",
        url: "https://www.treefruit.com.au/orchard/management/crop-growth-management/665-aussies-host-cherry-grower-from-uzbekistan",
        publisher: { "@type": "Organization", name: "Tree Fruit (Australia)" },
      },
    ],
  };
}
