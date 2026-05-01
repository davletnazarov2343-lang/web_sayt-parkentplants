import { defineType, defineField } from "sanity";

/**
 * Re-usable object type for `{ uz: string, ru: string }` fields.
 * Use it for short titles, names, labels.
 */
export const localizedString = defineType({
  name: "localizedString",
  title: "Localized string (uz/ru)",
  type: "object",
  fields: [
    defineField({
      name: "uz",
      title: "O'zbekcha",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ru",
      title: "Русский",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

/**
 * Same shape but for longer body text.
 */
export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text (uz/ru)",
  type: "object",
  fields: [
    defineField({
      name: "uz",
      title: "O'zbekcha",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ru",
      title: "Русский",
      type: "text",
      rows: 4,
    }),
  ],
});
