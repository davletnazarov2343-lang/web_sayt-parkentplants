import type { Metadata } from "next";
import { toLocale, buildAlternates, SITE_URL } from "./alternates";

export const SITE_NAME = "Parkent Plants";

export type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

/**
 * Sahifa o'z rasmini bermasa — standart OG rasm (nihollar qatori, 1920x1080).
 * Bosh sahifaning logotipli kvadrat rasmi (`/brand/og-image.jpg`) faqat layout'da.
 */
export const DEFAULT_OG_IMAGE: OgImage = {
  url: "/images/hero-nursery.jpg",
  width: 1920,
  height: 1080,
};

/**
 * Ma'lum rasmlarning haqiqiy o'lchamlari (px) — og:image:width/height uchun.
 * Yangi rasm qo'shilsa, bu yerga ham yozing (yo'q bo'lsa o'lchamsiz ham ishlaydi).
 */
const IMAGE_SIZES: Record<string, [number, number]> = {
  "/images/hero-nursery.jpg": [1920, 1080],
  "/brand/og-image.jpg": [2835, 2835],
  "/images/bodom-kochati.jpg": [1024, 1024],
  "/images/gilos-kochati.jpg": [640, 640],
  "/images/nok-kochati.jpg": [720, 1280],
  "/images/olcha-kochati.jpg": [1200, 675],
  "/images/olma-kochati.jpg": [1278, 1280],
  "/images/olxori-kochati.jpg": [1200, 675],
  "/images/orik-kochati.jpg": [1200, 675],
  "/images/shaftoli-kochati.jpg": [350, 350],
  "/images/uzum-kochati.jpg": [709, 709],
  "/images/gilos-bozori-2027.jpg": [640, 640],
  "/images/maqolalar/tuproq-namuna.jpg": [683, 683],
};

const OG_LOCALE = { uz: "uz_UZ", ru: "ru_RU" } as const;

/**
 * Yagona metadata yig'uvchi: title/description + canonical/hreflang +
 * OpenGraph (url/title/description/image/siteName/locale) + Twitter card.
 * Matnlar (title/description) o'zgartirilmaydi — qanday kelsa, shunday ishlatiladi.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image,
  keywords,
  type = "website",
  publishedTime,
  authors,
}: {
  locale: string;
  /** Locale prefiksisiz yo'l ("" = bosh sahifa) */
  path?: string;
  title: string;
  description: string;
  image?: OgImage;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const lang = toLocale(locale);
  const alternates = buildAlternates(lang, path);
  const img = image ?? DEFAULT_OG_IMAGE;
  const size = IMAGE_SIZES[img.url];
  const ogImage = {
    ...(size ? { width: size[0], height: size[1] } : {}),
    ...img,
    alt: img.alt ?? title,
  };

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(authors ? { authors: authors.map((name) => ({ name })) } : {}),
    alternates,
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url: alternates.canonical,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[lang === "uz" ? "ru" : "uz"]],
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export { SITE_URL };
