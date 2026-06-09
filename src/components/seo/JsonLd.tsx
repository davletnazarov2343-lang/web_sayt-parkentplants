/**
 * JSON-LD strukturalangan ma'lumot.
 * Google va boshqa qidiruv tizimlariga sayt mazmunini aniq ko'rsatadi:
 * - Organization (kompaniya identifikatsiyasi)
 * - LocalBusiness (mahalliy biznes, manzil, telefon)
 * - FAQPage (FAQ savol-javoblar)
 *
 * Schema.org standartiga muvofiq.
 */

type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const BASE_URL = "https://parkentplants.uz";

// ===========================================================================
// Schema generators
// ===========================================================================

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Parkent Plants (Norchontol)",
    legalName: "Norchontol fermer xo'jaligi",
    url: BASE_URL,
    logo: `${BASE_URL}/brand/icon-square.png`,
    foundingDate: "2002",
    founders: [
      {
        "@type": "Person",
        name: "Shuhrat Abrorov",
        jobTitle: "Founder & CEO",
        alumniOf: {
          "@type": "Place",
          name: "California, USA (Modern orchard training)",
        },
      },
    ],
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
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Farm"],
    "@id": `${BASE_URL}#business`,
    name: "Parkent Plants",
    alternateName: "Norchontol fermer xo'jaligi",
    description:
      "Markaziy Osiyoning yetakchi mevali ko'chatchilik xo'jaligi. 500 000+ ko'chat yiliga, 11 meva turi, 87 gektar maydon (Parkent 23 ga + Yuqori Chirchiq 64 ga).",
    url: BASE_URL,
    telephone: "+998-78-113-18-19",
    email: "info@parkentplants.uz",
    image: `${BASE_URL}/brand/og-image.jpg`,
    priceRange: "$$",
    foundingDate: "2002",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Boyqozon mahallasi",
        addressLocality: "Parkent tumani",
        addressRegion: "Toshkent viloyati",
        addressCountry: "UZ",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Politaddel",
        addressLocality: "Yuqori Chirchiq tumani",
        addressRegion: "Toshkent viloyati",
        addressCountry: "UZ",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "Country", name: "Tajikistan" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Turkmenistan" },
      { "@type": "Country", name: "Kazakhstan" },
    ],
    sameAs: [
      "https://t.me/+Q2HYAuBIWn4wN2Vi",
      "https://www.instagram.com/shuhrat_abrorov/",
      "https://www.facebook.com/profile.php?id=61552782846741",
      "https://www.youtube.com/@shuhrat_abrorov",
    ],
  };
}

export function getWebsiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Parkent Plants",
    alternateName:
      locale === "ru" ? "Питомник Паркент Плэнтс" : "Parkent Plants ko'chatzori",
    url: `${BASE_URL}/${locale}`,
    inLanguage: locale === "uz" ? "uz-UZ" : "ru-RU",
    publisher: { "@id": `${BASE_URL}#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${locale}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Service schema — Google'ga "biz qaysi xizmatni taklif qilamiz" deb aytadi.
 */
export function getServiceSchema(locale: string) {
  const isRu = locale === "ru";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: isRu
      ? "Продажа плодовых саженцев"
      : "Mevali ko'chat sotish",
    name: isRu
      ? "Plodovye sazhentsy optom i v roznitsu"
      : "Mevali ko'chat ulgurji va chakana",
    provider: { "@id": `${BASE_URL}#business` },
    areaServed: [
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "Country", name: "Tajikistan" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Turkmenistan" },
      { "@type": "Country", name: "Kazakhstan" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isRu ? "Каталог плодовых саженцев" : "Mevali ko'chat katalogi",
      itemListElement: [
        offerItem(isRu ? "Саженцы яблони" : "Olma ko'chati"),
        offerItem(isRu ? "Саженцы черешни и вишни" : "Olcha va gilos ko'chati"),
        offerItem(isRu ? "Саженцы персика" : "Shaftoli ko'chati"),
        offerItem(isRu ? "Саженцы абрикоса" : "O'rik ko'chati"),
        offerItem(isRu ? "Саженцы груши" : "Nok ko'chati"),
        offerItem(isRu ? "Саженцы сливы" : "Olxo'ri ko'chati"),
        offerItem(isRu ? "Саженцы винограда" : "Uzum ko'chati"),
        offerItem(isRu ? "Саженцы миндаля" : "Bodom ko'chati"),
      ],
    },
  };
}

function offerItem(name: string) {
  return {
    "@type": "Offer",
    itemOffered: { "@type": "Product", name, category: "Fruit saplings" },
  };
}

/**
 * VideoObject schemalar — har bir YouTube video uchun.
 * Bu Google qidiruvda video rich snippets (Q&A, "Key moments") chiqarishi mumkin.
 */
export function getVideoCollectionSchema(
  videos: Array<{ id: string; title: string; topic: string }>,
) {
  return videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: `${v.topic} — ${v.title}. Shuhrat Abrorov bog'dorchilik bo'yicha ko'rsatma.`,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
    uploadDate: "2025-01-01",
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    publisher: { "@id": `${BASE_URL}#business` },
    inLanguage: "uz-UZ",
  }));
}

/**
 * ImageObject schema — nursery fotolari uchun.
 * Google Images'da yaxshi rank uchun.
 */
export function getNurseryImagesSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      contentUrl: `${BASE_URL}/images/hero-nursery.jpg`,
      url: `${BASE_URL}/images/hero-nursery.jpg`,
      name: "Norchontol ko'chatzori — mevali ko'chat qatorlari",
      description:
        "Parkent Plants (Norchontol) ko'chatzori — Toshkent viloyati. 87 gektar maydonda mevali ko'chatlar.",
      caption: "Norchontol mevali ko'chatzori",
      creator: { "@id": `${BASE_URL}#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      contentUrl: `${BASE_URL}/images/parkent-nursery.jpg`,
      url: `${BASE_URL}/images/parkent-nursery.jpg`,
      name: "Parkent ko'chatzori — uzumzor",
      description:
        "Parkent ko'chatzori, Toshkent vil., Boyqozon mahallasi. 23 gektar maydon.",
      caption: "Parkent ko'chatzori (Boyqozon)",
      creator: { "@id": `${BASE_URL}#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      contentUrl: `${BASE_URL}/images/yuqori-chirchiq.jpg`,
      url: `${BASE_URL}/images/yuqori-chirchiq.jpg`,
      name: "Yuqori Chirchiq ko'chatzori — yosh ko'chat qatorlari",
      description:
        "Yuqori Chirchiq filiali, 64 gektar maydonda mevali ko'chat ishlab chiqarish.",
      caption: "Yuqori Chirchiq filiali",
      creator: { "@id": `${BASE_URL}#business` },
    },
  ];
}

export function getBreadcrumbSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ru" ? "Главная" : "Bosh sahifa",
        item: `${BASE_URL}/${locale}`,
      },
    ],
  };
}

export type FaqItem = { question: string; answer: string };

export function getFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
