export const referenceCard = {
  name: "referenceCard",
  title: "Reference Card",
  type: "object",
  fields: [
    { name: "category", title: "Category", type: "string" },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    },
  ],
};
