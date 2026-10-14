/**
 * Mavzu -> muqova rasmi. Rasmlar ko'chat kategoriyalaridan (categories.ts)
 * olinadi; rasmi yo'q mavzu (masalan "tuproq") uchun `undefined` —
 * komponent gradient + SVG muqova chizadi.
 */

import { getCategoryBySlug } from "@/lib/categories";
import type { ArticleTopic } from "./types";

const TOPIC_CATEGORY: Record<ArticleTopic, string | undefined> = {
  tuproq: undefined,
  olma: "olma-kochati",
  nok: "nok-kochati",
  gilos: "gilos-kochati",
  orik: "orik-kochati",
};

export function getTopicCover(topic: ArticleTopic): string | undefined {
  const slug = TOPIC_CATEGORY[topic];
  return slug ? getCategoryBySlug(slug)?.cover : undefined;
}
