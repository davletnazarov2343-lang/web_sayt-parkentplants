import { groq } from "next-sanity";

/**
 * GROQ query'lar — Sanity dan ma'lumot olish uchun.
 * Har biri o'zining TypeScript turi `types.ts` da.
 */

// ---------- Fruit types ----------

export const allFruitTypesQuery = groq`
  *[_type == "fruitType"] | order(ordering asc) {
    _id,
    "slug": slug.current,
    name,
    emoji,
    shortDescription,
    "varietyCount": count(*[_type == "variety" && fruitType._ref == ^._id && status == "active"])
  }
`;

export const fruitTypeBySlugQuery = groq`
  *[_type == "fruitType" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name,
    emoji,
    shortDescription
  }
`;

// ---------- Varieties ----------

const varietyCardProjection = groq`
  _id,
  "slug": slug.current,
  name,
  status,
  featured,
  ripeningTime,
  exportable,
  coverImage,
  "fruitType": fruitType-> { "slug": slug.current, name, emoji }
`;

export const featuredVarietiesQuery = groq`
  *[_type == "variety" && featured == true && status == "active"]
    | order(sortOrder asc, name.uz asc) [0...8] {
    ${varietyCardProjection}
  }
`;

export const allVarietiesQuery = groq`
  *[_type == "variety" && status == "active"]
    | order(sortOrder asc, name.uz asc) {
    ${varietyCardProjection}
  }
`;

export const varietiesByFruitTypeQuery = groq`
  *[_type == "variety" && status == "active" && fruitType->slug.current == $fruitTypeSlug]
    | order(sortOrder asc, name.uz asc) {
    ${varietyCardProjection}
  }
`;

export const varietyBySlugQuery = groq`
  *[_type == "variety" && slug.current == $slug && fruitType->slug.current == $fruitTypeSlug][0] {
    _id,
    "slug": slug.current,
    name,
    status,
    description,
    ripeningTime,
    treeSize,
    yieldKgPerTree,
    exportable,
    origin,
    certifications,
    characteristicsExtra,
    coverImage,
    gallery,
    seoTitle,
    seoDescription,
    "fruitType": fruitType-> {
      _id,
      "slug": slug.current,
      name,
      emoji
    }
  }
`;

export const allVarietySlugsQuery = groq`
  *[_type == "variety" && status == "active" && defined(slug.current)] {
    "slug": slug.current,
    "fruitTypeSlug": fruitType->slug.current
  }
`;

export const allFruitTypeSlugsQuery = groq`
  *[_type == "fruitType" && defined(slug.current)] {
    "slug": slug.current
  }
`;
