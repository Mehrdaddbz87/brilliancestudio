export const impressumPage = {
  name: "impressumPage",
  title: "Imprint Page",
  type: "document",
  fields: [
    { name: "eyebrow", title: "Eyebrow", type: "string" },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    { name: "seoTitle", title: "SEO Title", type: "string" },
    { name: "seoDescription", title: "SEO Description", type: "text", rows: 3 },
    {
      name: "sections",
      title: "Legal Sections",
      type: "array",
      of: [{ type: "legalSection" }],
      validation: (Rule) => Rule.min(1),
      description:
        "Use these sections for corporate identity, business contact data, responsible person details, and privacy contacts.",
    },
  ],
};
