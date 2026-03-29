export const legalSection = {
  name: "legalSection",
  title: "Legal Section",
  type: "object",
  fields: [
    {
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Optional short label shown above the section heading.",
    },
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
      rows: 8,
      description:
        "Main legal copy. Separate paragraphs with blank lines for better readability.",
    },
    {
      name: "listItems",
      title: "List Items",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Optional bullet points for obligations, disclosures, or compliance commitments.",
    },
    {
      name: "contactItems",
      title: "Contact Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
            {
              name: "href",
              title: "Link",
              type: "string",
              description:
                "Optional explicit link such as mailto:privacy@example.com or https://example.com.",
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
      description:
        "Optional structured contact details for privacy, support, or legal notices.",
    },
    {
      name: "note",
      title: "Compliance Note",
      type: "text",
      rows: 4,
      description:
        "Optional highlighted note for jurisdiction, consent, or privacy obligations.",
    },
  ],
};
