import { defineType, defineField } from "sanity";
import { Sprout } from "lucide-react";

/**
 * Mevali nav. Har bir nav alohida SEO sahifaga ega bo'ladi:
 *   /uz/varieties/[fruitType]/[slug]
 */
export const variety = defineType({
  name: "variety",
  title: "Nav",
  type: "document",
  icon: Sprout,
  groups: [
    { name: "core", title: "Asosiy", default: true },
    { name: "details", title: "Tafsilotlar" },
    { name: "media", title: "Rasm" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nav nomi (uz/ru)",
      type: "localizedString",
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description: "Masalan: gala, granny-smith",
      type: "slug",
      group: "core",
      options: {
        source: (doc) => {
          const d = doc as { name?: { uz?: string } };
          return d?.name?.uz || "";
        },
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/'/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fruitType",
      title: "Meva turi",
      type: "reference",
      to: [{ type: "fruitType" }],
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Holat",
      type: "string",
      group: "core",
      options: {
        list: [
          { title: "Aktiv (saytda ko'rinadi)", value: "active" },
          { title: "Yangi (taqdim etilmoqda)", value: "upcoming" },
          { title: "Arxiv (yashirin)", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Bosh sahifada ko'rsatish?",
      description: "Faqat eng muhim navlar uchun belgilang",
      type: "boolean",
      group: "core",
      initialValue: false,
    }),

    // ===== Tafsilotlar =====
    defineField({
      name: "description",
      title: "Tavsif (uz/ru)",
      type: "localizedText",
      group: "details",
    }),
    defineField({
      name: "ripeningTime",
      title: "Pishish vaqti (uz/ru)",
      description: "Masalan: \"Iyun oxiri\", \"Sentyabr boshlari\"",
      type: "localizedString",
      group: "details",
    }),
    defineField({
      name: "treeSize",
      title: "Daraxt o'lchami",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Past bo'yli (M9, M27)", value: "small" },
          { title: "O'rta bo'yli (MM106)", value: "medium" },
          { title: "Yirik (kuchli o'sadigan)", value: "large" },
        ],
      },
    }),
    defineField({
      name: "yieldKgPerTree",
      title: "Daraxtdan o'rtacha hosil (kg)",
      type: "number",
      group: "details",
    }),
    defineField({
      name: "exportable",
      title: "Eksportbop?",
      description: "Saqlash va tashish uchun yaroqli navlar",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "origin",
      title: "Kelib chiqishi (uz/ru)",
      description: "Masalan: \"AQSh\", \"Niderlandiya\", \"Mahalliy seleksiya\"",
      type: "localizedString",
      group: "details",
    }),
    defineField({
      name: "certifications",
      title: "Sertifikatlar",
      description: "Masalan: davlat reestri, fitosanitar, ISO",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "characteristicsExtra",
      title: "Qo'shimcha tavsif (uz/ru)",
      description: "Pomologik ma'lumot, agronomik maslahat",
      type: "localizedText",
      group: "details",
    }),

    // ===== Rasm =====
    defineField({
      name: "coverImage",
      title: "Asosiy rasm",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text (uz)",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeriya (qo'shimcha rasmlar)",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        },
      ],
    }),

    // ===== SEO =====
    defineField({
      name: "seoTitle",
      title: "SEO sarlavha (uz/ru)",
      description:
        "Bo'sh qoldirilsa avtomatik nav nomi + meva turi ishlatiladi",
      type: "localizedString",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO tavsif (uz/ru, 150-160 belgi)",
      type: "localizedText",
      group: "seo",
    }),
    defineField({
      name: "sortOrder",
      title: "Tartib raqami",
      description: "Katalogda ko'rinish tartibi",
      type: "number",
      group: "seo",
      initialValue: 100,
    }),
  ],

  orderings: [
    {
      title: "Tartib raqami",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Nomi (A-Z)",
      name: "nameAsc",
      by: [{ field: "name.uz", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "name.uz",
      subtitle: "fruitType.name.uz",
      media: "coverImage",
      featured: "featured",
      status: "status",
    },
    prepare({ title, subtitle, media, featured, status }) {
      const flags = [
        featured ? "⭐" : null,
        status === "upcoming" ? "🆕" : null,
        status === "archived" ? "📦" : null,
      ]
        .filter(Boolean)
        .join(" ");
      return {
        title: flags ? `${flags} ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
