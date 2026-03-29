export const textSection = {
  name: "textSection",
  title: "Text Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    },
  ],
};

export const featureListSection = {
  name: "featureListSection",
  title: "Feature List Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    },
  ],
};

export const ctaSection = {
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    { name: "body", title: "Body", type: "text", rows: 5 },
    { name: "primaryLabel", title: "Primary Button Label", type: "string" },
    { name: "primaryHref", title: "Primary Button Link", type: "string" },
    { name: "secondaryLabel", title: "Secondary Button Label", type: "string" },
    { name: "secondaryHref", title: "Secondary Button Link", type: "string" },
  ],
};

export const gallerySectionItem = {
  name: "gallerySectionItem",
  title: "Gallery Item",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    { name: "description", title: "Description", type: "text", rows: 4 },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
    },
  ],
};

export const gallerySection = {
  name: "gallerySection",
  title: "Gallery Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      title: "Gallery Items",
      type: "array",
      of: [{ type: "gallerySectionItem" }],
      validation: (Rule) => Rule.min(1),
    },
  ],
};
