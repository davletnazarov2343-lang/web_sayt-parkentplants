import { defineType, defineField } from "sanity";
import { Apple } from "lucide-react";

/**
 * Meva turi (apple, peach, ...). Variety har biri bitta fruitType ga ulanadi.
 * Slug — URL'da ishlatiladi: /uz/varieties/olma
 */
export const fruitType = defineType({
  name: "fruitType",
  title: "Meva turi",
  type: "document",
  icon: Apple,
  fields: [
    defineField({
      name: "name",
      title: "Nomi (uz/ru)",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description: "Masalan: olma, shaftoli, olcha",
      type: "slug",
      options: {
        source: (doc) => {
          const d = doc as { name?: { uz?: string } };
          return d?.name?.uz || "";
        },
        maxLength: 64,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/'/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 64),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "emoji",
      title: "Emoji (placeholder)",
      description: "Rasm yo'q bo'lganda ishlatiladi: 🍎 🍑 🍒",
      type: "string",
    }),
    defineField({
      name: "ordering",
      title: "Tartib raqami",
      description: "Sayt va katalogda ko'rinish tartibi (kichik raqam birinchi)",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "shortDescription",
      title: "Qisqa tavsif (uz/ru)",
      description: "Filter sahifasida kategoriya kartochkasida ko'rinadi",
      type: "localizedText",
    }),
  ],
  orderings: [
    {
      title: "Tartib raqami bo'yicha",
      name: "orderingAsc",
      by: [{ field: "ordering", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name.uz",
      subtitle: "slug.current",
      emoji: "emoji",
    },
    prepare({ title, subtitle, emoji }) {
      return {
        title: `${emoji ? emoji + " " : ""}${title}`,
        subtitle,
      };
    },
  },
});
