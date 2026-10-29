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
const ORG_ID = `${BASE_URL}/#organization`;
const LOCALBUSINESS_ID = `${BASE_URL}/#localbusiness`;

// ===========================================================================
// Schema generators
// ===========================================================================

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
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
    "@id": LOCALBUSINESS_ID,
    parentOrganization: { "@id": ORG_ID },
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
    publisher: { "@id": ORG_ID },
  };
}

/**
 * VideoObject schemalar — har bir YouTube video uchun.
 * Bu Google qidiruvda video rich snippets (Q&A, "Key moments") chiqarishi mumkin.
 */
export function getVideoCollectionSchema(
  videos: Array<{
    id: string;
    title: string;
    topic: string;
    uploadDate: string;
  }>,
) {
  return videos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: `${v.topic} — ${v.title}. Shuhrat Abrorov bog'dorchilik bo'yicha ko'rsatma.`,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
    uploadDate: v.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    publisher: { "@id": LOCALBUSINESS_ID },
    inLanguage: "uz-UZ",
  }));
}

/**
 * VideoObject schema — saytning o'zida joylashgan bitta video (mp4) uchun
 * (lending hero video). Google video natijalari uchun nom, tavsif, thumbnail,
 * contentUrl va uploadDate shart. URL'lar to'liq (absolute) bo'lishi kerak.
 */
export function getVideoObjectSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  /** ISO 8601, masalan "PT17S" */
  duration: string;
  inLanguage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: [video.thumbnailUrl],
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    publisher: { "@id": LOCALBUSINESS_ID },
    ...(video.inLanguage ? { inLanguage: video.inLanguage } : {}),
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
