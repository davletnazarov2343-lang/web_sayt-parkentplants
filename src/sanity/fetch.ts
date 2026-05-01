/**
 * Server-side fetchers — har sahifada qo'llaniladi.
 * Ichkarida ISR (revalidate) sozlanadi.
 *
 * Sanity sozlanmagan bo'lsa (env yo'q yoki ulanish xatosi) — `safe*` variantlar
 * bo'sh array/null qaytaradi, sayt yiqilmaydi.
 */

import {
  allFruitTypesQuery,
  fruitTypeBySlugQuery,
  featuredVarietiesQuery,
  allVarietiesQuery,
  varietiesByFruitTypeQuery,
  varietyBySlugQuery,
  allVarietySlugsQuery,
  allFruitTypeSlugsQuery,
} from "./queries";
import type {
  FruitTypeListItem,
  FruitTypeRef,
  VarietyCard,
  VarietyDetail,
  AllVarietySlugsResult,
  AllFruitTypeSlugsResult,
} from "./types";

// 1 soat default — har sahifa uchun moslab override qilamiz
const DEFAULT_REVALIDATE = 60 * 60;

const baseOptions = {
  next: { revalidate: DEFAULT_REVALIDATE },
};

/**
 * Sanity client'ni faqat env mavjud bo'lganda dynamic import qilamiz.
 * Shu tarzda `env.ts` dagi assertValue env yo'q paytda render'ni yiqitmaydi.
 */
function isSanityConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  );
}

async function getClient() {
  const { sanityClient } = await import("./client");
  return sanityClient;
}

async function safeFetch<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  if (!isSanityConfigured()) return fallback;
  try {
    return await run();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[sanity] fetch failed, using fallback:", err);
    }
    return fallback;
  }
}

export async function getAllFruitTypes(): Promise<FruitTypeListItem[]> {
  return safeFetch([], async () => {
    const c = await getClient();
    return c.fetch(allFruitTypesQuery, {}, baseOptions);
  });
}

export async function getFruitTypeBySlug(
  slug: string,
): Promise<FruitTypeRef | null> {
  return safeFetch(null, async () => {
    const c = await getClient();
    return c.fetch(fruitTypeBySlugQuery, { slug }, baseOptions);
  });
}

export async function getFeaturedVarieties(): Promise<VarietyCard[]> {
  return safeFetch([], async () => {
    const c = await getClient();
    return c.fetch(featuredVarietiesQuery, {}, baseOptions);
  });
}

export async function getAllVarieties(): Promise<VarietyCard[]> {
  return safeFetch([], async () => {
    const c = await getClient();
    return c.fetch(allVarietiesQuery, {}, baseOptions);
  });
}

export async function getVarietiesByFruitType(
  fruitTypeSlug: string,
): Promise<VarietyCard[]> {
  return safeFetch([], async () => {
    const c = await getClient();
    return c.fetch(varietiesByFruitTypeQuery, { fruitTypeSlug }, baseOptions);
  });
}

export async function getVariety(
  fruitTypeSlug: string,
  slug: string,
): Promise<VarietyDetail | null> {
  return safeFetch(null, async () => {
    const c = await getClient();
    return c.fetch(varietyBySlugQuery, { fruitTypeSlug, slug }, baseOptions);
  });
}

export async function getAllVarietySlugs(): Promise<AllVarietySlugsResult> {
  return safeFetch([], async () => {
    const c = await getClient();
    return c.fetch(allVarietySlugsQuery, {}, baseOptions);
  });
}

export async function getAllFruitTypeSlugs(): Promise<AllFruitTypeSlugsResult> {
  return safeFetch([], async () => {
    const c = await getClient();
    return c.fetch(allFruitTypeSlugsQuery, {}, baseOptions);
  });
}

export { isSanityConfigured };
