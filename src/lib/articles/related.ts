/**
 * Maqola -> tegishli ko'chat kategoriyasi va lendinglar (ichki havolalar).
 *
 * Xarita maqola JSON'idan alohida: maqola matni muallifniki, unga hech narsa
 * qo'shilmaydi. Kalit — maqola slug'i (fayl nomi).
 * - `category`: /kochatlar/<slug>; `null` — kategoriya yo'q, umumiy /kochatlar hub.
 * - `landings`: tegishli nav lendinglari (ko'rsatish tartibida).
 *
 * Yangi maqola qo'shilsa — shu yerga ham yozuv qo'shing (aks holda blok chiqmaydi).
 */

import { getAllArticles } from "./index";
import type { Article } from "./types";
import type { LandingSlug } from "@/lib/landings";

export type ArticleRelated = {
  category: string | null;
  landings: ReadonlyArray<LandingSlug>;
};

export const ARTICLE_RELATED: Record<string, ArticleRelated> = {
  "olmada-serhosillikka-tasir-qiluvchi-omillar": {
    category: "olma-kochati",
    landings: ["pink-lady", "granny-smith", "devil-gala"],
  },
  "gilosda-serhosillikka-tasir-qiluvchi-omillar": {
    category: "gilos-kochati",
    landings: ["sweet-aryana"],
  },
  "nokda-serhosillikka-tasir-qiluvchi-omillar": {
    category: "nok-kochati",
    landings: [],
  },
  "orikda-serhosillikka-tasir-qiluvchi-omillar": {
    category: "orik-kochati",
    landings: [],
  },
  "tuproq-analizi-uchun-namuna-olish-tartibi": {
    category: null,
    landings: [],
  },
};

export function getArticleRelated(slug: string): ArticleRelated | undefined {
  return ARTICLE_RELATED[slug];
}

/** Kategoriyaga bog'langan maqolalar (kategoriya sahifasi uchun) */
export function getArticlesForCategory(categorySlug: string): Article[] {
  return getAllArticles().filter(
    (a) => ARTICLE_RELATED[a.slug]?.category === categorySlug,
  );
}

/** Lendingga bog'langan maqolalar (lending sahifasi uchun) */
export function getArticlesForLanding(landing: LandingSlug): Article[] {
  return getAllArticles().filter((a) =>
    ARTICLE_RELATED[a.slug]?.landings.includes(landing),
  );
}
