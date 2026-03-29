const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedCms() {
  await prisma.servicePage.upsert({
    where: { slug: "services" },
    update: {
      eyebrow: "Database CMS",
      title: "Services",
      description:
        "Premium web strategy, design systems, and modern development services managed through Prisma and PostgreSQL.",
      seoTitle: "Services | Brilliance Studio",
      seoDescription:
        "Database-backed sample services content for Brilliance Studio.",
      primaryCtaLabel: "Send inquiry",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Request booking",
      secondaryCtaHref: "/booking",
      sections: [
        {
          _key: "db-services-1",
          _type: "textSection",
          eyebrow: "Database Seed",
          heading: "Service page content from PostgreSQL",
          body: "This sample content is stored in PostgreSQL via Prisma and can be used as a structured fallback for your CMS-driven pages.",
        },
      ],
      items: {
        deleteMany: {},
        create: [
          {
            slug: "positioning-concept",
            eyebrow: "Strategy",
            title: "Positioning & Concept",
            description:
              "Clear digital positioning and audience-focused structure before design and development begin.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Strategy placeholder",
            sortOrder: 1,
          },
          {
            slug: "luxury-ui-systems",
            eyebrow: "Design",
            title: "Luxury UI Systems",
            description:
              "Elegant interface systems with premium typography, spacing, and restrained high-end styling.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Design placeholder",
            sortOrder: 2,
          },
          {
            slug: "modern-development",
            eyebrow: "Build",
            title: "Modern Development",
            description:
              "Fast, maintainable implementation for ambitious brand websites built with modern tooling.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Development placeholder",
            sortOrder: 3,
          },
        ],
      },
    },
    create: {
      slug: "services",
      eyebrow: "Database CMS",
      title: "Services",
      description:
        "Premium web strategy, design systems, and modern development services managed through Prisma and PostgreSQL.",
      seoTitle: "Services | Brilliance Studio",
      seoDescription:
        "Database-backed sample services content for Brilliance Studio.",
      primaryCtaLabel: "Send inquiry",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Request booking",
      secondaryCtaHref: "/booking",
      sections: [
        {
          _key: "db-services-1",
          _type: "textSection",
          eyebrow: "Database Seed",
          heading: "Service page content from PostgreSQL",
          body: "This sample content is stored in PostgreSQL via Prisma and can be used as a structured fallback for your CMS-driven pages.",
        },
      ],
      items: {
        create: [
          {
            slug: "positioning-concept",
            eyebrow: "Strategy",
            title: "Positioning & Concept",
            description:
              "Clear digital positioning and audience-focused structure before design and development begin.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Strategy placeholder",
            sortOrder: 1,
          },
          {
            slug: "luxury-ui-systems",
            eyebrow: "Design",
            title: "Luxury UI Systems",
            description:
              "Elegant interface systems with premium typography, spacing, and restrained high-end styling.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Design placeholder",
            sortOrder: 2,
          },
          {
            slug: "modern-development",
            eyebrow: "Build",
            title: "Modern Development",
            description:
              "Fast, maintainable implementation for ambitious brand websites built with modern tooling.",
            imageUrl: "/images/placeholders/service.svg",
            imageAlt: "Development placeholder",
            sortOrder: 3,
          },
        ],
      },
    },
  });

  await prisma.referencePage.upsert({
    where: { slug: "references" },
    update: {
      eyebrow: "Database CMS",
      title: "References",
      description:
        "Sample gallery-style reference content stored in PostgreSQL via Prisma.",
      seoTitle: "References | Brilliance Studio",
      seoDescription:
        "Database-backed reference gallery content for Brilliance Studio.",
      primaryCtaLabel: "Discuss project",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Meet the studio",
      secondaryCtaHref: "/about",
      sections: [
        {
          _key: "db-references-1",
          _type: "featureListSection",
          eyebrow: "Database Seed",
          heading: "Reference content managed in PostgreSQL",
          items: [
            "Reference cards",
            "Gallery images",
            "SEO metadata",
            "Flexible supporting sections",
          ],
        },
      ],
      items: {
        deleteMany: {},
        create: [
          {
            slug: "maison-aurelia",
            category: "Lifestyle",
            title: "Maison Aurelia",
            summary:
              "Editorial launch presence with cinematic pacing and premium visual restraint.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Lifestyle reference placeholder",
            sortOrder: 1,
          },
          {
            slug: "velour-residence",
            category: "Real Estate",
            title: "Velour Residence",
            summary:
              "Elegant property storytelling focused on trust, atmosphere, and inquiries.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Real estate reference placeholder",
            sortOrder: 2,
          },
          {
            slug: "noir-atelier",
            category: "Creative Portfolio",
            title: "Noir Atelier",
            summary:
              "A refined digital identity for a selective, design-led studio practice.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Portfolio reference placeholder",
            sortOrder: 3,
          },
        ],
      },
    },
    create: {
      slug: "references",
      eyebrow: "Database CMS",
      title: "References",
      description:
        "Sample gallery-style reference content stored in PostgreSQL via Prisma.",
      seoTitle: "References | Brilliance Studio",
      seoDescription:
        "Database-backed reference gallery content for Brilliance Studio.",
      primaryCtaLabel: "Discuss project",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "Meet the studio",
      secondaryCtaHref: "/about",
      sections: [
        {
          _key: "db-references-1",
          _type: "featureListSection",
          eyebrow: "Database Seed",
          heading: "Reference content managed in PostgreSQL",
          items: [
            "Reference cards",
            "Gallery images",
            "SEO metadata",
            "Flexible supporting sections",
          ],
        },
      ],
      items: {
        create: [
          {
            slug: "maison-aurelia",
            category: "Lifestyle",
            title: "Maison Aurelia",
            summary:
              "Editorial launch presence with cinematic pacing and premium visual restraint.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Lifestyle reference placeholder",
            sortOrder: 1,
          },
          {
            slug: "velour-residence",
            category: "Real Estate",
            title: "Velour Residence",
            summary:
              "Elegant property storytelling focused on trust, atmosphere, and inquiries.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Real estate reference placeholder",
            sortOrder: 2,
          },
          {
            slug: "noir-atelier",
            category: "Creative Portfolio",
            title: "Noir Atelier",
            summary:
              "A refined digital identity for a selective, design-led studio practice.",
            imageUrl: "/images/placeholders/reference.svg",
            imageAlt: "Portfolio reference placeholder",
            sortOrder: 3,
          },
        ],
      },
    },
  });

  const legalPages = [
    {
      slug: "terms",
      eyebrow: "Legal",
      title: "Terms & Privacy Commitments",
      description:
        "Sample legal and privacy content stored in PostgreSQL via Prisma for Canadian operations.",
      seoTitle: "Terms | Brilliance Studio",
      seoDescription:
        "Sample database-backed terms and privacy commitments page.",
      sections: [
        {
          _key: "terms-1",
          eyebrow: "Services",
          heading: "Scope of Services",
          body: "Define project scope, deliverables, approvals, revisions, and acceptance criteria for each engagement.",
          listItems: [
            "Written proposals define the applicable scope.",
            "Additional requests may require re-estimation.",
            "Client delays may affect launch dates.",
          ],
        },
        {
          _key: "terms-2",
          eyebrow: "Privacy",
          heading: "PIPEDA-Aligned Information Handling",
          body: "Explain how personal information is collected, used, safeguarded, retained, and disclosed in a manner appropriate for Canadian operations.",
          contactItems: [
            {
              label: "Privacy requests",
              value: "privacy@brilliancestudio.ca",
              href: "mailto:privacy@brilliancestudio.ca",
            },
          ],
        },
      ],
    },
    {
      slug: "impressum",
      eyebrow: "Legal",
      title: "Imprint",
      description:
        "Sample business disclosure and privacy contact content stored in PostgreSQL via Prisma.",
      seoTitle: "Imprint | Brilliance Studio",
      seoDescription:
        "Sample database-backed business disclosure and privacy contact page.",
      sections: [
        {
          _key: "impressum-1",
          eyebrow: "Business Identity",
          heading: "Company Information",
          body: "Add registered company name, address, business email, and jurisdiction-specific disclosure details here.",
          contactItems: [
            {
              label: "Email",
              value: "hello@brilliancestudio.ca",
              href: "mailto:hello@brilliancestudio.ca",
            },
          ],
        },
        {
          _key: "impressum-2",
          eyebrow: "Privacy",
          heading: "Responsible Person",
          body: "List the responsible contact for legal notices and privacy inquiries here.",
          contactItems: [
            {
              label: "Privacy officer",
              value: "privacy@brilliancestudio.ca",
              href: "mailto:privacy@brilliancestudio.ca",
            },
          ],
        },
      ],
    },
  ];

  for (const page of legalPages) {
    await prisma.legalPage.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }
}

async function seedSubmissions() {
  await prisma.contactRequest.deleteMany();
  await prisma.bookingRequest.deleteMany();

  await prisma.contactRequest.createMany({
    data: [
      {
        name: "Anna Becker",
        email: "anna@example.com",
        company: "Maison Aurelia",
        message:
          "We need a refined landing experience for an upcoming product launch.",
      },
      {
        name: "Luca Hartmann",
        email: "luca@example.com",
        company: "Velour Residence",
        message:
          "Looking for a premium property presentation website with strong inquiry flow.",
      },
    ],
  });

  await prisma.bookingRequest.createMany({
    data: [
      {
        name: "Sofia Klein",
        email: "sofia@example.com",
        preferredDate: new Date("2026-04-15T00:00:00.000Z"),
        preferredTime: "10:30",
        budgetRange: "5,000 - 10,000 EUR",
        projectType: "Website redesign",
        notes:
          "Interested in a modern luxury visual update and improved booking conversions.",
      },
    ],
  });
}

async function main() {
  await seedCms();
  await seedSubmissions();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
